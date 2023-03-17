module V1
  class RecipesController < ApplicationController
    def index
      json = Recipe.all.order('lower(name)').map do |recipe|
        V1::RecipeSerializer.new(recipe).serializable_hash[:data][:attributes]
      end
      render json:, status: :ok
    end

    def show
      recipe = Recipe.find(params[:id])
      json = V1::RecipeSerializer.new(recipe,
                                      { params: { full: true } }).serializable_hash[:data][:attributes]
      render json:, status: :ok
    end
  end
end
