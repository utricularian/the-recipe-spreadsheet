FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "user#{n}@example.com" }
    password { 'password123456790' }
    jti { 'some-jti-secret' }
  end
end
