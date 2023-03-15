Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  resources :clicks, only: [:index, :create]

  scope '/api' do
    scope '/v1' do
      devise_for :users, defaults: { format: :json }
    end

    namespace :v1 do
      resources :food_ingredients, only: [:index, :show, :update, :create]
      resource :profile, only: [:show, :update]
    end
  end

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
