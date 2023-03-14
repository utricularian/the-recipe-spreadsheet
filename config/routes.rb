Rails.application.routes.draw do
  devise_for :users, defaults: { format: :json }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  resources :clicks, only: [:index, :create]

  scope '/api' do
    resources :drinks
    resource :profile, only: [:show, :update]
  end

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
