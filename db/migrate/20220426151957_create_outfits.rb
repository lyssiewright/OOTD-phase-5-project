class CreateOutfits < ActiveRecord::Migration[6.1]
  def change
    create_table :outfits do |t|
      t.string :outfit
      t.string :top_img
      t.string :bottom_img
      t.integer :user_id

      t.timestamps
    end
  end
end
