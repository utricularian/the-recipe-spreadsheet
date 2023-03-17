module V1
  class RecipeSerializer
    include JSONAPI::Serializer
    attributes :id, :name

    attribute :created_by do |recipe|
      V1::UserSerializer.new(recipe.created_by).serializable_hash[:data][:attributes] if recipe.created_by.present?
    end

    attribute :food_ingredients, if: proc { |_recipe, params|
      params[:full]
    } do |recipe|
      recipe.food_ingredients.map do |food_ingredient|
        V1::FoodIngredientSerializer.new(food_ingredient).serializable_hash[:data][:attributes]
      end
    end
  end
end
