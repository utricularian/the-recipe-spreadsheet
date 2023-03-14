class DropClicks < ActiveRecord::Migration[7.0]
  def change
    drop_table :clicks
  end
end
