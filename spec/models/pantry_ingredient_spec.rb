require 'rails_helper'

RSpec.describe PantryIngredient do
  subject(:pantry_ingredient) { build(:pantry_ingredient) }

  describe 'validations' do
    it 'has a valid FactoryBot default' do
      expect(pantry_ingredient).to be_valid
    end

    it { is_expected.to validate_uniqueness_of(:food_ingredient_id).scoped_to(:pantry_id) }
  end
end
