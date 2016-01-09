Rails.application.routes.draw do
  mount Judge::Engine => '/judge'
  resources :incidents, only: [:index, :new, :create]
  get '/incidents/time' => 'incidents#time'
  root "incidents#index"
end
