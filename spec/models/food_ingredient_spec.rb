require 'rails_helper'

RSpec.describe FoodIngredient do
  subject(:food_ingredient) { build(:food_ingredient) }

  describe 'validations' do
    it 'has a valid FactoryBot default' do
      expect(food_ingredient).to be_valid
    end

    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_uniqueness_of(:name) }
    it { is_expected.to validate_presence_of(:default_grams) }
    it { is_expected.to validate_numericality_of(:default_grams).is_greater_than_or_equal_to(0) }
    it { is_expected.to validate_presence_of(:calories_per_gram) }

    it {
      expect(food_ingredient).to validate_numericality_of(:calories_per_gram)
        .is_greater_than_or_equal_to(0)
    }

    it { is_expected.to validate_presence_of(:fat_grams) }
    it { is_expected.to validate_numericality_of(:fat_grams).is_greater_than_or_equal_to(0) }
    it { is_expected.to validate_presence_of(:carb_grams) }
    it { is_expected.to validate_numericality_of(:carb_grams).is_greater_than_or_equal_to(0) }
    it { is_expected.to validate_presence_of(:protein_grams) }
    it { is_expected.to validate_numericality_of(:protein_grams).is_greater_than_or_equal_to(0) }
  end
end
