class OutfitsController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid,with: :render_unprocessable_entity

  def create
    outfit = Outfit.create!(outfit_params)
    if outfit.valid?
      render json: outfit, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def index
    current_user = User.find(session[:user_id])
    outfits = Outfit.select{|outfit| outfit.user.id == current_user.id}
    render json: outfits
end

  def show
  end



  private
    def outfit_params
      params.permit(:top, :top_img, :bottom, :bottom_img, :user_id)
    end

    def render_unprocessable_entity invalid
      render json: {errors: invalid.record.errors.full_messages},status: :unprocessable_entity
    end
  
end
