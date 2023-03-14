import {User} from "../types/User";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../app/store";
import {FetchNotOkError, fetchWrapper} from "../api/FetchWrapper";

export interface UserState {
  user: User | null,
  loginErrors: string | undefined,
  registerErrors: string[],
}

const initialState: UserState = {
  user: null,
  loginErrors: undefined,
  registerErrors: [],
}

interface RegistrationError {
  errors: {
    [key: string]: string[]
  }
}

export const register = createAsyncThunk<User, User, { rejectValue: RegistrationError }>(
  'user/register',
  async (user: User, { rejectWithValue }) => {
    try {
      const json = await fetchWrapper.post('/api/v1/users.json', {
        body: { user },
        useJIT: false,
      })

      return json;
    } catch (err) {
      if (err instanceof FetchNotOkError) {
        return rejectWithValue(err.payload as RegistrationError)
      }
      return rejectWithValue({
        errors: {
          'Registration': [`had unhandled error ${JSON.stringify(err)}`]
        }
      })
    }
  }
)

export const login = createAsyncThunk(
  'user/login',
  async (user: User) => {
    const json = await fetchWrapper.post('/api/v1/users/sign_in.json', {
      body: { user },
      useJIT: false,
    });

    console.log("user/login", json);

    return json;
  }
)

export const logout = createAsyncThunk(
  'user/logout',
  async () => {
    return await fetchWrapper.delete('/api/v1/users/sign_out.json')
  }
)

export const getUser = createAsyncThunk(
  'user/getUser',
  async () => {
    return await fetchWrapper.get('/api/v1/profile.json');
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loginErrors = undefined
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null
        state.loginErrors = action.error.message;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.registerErrors = []
      })
      .addCase(register.rejected, (state, action) => {
        const { payload } = action
        if (payload) {
          const { errors } = payload
          if (errors) {
            const registerErrors: string[] = []
            for (const [userProperty, propertyErrors] of Object.entries(errors)) {
              propertyErrors.forEach(propertyError => {
                registerErrors.push(`${userProperty} ${propertyError}`)
              })
            }
            state.registerErrors = registerErrors

            return
          }
        }
        state.registerErrors = [action.error.message || "Something went wrong"]
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.user = null;
      })
  }
});

export const selectUser = (state: RootState) => state.user.user;
export const selectLoginErrors = (state: RootState) => state.user.loginErrors;
export const selectRegisterErrors = (state: RootState) => state.user.registerErrors;

export default userSlice.reducer;
