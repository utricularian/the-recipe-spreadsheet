class CreateRecipeFoodIngredients < ActiveRecord::Migration[7.0]
  def change
    create_table :recipe_food_ingredients do |t|
      t.references :food_ingredient, null: false, foreign_key: true
      t.references :recipe, null: false, foreign_key: true

      t.timestamps

      t.index [:food_ingredient_id, :recipe_id], unique: true, name: 'idx_uniq_ingredient_recipe'
    end
  end
end
