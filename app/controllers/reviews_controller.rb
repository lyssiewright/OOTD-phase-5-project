class ReviewsController < ApplicationController
  def index
    render json: Reviews.all
  end

  def create
  end
end
