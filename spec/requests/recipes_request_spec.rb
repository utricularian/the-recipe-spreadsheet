require 'rails_helper'

RSpec.describe 'Recipe API' do
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

  describe 'GET /api/v1/recipes' do
    it 'does not require authentication' do
      get '/api/v1/recipes.json'
      expect(response).to be_ok
    end

    it 'returns all recipes by all users' do
      user = create(:user)
      _recipe_c = create(:recipe, name: 'C')
      recipe_a = create(:recipe, name: 'A', created_by: user)
      _recipe_b = create(:recipe, name: 'b')

      get '/api/v1/recipes.json'

      json = response.parsed_body
      expect(json).to be_a(Array)
      expect(json.length).to eq(3)
      expect(json.pluck('name')).to eq(['A', 'b', 'C'])

      expect(json.first).to eq({
                                 'id' => recipe_a.id,
                                 'name' => recipe_a.name,
                                 'created_by' => {
                                   'id' => user.id,
                                   'email' => user.email,
                                   'pantry_id' => user.pantry_id
                                 }
                               })
    end
  end

  describe 'GET /api/v1/recipes/:id' do
    let(:ingredient_b) { create(:food_ingredient, name: 'ingredient B') }
    let(:ingredient_a) { create(:food_ingredient, name: 'ingredient a') }
    let(:ingredient_c) { create(:food_ingredient, name: 'ingredient c') }
    let(:recipe) { create(:recipe, food_ingredients: [ingredient_b, ingredient_a, ingredient_c]) }

    it 'does not require authentication' do
      get "/api/v1/recipes/#{recipe.id}.json"
      expect(response).to be_ok
    end

    it 'returns the recipe and all ingredients' do
      get "/api/v1/recipes/#{recipe.id}.json"

      json = response.parsed_body
      expect(json).to be_a(Hash)
      expect(json).to eq({
                           'id' => recipe.id,
                           'name' => recipe.name,
                           'created_by' => {
                             'id' => recipe.created_by.id,
                             'email' => recipe.created_by.email,
                             'pantry_id' => recipe.created_by.pantry_id
                           },
                           'food_ingredients' => [
                             expected_json_for_food_ingredient(ingredient_a),
                             expected_json_for_food_ingredient(ingredient_b),
                             expected_json_for_food_ingredient(ingredient_c),
                           ]
                         })
    end
  end

  describe 'GET /api/v1/user/recipes' do
    it 'requires authentication' do
      get '/api/v1/user/recipes.json'
      expect(response).to be_unauthorized
    end

    context 'with authentication' do
      let(:user) { create(:user) }

      let!(:recipe_c) { create(:recipe, name: 'rC', created_by: user) }
      let!(:recipe_a) do
        create(:recipe, name: 'rA', created_by: user, food_ingredients: create_list(:food_ingredient, 2))
      end
      let!(:recipe_b) { create(:recipe, name: 'rb', created_by: user) }

      before do
        _recipe_by_other_user = create(:recipe)
        sign_in user
      end

      it 'returns only the current_user recipes' do
        get '/api/v1/user/recipes.json'

        expect(response).to be_ok
        json = response.parsed_body
        expect(json).to be_a(Array)
        expect(json.length).to eq(3)
        expect(json.pluck('name')).to eq([recipe_a.name, recipe_b.name, recipe_c.name])
        expect(json.first).not_to have_key('food_ingredients')
      end
    end
  end

  describe 'PUT /api/v1/user/recipes/:id' do
    let(:food_ingredients) { create_list(:food_ingredient, 3) }
    let!(:recipe) { create(:recipe, food_ingredients:) }
    let(:recipe_name) { 'Updated' }
    let(:recipe_food_ingredients_attributes) do
      [
        {
          id: recipe.recipe_food_ingredients[0].id,
          food_ingredient_id: recipe.recipe_food_ingredients[0].food_ingredient.id,
          recipe_id: recipe.id
        },
        {
          id: recipe.recipe_food_ingredients[1].id,
          food_ingredient_id: recipe.recipe_food_ingredients[1].food_ingredient.id,
          recipe_id: recipe.id
        },
        {
          id: recipe.recipe_food_ingredients[2].id,
          food_ingredient_id: recipe.recipe_food_ingredients[2].food_ingredient.id,
          recipe_id: recipe.id
        },
      ]
    end

    let(:params) do
      {
        name: recipe_name,
        recipe_food_ingredients_attributes:
      }
    end

    it 'requires authentication' do
      put "/api/v1/user/recipes/#{recipe.id}.json", params: { recipe: params }
      expect(response).to be_unauthorized
    end

    context 'with authentication' do
      before do
        sign_in recipe.created_by
      end

      it 'updates the recipe' do
        expect do
          put "/api/v1/user/recipes/#{recipe.id}.json", params: { recipe: params }
        end.not_to change(Recipe, :count)

        # expect(response.parsed_body).to eq({})
        reloaded_recipe = Recipe.find(recipe.id).reload
        expect(reloaded_recipe.name).to eq(recipe_name)
      end

      it 'supports adding ingredients' do
        add_params = params.merge({
                                    recipe_food_ingredients_attributes:
                                      recipe_food_ingredients_attributes +
                                        [{ food_ingredient_id: create(:food_ingredient).id }]
                                  })
        put "/api/v1/user/recipes/#{recipe.id}.json", params: { recipe: add_params }

        reloaded_recipe = Recipe.find(recipe.id).reload
        expect(reloaded_recipe.food_ingredients.length).to eq(4)
      end

      it 'supports removing ingredients with the _destroy flag' do
        delete_flag = { '_destroy' => true }
        remove_params = params.merge({
                                       recipe_food_ingredients_attributes: [
                                         recipe_food_ingredients_attributes[0].merge(delete_flag),
                                         recipe_food_ingredients_attributes[1].merge(delete_flag),
                                         recipe_food_ingredients_attributes[2],
                                       ]
                                     })
        put "/api/v1/user/recipes/#{recipe.id}.json", params: { recipe: remove_params }

        reloaded_recipe = Recipe.find(recipe.id).reload
        expect(reloaded_recipe.food_ingredients.length).to eq(1)
      end
    end
  end

  describe 'POST /api/v1/user/recipes' do
    let(:recipe_name) { 'Some neat new Fish thing' }
    let(:food_ingredient_a) { create(:food_ingredient) }
    let(:food_ingredient_b) { create(:food_ingredient) }
    let(:params) do
      {
        name: recipe_name,
        recipe_food_ingredients_attributes: [
          { food_ingredient_id: food_ingredient_a.id },
          { food_ingredient_id: food_ingredient_b.id },
        ]
      }
    end

    it 'requires authentication' do
      post '/api/v1/user/recipes.json', params: { recipe: params }
      expect(response).to be_unauthorized
    end

    context 'with authentication' do
      let(:user) { create(:user) }

      before do
        sign_in user
      end

      it 'creates a recipe' do
        expect do
          post '/api/v1/user/recipes.json', params: { recipe: params }
        end.to change(Recipe, :count).by(1)
      end

      describe 'the response' do
        let(:json) { response.parsed_body }

        before do
          post '/api/v1/user/recipes.json', params: { recipe: params }
        end

        it 'is created' do
          expect(response).to be_created
        end

        it 'has the correct fields' do
          expect(json.keys).to match_array(['id', 'name', 'created_by', 'food_ingredients'])
          expect(json['id']).not_to be_nil
          expect(json['name']).to eq(recipe_name)
          expect(json['created_by']).to eq({
                                             'id' => user.id,
                                             'email' => user.email,
                                             'pantry_id' => user.pantry_id
                                           })
          expect(json['food_ingredients']).to be_a(Array)
          expect(json['food_ingredients'].length).to eq(2)

          ingredient = json['food_ingredients'].first
          expect(ingredient).to eq(expected_json_for_food_ingredient(food_ingredient_a))
        end
      end

      describe 'created recipe' do
        let(:recipe) { Recipe.last }

        before do
          post '/api/v1/user/recipes.json', params: { recipe: params }
        end

        it 'has correct attributes' do
          expect(recipe.name).to eq(recipe_name)
          expect(recipe.created_by).to eq(user)
          expect(recipe.food_ingredients).to match_array([food_ingredient_a, food_ingredient_b])
        end
      end

      context 'when an error occurs' do
        let(:recipe_name) { '' }

        it 'returns errors' do
          post '/api/v1/user/recipes.json', params: { recipe: params }
          expect(response).to be_unprocessable
          expect(response.parsed_body).to eq({
                                               'errors' => {
                                                 'name' => ["can't be blank"]
                                               }
                                             })
        end

        it 'does not create a recipe' do
          expect do
            post '/api/v1/user/recipes.json', params: { recipe: params }
          end.not_to change(Recipe, :count)
        end
      end
    end
  end
end
