require 'rails_helper'

RSpec.describe Click, type: :model do
  let(:time) { Time.local(2023, 3, 2, 14, 44, 21) }
  before do
    Timecop.freeze(time)
  end

  after do
    Timecop.return
  end

  describe '.click!' do
    context 'when there is no default Click' do
      it 'creates the Click with info' do
        expect(Click.count).to eq(0)

        Click.click!

        expect(Click.count).to eq(1)

        click = Click.last

        expect(click.num_times).to eq(1)
        expect(click.last_clicked_at).to eq(time)
      end
    end
  end
end
