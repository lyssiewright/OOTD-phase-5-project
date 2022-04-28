class FollowsController < ApplicationController
  def index
    render json: Follow.all
  end

  def create
  end
end
