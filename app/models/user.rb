class User < ApplicationRecord
    has_secure_password
    has_many :outfits
    # has_many :likes
    # has_many :outfits, through: :likes
    has_many :followed_users, foreign_key: :follower_id, class_name: "Follow"
    has_many :followees, through: :followed_users
    has_many :following_users, foreign_key: :followee_id, class_name: "Follow"
    has_many :followers, through: :following_users

    validates :password, presence: true, length: {minimum:8},on: :create
    validates :username, presence: true, uniqueness: true,length: {maximum:25}
end
