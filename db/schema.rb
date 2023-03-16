# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_03_15_223058) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "food_ingredients", force: :cascade do |t|
    t.string "name", null: false
    t.float "default_grams", null: false
    t.float "calories_per_gram", null: false
    t.float "fat_grams", null: false
    t.float "carb_grams", null: false
    t.float "protein_grams", null: false
    t.boolean "verified", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index "lower((name)::text)", name: "idx_lower_name_unique", unique: true
    t.index ["name"], name: "index_food_ingredients_on_name", unique: true
  end

  create_table "pantry_ingredients", force: :cascade do |t|
    t.bigint "food_ingredient_id", null: false
    t.string "pantry_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["food_ingredient_id"], name: "index_pantry_ingredients_on_food_ingredient_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "jti", null: false
    t.string "pantry_id", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["jti"], name: "index_users_on_jti", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "pantry_ingredients", "food_ingredients"
end
