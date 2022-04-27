Rails.application.routes.draw do
  
  get '/reviews', to: 'reviews#index'
  post '/reviews', to: 'reviews#create'
  post '/outfits', to: 'outfits#create'
  get '/outfits', to: 'outfits#index'
  get '/outfits/:id', to: 'outfits#show'
  post "/login", to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get "/me", to: 'users#show'
  post "/signup", to: 'users#create'
  get '/users', to: 'users#index'
  patch '/me', to: 'users#update'
  delete '/users', to: 'users#destroy'
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
