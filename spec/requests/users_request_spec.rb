require 'rails_helper'

RSpec.describe 'User API' do
  describe 'POST /api/v1/signup.json' do
    let(:draft) { build(:user) }

    def make_request(email: nil, password: nil)
      email ||= draft.email
      password ||= draft.password
      post '/api/v1/signup.json',
           params: { user: { email:, password:, password_confirmation: password } }
    end

    it 'returns auth headers' do
      make_request

      expect(response).to be_created
      expect(response.headers['Authorization']).not_to be_nil

      json = response.parsed_body
      expect(json.keys).to match_array(['id', 'email'])
      expect(json['id']).not_to be_nil
      expect(json['email']).to eq(draft.email)
    end

    context 'with incorrect credentials' do
      it 'returns an error' do
        make_request(password: 'foobar')

        expect(response).to be_unprocessable
        expect(response.headers['Authorization']).to be_nil

        json = response.parsed_body
        expect(json).to eq({
                             'errors' => {
                               'password' => ['is too short (minimum is 12 characters)']
                             }
                           })
      end
    end
  end

  describe 'POST /api/v1/login.json' do
    let(:user) { create(:user) }

    def make_request(email: nil, password: nil)
      email ||= user.email
      password ||= user.password
      post '/api/v1/login.json', params: { user: { email:, password: } }
    end

    it 'returns auth headers' do
      make_request

      expect(response).to be_created
      expect(response.headers['Authorization']).not_to be_nil

      json = response.parsed_body
      expect(json).to eq({
                           'id' => user.id,
                           'email' => user.email
                         })
    end

    context 'with incorrect credentials' do
      it 'returns an error' do
        make_request(password: 'foobar')

        expect(response).to be_unauthorized
        expect(response.headers['Authorization']).to be_nil

        json = response.parsed_body
        expect(json).to eq({ 'error' => 'Invalid Email or password.' })
      end
    end
  end

  describe 'DELETE /api/v1/logout.json' do
    let(:user) { create(:user) }

    def make_request
      delete '/api/v1/logout.json'
    end

    before do
      sign_in user
    end

    it 'invalidates the session' do
      get '/api/v1/profile.json'
      expect(response).to be_ok

      make_request
      expect(response.parsed_body).to be_empty

      get '/api/v1/profile.json'
      expect(response).to be_unauthorized
    end
  end

  describe 'GET /api/v1/profile.json' do
    def make_request
      get '/api/v1/profile.json'
    end

    it 'requires authentication' do
      make_request

      expect(response).to be_unauthorized
    end

    context 'when logged in' do
      let(:user) { create(:user) }

      before do
        sign_in user
      end

      it 'returns logged in user info' do
        make_request

        expect(response).to be_ok
        json = response.parsed_body
        expect(json).to eq({
                             'id' => user.id,
                             'email' => user.email
                           })
      end
    end
  end
end
