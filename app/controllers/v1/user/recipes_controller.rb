module V1
  module User
    class RecipesController < ApplicationController
      before_action :authenticate_user!
      def index
        json = Recipe.where(created_by: current_user).order('lower(name)').map do |recipe|
          V1::RecipeSerializer.new(recipe).serializable_hash[:data][:attributes]
        end
        render json:, status: :ok
      end

      def create
        recipe = Recipe.new(recipe_params.merge({ created_by: current_user }))
        if recipe.save
          json = V1::RecipeSerializer.new(recipe,
                                          { params: { full: true } }).serializable_hash[:data][:attributes]
          render json:, status: :created
        else
          render json: { errors: recipe.errors }, status: :unprocessable_entity
        end
      end

      def update
        recipe = Recipe.find(params[:id])
        if recipe.update(recipe_params)
          render json: V1::RecipeSerializer.new(recipe,
                                                {
                                                  params: {
                                                    full: true
                                                  }
                                                }).serializable_hash[:data][:attributes]
        else
          render json: { errors: recipe.errors }, status: :unprocessable_entity
        end
      end

      private

      def recipe_params
        params.require(:recipe).permit(
          :name,
          {
            recipe_food_ingredients_attributes: [
              :id,
              :food_ingredient_id,
              :recipe_id,
              :_destroy
            ]
          }
        )
      end
    end
  end
end
