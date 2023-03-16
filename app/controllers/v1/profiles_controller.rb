module V1
  class ProfilesController < ApplicationController
    before_action :authenticate_user!, only: [:show]

    def show
      render json: V1::UserSerializer.new(current_user).serializable_hash[:data][:attributes]
    end

    def update; end
  end
end
