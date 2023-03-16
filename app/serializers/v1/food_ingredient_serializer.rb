module V1
  class FoodIngredientSerializer
    include JSONAPI::Serializer
    attributes :id, :name, :default_grams, :calories_per_gram, :carb_grams, :fat_grams,
               :protein_grams, :verified
  end
end
