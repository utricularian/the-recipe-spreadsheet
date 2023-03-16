FactoryBot.define do
  factory :pantry_ingredient do
    sequence(:pantry_id) { |n| "pantry_id-#{n}" }
    food_ingredient
  end
end
