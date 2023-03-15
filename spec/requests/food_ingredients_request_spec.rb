require 'rails_helper'

RSpec.describe 'Food Ingredients API' do
  describe 'GET /api/vi/food_ingredients' do
    it 'does not require authentication' do
      get '/api/v1/food_ingredients.json'

      expect(response).to be_ok
    end

    it 'returns food ingredients' do
      fi1 = create(:food_ingredient, name: 'FI 1')
      create(:food_ingredient, name: 'FI 2')

      get '/api/v1/food_ingredients.json'

      json = response.parsed_body
      expect(json).to be_a(Array)
      expect(json.length).to eq(2)
      expect(json.pluck('name')).to eq(['FI 1', 'FI 2'])

      expect(json[0]).to eq({
                              'id' => fi1.id,
                              'name' => fi1.name,
                              'default_grams' => fi1.default_grams,
                              'calories_per_gram' => fi1.calories_per_gram,
                              'fat_grams' => fi1.fat_grams,
                              'carb_grams' => fi1.carb_grams,
                              'protein_grams' => fi1.protein_grams,
                              'verified' => fi1.verified
                            })
    end
  end

  describe 'GET /api/v1/food_ingredients/:id' do
    let(:food_ingredient) { create(:food_ingredient) }

    def make_request
      get "/api/v1/food_ingredients/#{food_ingredient.id}.json"
    end

    it 'does not require authentication' do
      make_request

      expect(response).to be_ok
    end

    it 'returns the food_ingredient' do
      make_request

      json = response.parsed_body
      expect(json).to eq({
                           'id' => food_ingredient.id,
                           'name' => food_ingredient.name,
                           'default_grams' => food_ingredient.default_grams,
                           'calories_per_gram' => food_ingredient.calories_per_gram,
                           'fat_grams' => food_ingredient.fat_grams,
                           'carb_grams' => food_ingredient.carb_grams,
                           'protein_grams' => food_ingredient.protein_grams,
                           'verified' => food_ingredient.verified
                         })
    end
  end

  describe 'PUT /api/v1/food_ingredients/:id.json' do
    let(:existing_record) { create(:food_ingredient, default_grams: 123.4) }
    let(:default_grams) { 21.1 }

    def make_request
      put "/api/v1/food_ingredients/#{existing_record.id}.json", params: { food_ingredient: {
        name: existing_record.name,
        default_grams:,
        calories_per_gram: existing_record.calories_per_gram,
        fat_grams: existing_record.fat_grams,
        carb_grams: existing_record.carb_grams,
        protein_grams: existing_record.protein_grams
      } }
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

      it 'does not create a new record' do
        existing_record
        expect do
          make_request
        end.not_to change(FoodIngredient, :count)
      end

      it 'responds with the updated fields' do
        make_request

        json = response.parsed_body

        expect(json['id']).to eq(existing_record.id)
        expect(json['name']).to eq(existing_record.name)
        expect(json['default_grams']).to eq(default_grams)
        expect(json['calories_per_gram']).to eq(existing_record.calories_per_gram)
        expect(json['fat_grams']).to eq(existing_record.fat_grams)
        expect(json['carb_grams']).to eq(existing_record.carb_grams)
        expect(json['protein_grams']).to eq(existing_record.protein_grams)
      end

      context 'with invalid fields' do
        let(:default_grams) { 'none' }

        it 'returns :unprocessable_entity' do
          make_request
          expect(response).to be_unprocessable
        end

        describe 'response payload' do
          it 'includes the error' do
            make_request
            payload = response.parsed_body
            expect(payload).to eq({
                                    'errors' => {
                                      'default_grams' => ['is not a number']
                                    }
                                  })
          end
        end
      end
    end
  end

  describe 'POST /api/v1/food_ingredients.json' do
    let(:food_ingredient) { build(:food_ingredient) }
    let(:default_params) do
      {
        name: food_ingredient.name,
        default_grams: food_ingredient.default_grams,
        calories_per_gram: food_ingredient.calories_per_gram,
        fat_grams: food_ingredient.fat_grams,
        carb_grams: food_ingredient.carb_grams,
        protein_grams: food_ingredient.protein_grams
      }
    end

    def make_request(params = {})
      params = default_params.merge(params)
      post '/api/v1/food_ingredients.json', params: { food_ingredient: params }
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

      it 'creates a record' do
        expect do
          make_request
        end.to change(FoodIngredient, :count).by(1)
      end

      it 'responds with the fields and an id' do
        make_request

        json = response.parsed_body

        expect(json['id']).not_to be_nil
        expect(json['name']).to eq(food_ingredient.name)
        expect(json['default_grams']).to eq(food_ingredient.default_grams)
        expect(json['calories_per_gram']).to eq(food_ingredient.calories_per_gram)
        expect(json['fat_grams']).to eq(food_ingredient.fat_grams)
        expect(json['carb_grams']).to eq(food_ingredient.carb_grams)
        expect(json['protein_grams']).to eq(food_ingredient.protein_grams)
      end

      describe 'created record' do
        it 'has all the correct fields' do
          make_request

          new_record = FoodIngredient.last
          expect(new_record.id).not_to be_nil
          expect(new_record.name).to eq(food_ingredient.name)
          expect(new_record.default_grams).to eq(food_ingredient.default_grams)
          expect(new_record.calories_per_gram).to eq(food_ingredient.calories_per_gram)
          expect(new_record.fat_grams).to eq(food_ingredient.fat_grams)
          expect(new_record.carb_grams).to eq(food_ingredient.carb_grams)
          expect(new_record.protein_grams).to eq(food_ingredient.protein_grams)
        end
      end

      context 'with an invalid payload' do
        it 'return :unprocessable_entity' do
          make_request(default_grams: 'none')

          expect(response).to be_unprocessable
        end

        it 'does not create a FoodIngredient' do
          expect do
            make_request(default_grams: 'none')
          end.not_to change(FoodIngredient, :count)
        end

        describe 'response payload' do
          let(:payload) do
            make_request(default_grams: 'none')
            response.parsed_body
          end

          it 'includes the error' do
            expect(payload).to eq({
                                    'errors' => {
                                      'default_grams' => ['is not a number']
                                    }
                                  })
          end
        end
      end
    end
  end
end
