require 'rails_helper'

RSpec.describe Recipe do
  subject(:recipe) { build(:recipe) }

  describe 'validations' do
    it 'has a valid FactoryBot default' do
      expect(recipe).to be_valid
      recipe.save!
    end

    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_uniqueness_of(:name) }
  end

  describe 'callbacks' do
    describe 'on destroy' do
      let!(:food_ingredient) { create(:food_ingredient) }
      let!(:recipe) { create(:recipe, food_ingredients: [food_ingredient]) }

      it 'removes the recipe_food_ingredient' do
        expect do
          recipe.destroy
        end.to change(RecipeFoodIngredient, :count).by(-1)
      end

      it 'does not remove the food_ingredient' do
        expect do
          recipe.destroy
        end.not_to change(FoodIngredient, :count)
      end
    end
  end
end
