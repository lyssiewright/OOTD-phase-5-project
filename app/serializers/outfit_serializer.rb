class OutfitSerializer < ActiveModel::Serializer
  
include Rails.application.routes.url_helpers
  attributes :id, :top, :top_img, :bottom, :bottom_img
  belongs_to :user


  def top_img
    rails_blob_path(object.top_img, only_path: true) if object.top_img.attached?
  end

  def bottom_img
    rails_blob_path(object.bottom_img, only_path: true) if object.bottom_img.attached?
  end

end
