class AddLowerNameUniqueIndexToFoodIngredients < ActiveRecord::Migration[7.0]
  def up
    execute 'create unique index idx_lower_name_unique on food_ingredients (lower(name))'
  end

  def down
    execute 'drop index idx_lower_name_unique'
  end
end
