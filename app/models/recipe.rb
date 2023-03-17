class Recipe < ApplicationRecord
  belongs_to :created_by, class_name: 'User'

  has_many :recipe_food_ingredients, dependent: :destroy, inverse_of: :recipe
  has_many :food_ingredients, -> { order('lower(name) asc') }, through: :recipe_food_ingredients

  accepts_nested_attributes_for :recipe_food_ingredients, allow_destroy: true

  validates :name, presence: true, uniqueness: true
end
