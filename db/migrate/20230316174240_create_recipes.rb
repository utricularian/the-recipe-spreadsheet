class CreateRecipes < ActiveRecord::Migration[7.0]
  def change
    create_table :recipes do |t|
      t.string :name, null: false
      t.references :created_by, null: false, index: true, foreign_key: { to_table: :users}

      t.timestamps

      t.index :name, unique: true
    end
  end
end
