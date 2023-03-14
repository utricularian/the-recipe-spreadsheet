require 'rails_helper'

RSpec.describe 'Drinks' do
  describe 'GET /api/v1/drinks' do
    it 'does not require authentication' do
      get '/api/v1/drinks.json'

      expect(response).to be_ok
    end

    it 'returns drinks' do
      Drink.create!(title: 'drink 1', created_at: 2.seconds.ago)
      Drink.create!(title: 'drink 2', created_at: 1.seconds.ago)

      get '/api/v1/drinks.json'

      json = response.parsed_body
      expect(json).to be_a(Array)
      expect(json.length).to eq(2)
      expect(json.map { |drink| drink['title'] }).to eq(['drink 1', 'drink 2'])
    end
  end

  describe 'POST /api/v1/drinks' do
    let(:params) do
      { drink: { title: 'A drink' } }
    end
    def make_post
      post '/api/v1/drinks.json', params: params
    end

    it 'requires authentication' do
      make_post

      expect(response).not_to be_ok
      expect(response).to be_unauthorized
    end

    context 'while logged in' do
      let(:user) { User.create!(email: 'foo@bar.com', password: 'abcdefghijklmnopqrstuv', jti: 'asdfasdfasdf') }

      before(:each) do
        sign_in user
      end

      context 'with an invalid Drink' do
        let(:params) do
          { drink: { title: '' } }
        end

        it 'returns :unprocessable_entity' do
          make_post

          expect(response).to be_unprocessable
        end

        it 'does not create a drink' do
          expect {
            make_post
          }.not_to change(Drink, :count)
        end
      end

      context 'with valid parameters' do
        let(:params) do
          { drink: { title: 'A drink' } }
        end

        it 'returns :created' do
          make_post

          expect(response).to be_created
        end

        it 'creates a drink' do
          expect {
            make_post
          }.to change(Drink, :count).by(1)
        end

        describe 'the created drink' do
          let(:drink) { Drink.last }

          before(:each) do
            make_post
          end

          it 'should have a title' do
            expect(drink.title).to eq('A drink')
          end
        end
      end
    end
  end
end
