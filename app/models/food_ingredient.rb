class FoodIngredient < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  validates :default_grams, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :calories_per_gram, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :fat_grams, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :carb_grams, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :protein_grams, presence: true, numericality: { greater_than_or_equal_to: 0 }
end
