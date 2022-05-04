class UsersController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid,with: :render_unprocessable_entity
  rescue_from ActiveRecord::RecordNotFound,with: :render_not_found
  
  
    def index
      users = User.all
      render json: users, include: [:followees, :followers]
  end
  
  def create
      user = User.create!(user_params)
      if user.valid?
        session[:user_id] = user.id
        render json: user, status: :created
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def show
      user = User.find(session[:user_id])
      if user
        render json: user, include: [:followees, :followers]
      else
        render json: {error: "Not authorized"}, status: :unauthorized
      end
    end
  
    def update
      user = User.find(session[:user_id])
      user.update!(user_update_params)
      render json: user
    end
  
    def destroy
      user = User.find(session[:user_id])
      user.reviews.update_all(user_id:nil)
      user.destroy
      session.delete :user_id
      head :no_content
    end

    def search
      users = User.where("lower(username) LIKE ?", "%" + params[:searchterm].downcase + "%")
      render json: users, status: :ok
    end
    # def follow
    #   @user = User.find(params[:id])
    #   current_user.followees << @user
    #   redirect_back(fallback_location: user_path(@user))
    # end
    
    # def unfollow
    #   @user = User.find(params[:id])
    #   current_user.followed_users.find_by(followee_id: @user.id).destroy
    #   redirect_back(fallback_location: user_path(@user))
    # end
    # def follow
    #   @user = User.find(params[:id])
    #   @current_user=User.find_by(id: session[:user_id])
    #   @current_user.followees << @user
    #   @current_user.save
    #   # redirect_back(fallback_location:”/”)
    #   end

    # def unfollow
    #   @user = User.find(params[:id])
    #   @current_user=User.find_by(id: session[:user_id])
    #   @current_user.followees.delete(@user)
    #   @current_user.save
    #   # redirect_back(fallback_location:”/”)
    #   end
  
    private
  
    def user_params
      params.permit(:username, :password, :bio, :theme, :name)
    end
  
    def user_update_params
      params.permit(:username,:bio, :theme)
    end
  
    def render_unprocessable_entity invalid
      render json: {errors: invalid.record.errors.full_messages},status: :unprocessable_entity
    end
  
    def render_not_found
      render json: {error: "User not found"}, status: 404
    end
  end
