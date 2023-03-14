class CreateFoodIngredients < ActiveRecord::Migration[7.0]
  def change
    create_table :food_ingredients do |t|
      t.string :name, null: false
      t.float :default_grams, null: false
      t.float :calories_per_gram, null: false
      t.float :fat_grams, null: false
      t.float :carb_grams, null: false
      t.float :protein_grams, null: false
      t.boolean :verified, default: false

      t.timestamps

      t.index :name, unique: true
    end
  end
end
