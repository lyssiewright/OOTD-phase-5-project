class FollowsController < ApplicationController
  def index
    render json: Follow.all
  end

  def show
    current_user = User.find(session[:user_id])
    follows = Follow.select{|follow| follow.follower_id == current_user.id || follow.followee_id === current_user.id}
    render json: follows
  end


  # def create
  #   follow = current_user.follows.build(:friend_id => params[:friend_id])
  #   if @friendship.save
  #     flash[:notice] = "Added friend."
  #     redirect_to root_url
  #   else
  #     flash[:error] = "Unable to add friend."
  #     redirect_to root_url
  #   end
  # end
  
  # def destroy
  #   @friendship = current_user.friendships.find(params[:id])
  #   @friendship.destroy
  #   flash[:notice] = "Removed friendship."
  #   redirect_to current_user
  # end

end
