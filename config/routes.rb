Rails.application.routes.draw do
  resources :incidents, only: [:index, :new, :create]
  root "incidents#index"
end
