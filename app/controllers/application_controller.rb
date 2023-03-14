class ApplicationController < ActionController::API
  respond_to :json
  include ActionController::MimeResponds

  def fallback_index_html
    render file: 'public/index.html'
  end
end
