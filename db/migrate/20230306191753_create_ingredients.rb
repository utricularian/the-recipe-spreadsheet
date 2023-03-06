class CreateIngredients < ActiveRecord::Migration[7.0]
  def change
    create_table :ingredients do |t|
      t.references :drink, null: false, foreign_key: true
      t.string :description

      t.timestamps
    end
  end
end
