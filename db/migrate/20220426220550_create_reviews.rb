class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.text :note
      t.integer :user_id
      t.integer :outfit_id
      t.timestamps
    end
  end
end
