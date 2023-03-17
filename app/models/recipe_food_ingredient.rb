class RecipeFoodIngredient < ApplicationRecord
  belongs_to :recipe
  belongs_to :food_ingredient

  validates :recipe, uniqueness: { scope: :food_ingredient }
end
