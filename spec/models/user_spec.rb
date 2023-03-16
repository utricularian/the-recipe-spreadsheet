require 'rails_helper'

RSpec.describe User do
  context 'on create' do
    context 'without a pantry id' do
      it 'generates a unique pantry id' do
        user = build(:user)
        expect(user.pantry_id).to be_nil

        user.save!

        expect(user.pantry_id).not_to be_nil
      end
    end

    context 'with a pantry id' do
      it 'does not replace the pantry_id' do
        user = build(:user, pantry_id: 'pantryid')
        user.save!
        expect(user.pantry_id).to eq('pantryid')
      end
    end
  end
end
