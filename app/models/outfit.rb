class Outfit < ApplicationRecord
    has_many :reviews, dependent: :destroy
    has_many :users, through: :reviews
    has_one_attached :top_img
    has_one_attached :bottom_img
end
