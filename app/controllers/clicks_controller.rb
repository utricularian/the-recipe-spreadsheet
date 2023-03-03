class ClicksController < ApplicationController

  def index
    render json: Click.all
  end

  def create
    Click.click!
    head :created
  end
end
