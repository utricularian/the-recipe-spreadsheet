Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  resources :clicks, only: [:index, :create]

  scope '/api' do
    scope '/v1' do
      devise_for :users, path: '', defaults: { format: :json }, path_names: {
        sign_in: 'login',
        sign_out: 'logout',
        registration: 'signup'
      }, controllers: {
        sessions: 'users/sessions',
        registrations: 'users/registrations'
      }
    end

    namespace :v1 do
      resources :food_ingredients, only: [:index, :show, :update, :create]
      resources :pantry_ingredients, only: [:index, :create, :destroy]
      delete '/pantry_ingredients', to: 'pantry_ingredients#clear'
      resource :profile, only: [:show, :update]
      resources :recipes, only: [:index, :show]
      namespace :user do
        resources :recipes, only: [:index, :create, :update]
      end
    end
  end

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
