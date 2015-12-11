Rails.application.routes.draw do
  mount Judge::Engine => '/judge'
  resources :incidents, only: [:index, :new, :create]
  root "incidents#index"
end
