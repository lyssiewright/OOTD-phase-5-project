class FollowsController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid,with: :render_unprocessable_entity

  def index
    render json: Follow.all
  end

  def show
    current_user = User.find(session[:user_id])
    follows = Follow.select{|follow| follow.follower_id == current_user.id || follow.followee_id === current_user.id}
    render json: follows
  end


  def create
    follow = Follow.create!(follow_params)
    render json: follow, status: :created
  end

  def destroy
    unfollowed = User.find_by(id: params[:id])
    current_user = session[:user_id]
    follow = unfollowed.following_users.find_by(follower_id: current_user)
    follow.destroy
    head :no_content
  end

  

  private
  
  def follow_params
    params.permit(:follower_id, :followee_id)
  end

  private

  def render_unprocessable_entity invalid
      render json: {errors: invalid.record.errors.full_messages},status: :unprocessable_entity
  end

end
