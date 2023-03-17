FactoryBot.define do
  factory :recipe do
    sequence(:name) { |n| "Recipe #{n}" }
    created_by factory: :user
  end
end
