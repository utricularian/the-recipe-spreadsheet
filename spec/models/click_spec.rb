require 'rails_helper'

RSpec.describe Click do
  let(:time) { Time.zone.local(2023, 3, 2, 14, 44, 21) }

  before do
    Timecop.freeze(time)
  end

  after do
    Timecop.return
  end

  describe '.click!' do
    context 'when there is no default Click' do
      it 'creates the Click' do
        expect { described_class.click! }.to change(described_class, :count).by(1)
      end

      describe 'the newly created Click' do
        let(:click) { described_class.last }

        before do
          described_class.click!
        end

        it 'has the right info' do
          expect(click.num_times).to eq(1)
          expect(click.last_clicked_at).to eq(time)
        end
      end
    end
  end
end
