module V1
  class FoodIngredientsController < ApplicationController
    before_action :authenticate_user!, only: [:create, :update]
    before_action :set_food_ingredient, only: [:show, :update]

    def show
      render json: @food_ingredient.to_json
    end

    def create
      food_ingredient = FoodIngredient.new(food_ingredient_params)

      if food_ingredient.save
        render json: food_ingredient, status: :created
      else
        render json: food_ingredient.errors, status: :unprocessable_entity
      end
    end

    def update
      if @food_ingredient.update(food_ingredient_params)
        render json: @food_ingredient
      else
        render json: @food_ingredient.errors, status: :unprocessable_entity
      end
    end

    private

    def set_food_ingredient
      @food_ingredient = FoodIngredient.find(params[:id])
    end

    def food_ingredient_params
      params.require(:food_ingredient).permit(
        :name,
        :default_grams,
        :calories_per_gram,
        :fat_grams,
        :carb_grambs,
        :protein_grams
      )
    end
  end
end
