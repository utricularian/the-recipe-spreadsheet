import {User} from "../types/User";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../app/store";
import {fetchWrapper} from "../api/FetchWrapper";

export interface UserState {
  user: User | null,
  loginErrors: string | undefined,
}

const initialState: UserState = {
  user: null,
  loginErrors: undefined,
}

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
    return await fetchWrapper.get('/api/profile.json');
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        console.log('login.fulfilled', action.payload);
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        console.log('login.rejected', action.error);
        state.loginErrors = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        console.log('logout.fulfilled');
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        console.log('logout.rejected', action);
      })
      .addCase(getUser.fulfilled, (state, action) => {
        console.log('getUser.fulfilled', action.payload);
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        console.log('getUser.rejected', action);
        state.user = null;
      })
  }
});

export const selectUser = (state: RootState) => state.user.user;
export const selectLoginErrors = (state: RootState) => state.user.loginErrors;

export default userSlice.reducer;
