class AddPantryToUser < ActiveRecord::Migration[7.0]
  def up
    add_column :users, :pantry_id, :string
    execute "update users set pantry_id = encode(email::bytea, 'base64')"
    change_column :users, :pantry_id, :string, null: false
  end

  def down
    remove_column :users, :pantry_id
  end
end
