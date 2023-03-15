module V1
  class UserSerializer
    include JSONAPI::Serializer
    attributes :id, :email
  end
end
