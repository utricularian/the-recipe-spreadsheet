class DropDrinks < ActiveRecord::Migration[7.0]
  def up
    drop_table :drinks
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
