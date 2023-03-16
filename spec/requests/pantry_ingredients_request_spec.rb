require 'rails_helper'

RSpec.describe 'Pantry Ingredients API' do
  let(:pantry_id) { 'aasdfasdfasdfasdf' }
  let(:user) { create(:user, pantry_id:) }
  let(:food_ingredient) { create(:food_ingredient) }
  let(:food_ingredient_id) { food_ingredient.id }

  def expected_json_for_food_ingredient(food_ingredient)
    {
      'id' => food_ingredient.id,
      'name' => food_ingredient.name,
      'default_grams' => food_ingredient.default_grams,
      'calories_per_gram' => food_ingredient.calories_per_gram,
      'fat_grams' => food_ingredient.fat_grams,
      'carb_grams' => food_ingredient.carb_grams,
      'protein_grams' => food_ingredient.protein_grams,
      'verified' => food_ingredient.verified
    }
  end

  def expected_json(id:, pantry_id:, food_ingredient:)
    {
      'id' => id,
      'pantry_id' => pantry_id,
      'food_ingredient_id' => food_ingredient.id,
      'food_ingredient' => expected_json_for_food_ingredient(food_ingredient)
    }
  end

  describe 'GET /api/v1/pantry_ingredients' do
    def make_request
      get '/api/v1/pantry_ingredients.json'
    end

    it 'requires authentication' do
      make_request

      expect(response).to be_unauthorized
    end

    context 'with authentication' do
      let!(:food_ingredient_a) { create(:food_ingredient, name: 'A') }
      let!(:food_ingredient_c) { create(:food_ingredient, name: 'C') }
      let!(:food_ingredient_b) { create(:food_ingredient, name: 'b') }

      let!(:pantry_ingredient_a) do
        create(:pantry_ingredient, pantry_id:, food_ingredient_id: food_ingredient_a.id)
      end
      let!(:pantry_ingredient_c) do
        create(:pantry_ingredient, pantry_id:, food_ingredient_id: food_ingredient_c.id)
      end
      let!(:pantry_ingredient_b) do
        create(:pantry_ingredient, pantry_id:, food_ingredient_id: food_ingredient_b.id)
      end

      before do
        sign_in user
      end

      it 'returns serialized records sorted by food ingredient name' do
        make_request

        expect(response).to be_ok
        json = response.parsed_body
        expect(json).to eq([
                             expected_json(
                               id: pantry_ingredient_a.id,
                               pantry_id:,
                               food_ingredient: food_ingredient_a
                             ),
                             expected_json(
                               id: pantry_ingredient_b.id,
                               pantry_id:,
                               food_ingredient: food_ingredient_b
                             ),
                             expected_json(
                               id: pantry_ingredient_c.id,
                               pantry_id:,
                               food_ingredient: food_ingredient_c
                             )
                           ])
      end
    end
  end

  describe 'POST /api/v1/pantry_ingredients' do
    let(:params) do
      {
        food_ingredient_id:
      }
    end

    def make_request
      post '/api/v1/pantry_ingredients.json', params: { pantry_ingredient: params }
    end

    it 'requires authentication' do
      make_request

      expect(response).to be_unauthorized
    end

    context 'with authentication' do
      before do
        sign_in user
      end

      it 'creates a record' do
        expect do
          make_request
        end.to change(PantryIngredient, :count).by(1)
      end

      it 'responds with attributes' do
        make_request

        pantry_ingredient = PantryIngredient.last
        json = response.parsed_body
        expect(json).to eq(expected_json(id: pantry_ingredient.id, pantry_id: user.pantry_id,
                                         food_ingredient:))
      end

      describe 'the created record' do
        let(:pantry_ingredient) { PantryIngredient.last }

        before do
          make_request
        end

        it 'has the correct attributes' do
          expect(pantry_ingredient).not_to be_nil
          expect(pantry_ingredient.pantry_id).to eq(pantry_id)
          expect(pantry_ingredient.food_ingredient_id).to eq(food_ingredient_id)
        end
      end

      context 'with bad attributes' do
        let(:food_ingredient_id) { food_ingredient.id + 1 }

        it 'returns with errors' do
          make_request

          expect(response).to be_unprocessable
          payload = response.parsed_body
          expect(payload).to eq({
                                  'errors' => {
                                    'food_ingredient' => ['must exist']
                                  }
                                })
        end
      end
    end
  end

  describe 'DELETE /api/v1/pantry_ingredients/:id' do
    let!(:pantry_ingredient) { create(:pantry_ingredient, pantry_id:) }
    let!(:other_pantry_ingredient) { create(:pantry_ingredient, pantry_id:) }

    def make_request(id:)
      delete "/api/v1/pantry_ingredients/#{id}.json"
    end

    it 'requires authentication' do
      make_request(id: pantry_ingredient.id)
      expect(response).to be_unauthorized
    end

    context 'with authentication' do
      before do
        sign_in user
      end

      it 'deletes the record' do
        expect do
          make_request(id: pantry_ingredient.id)
        end.to change(PantryIngredient, :count).by(-1)

        expect(response).to be_ok
        expect(response.body).to be_empty

        expect(PantryIngredient.find_by(id: pantry_ingredient.id)).not_to be_present
        expect(PantryIngredient.find_by(id: other_pantry_ingredient.id)).to be_present
      end
    end
  end

  describe 'DELETE /api/v1/pantry_ingredients' do
    def make_request
      delete '/api/v1/pantry_ingredients.json'
    end

    it 'requires authentication' do
      make_request
      expect(response).to be_unauthorized
    end

    context 'with authentication' do
      before do
        5.times { create(:pantry_ingredient, pantry_id:) }
        3.times { create(:pantry_ingredient, pantry_id: "#{pantry_id}2") }

        sign_in user
      end

      it 'destroys all records in the pantry' do
        expect do
          make_request
        end.to change(PantryIngredient, :count).by(-5)

        expect(PantryIngredient.where(pantry_id:)).to be_empty
        expect(PantryIngredient.where(pantry_id: "#{pantry_id}2")).not_to be_empty
      end
    end
  end
end
