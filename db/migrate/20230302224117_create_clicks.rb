class CreateClicks < ActiveRecord::Migration[7.0]
  def change
    create_table :clicks do |t|
      t.string :name, null: false
      t.integer :num_times, default: 0
      t.datetime :last_clicked_at, null: false

      t.timestamps
    end
  end
end
