class Outfit < ApplicationRecord
    # has_many :likes, dependent: :destroy
    # has_many :users, through: :likes
    belongs_to :user
    has_one_attached :top_img
    has_one_attached :bottom_img



end

