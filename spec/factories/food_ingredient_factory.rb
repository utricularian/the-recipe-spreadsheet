FactoryBot.define do
  factory :food_ingredient do
    sequence(:name) { |n| "Lettuce #{n}" }
    default_grams { rand(0..100) }
    calories_per_gram { rand(0..100) }
    fat_grams { rand(0..100) }
    carb_grams { rand(0..100) }
    protein_grams { rand(0..100) }
  end
end
