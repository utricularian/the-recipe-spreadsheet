module V1
  class ProfilesController < ApplicationController
    before_action :authenticate_user!, only: [:show]

    def show
      render json: current_user.to_json(only: [:id, :email])
    end

    def update; end
  end
end
