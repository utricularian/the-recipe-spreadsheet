class AddUniqueIndexToPantryIngredients < ActiveRecord::Migration[7.0]
  def change
    add_index :pantry_ingredients, [:food_ingredient_id, :pantry_id], unique: true
  end
end
