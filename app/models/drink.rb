class Drink < ApplicationRecord
  has_many :ingredients, dependent: :destroy
end
