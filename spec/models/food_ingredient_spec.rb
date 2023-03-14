require 'rails_helper'

RSpec.describe FoodIngredient, type: :model do
  subject { FactoryBot.build(:food_ingredient) }

  describe 'validations' do
    it 'has a valid FactoryBot default' do
      expect(subject).to be_valid
    end

    it { should validate_presence_of(:name) }
    it { should validate_uniqueness_of(:name) }
    it { should validate_presence_of(:default_grams) }
    it { should validate_numericality_of(:default_grams).is_greater_than_or_equal_to(0) }
    it { should validate_presence_of(:calories_per_gram) }
    it { should validate_numericality_of(:calories_per_gram).is_greater_than_or_equal_to(0) }
    it { should validate_presence_of(:fat_grams) }
    it { should validate_numericality_of(:fat_grams).is_greater_than_or_equal_to(0) }
    it { should validate_presence_of(:carb_grams) }
    it { should validate_numericality_of(:carb_grams).is_greater_than_or_equal_to(0) }
    it { should validate_presence_of(:protein_grams) }
    it { should validate_numericality_of(:protein_grams).is_greater_than_or_equal_to(0) }
  end
end
