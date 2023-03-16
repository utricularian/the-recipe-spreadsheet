module V1
  class PantryIngredientsController < ApplicationController
    before_action :authenticate_user!

    def index
      json = PantryIngredient
             .joins(:food_ingredient)
             .where(pantry_id:)
             .order('lower(food_ingredients.name)')
             .map do |i|
        V1::PantryIngredientSerializer.new(i)
                                      .serializable_hash[:data][:attributes]
      end
      render json:, status: :ok
    end

    def create
      pantry_ingredient = PantryIngredient.new(pantry_id:,
                                               food_ingredient:)

      if pantry_ingredient.save
        json = V1::PantryIngredientSerializer.new(pantry_ingredient)
                                             .serializable_hash[:data][:attributes]
        render json:, status: :created
      else
        render json: { errors: pantry_ingredient.errors }, status: :unprocessable_entity
      end
    end

    def destroy
      PantryIngredient.find(params[:id]).destroy

      head :ok
    end

    def clear
      PantryIngredient.where(pantry_id:).destroy_all
    end

    private

    def pantry_id
      current_user.pantry_id
    end

    def food_ingredient
      FoodIngredient.find_by(id: pantry_ingredient_params[:food_ingredient_id])
    end

    def pantry_ingredient_params
      params.require(:pantry_ingredient).permit(
        :food_ingredient_id
      )
    end
  end
end
