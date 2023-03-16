module V1
  class PantryIngredientSerializer
    include JSONAPI::Serializer
    attributes :id, :food_ingredient_id, :pantry_id

    attribute :food_ingredient do |pantry_ingredient|
      V1::FoodIngredientSerializer.new(pantry_ingredient.food_ingredient)
                                  .serializable_hash[:data][:attributes]
    end
  end
end
