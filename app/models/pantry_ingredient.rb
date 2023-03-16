class PantryIngredient < ApplicationRecord
  belongs_to :food_ingredient

  validates :food_ingredient_id, uniqueness: { scope: :pantry_id }
end
