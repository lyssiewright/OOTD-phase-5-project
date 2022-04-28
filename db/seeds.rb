# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

# puts "🌱 Seeding users..."

8.times do
    User.create(name: Faker::Name.name, username: Faker::Internet.username(specifier: 1..25), theme: "/static/media/splatter_paint.9d3e183c.png", password: Faker::Internet.password(min_length: 8), bio: Faker::Lorem.paragraph(sentence_count: 2))
end

User.create(name: "lyssie Wright", username: "lyssiewright", password: "12345678", bio: "I love fashion")

puts "🌱 Seeding followers..."
6.times do
    Follow.create(follower_id: User.ids.sample, followee_id: User.ids.sample)
end

puts "✅ Done seeding!"