module V1
  class UserSerializer
    include JSONAPI::Serializer
    attributes :id, :email, :pantry_id
  end
end
