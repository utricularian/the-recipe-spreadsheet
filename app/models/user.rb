class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  before_save :generate_pantry_id

  private

  def generate_pantry_id
    self.pantry_id = SecureRandom.hex + DateTime.new.to_i.to_s if pantry_id.blank?
  end
end
