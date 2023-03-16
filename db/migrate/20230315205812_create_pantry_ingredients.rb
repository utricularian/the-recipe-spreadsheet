class CreatePantryIngredients < ActiveRecord::Migration[7.0]
  def change
    create_table :pantry_ingredients do |t|
      t.references :food_ingredient, null: false, foreign_key: true
      t.string :pantry_id

      t.timestamps
    end
  end
end
