class CreateOutfits < ActiveRecord::Migration[6.1]
  def change
    create_table :outfits do |t|
      t.string :top
      t.string :bottom
      t.string :top_img
      t.string :bottom_img

      t.timestamps
    end
  end
end
