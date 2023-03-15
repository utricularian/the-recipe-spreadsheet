class DropIngredients < ActiveRecord::Migration[7.0]
  def up
    drop_table :ingredients
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
