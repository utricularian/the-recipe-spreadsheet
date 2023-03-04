require 'rails_helper'

RSpec.describe 'Clicks' do
  describe 'GET /clicks' do
    let(:click_at) { Time.zone.local(2023, 3, 2, 14, 44, 21) }

    before do
      Timecop.freeze(click_at)
      11.times { Click.click! }
    end

    after do
      Timecop.return
    end

    it 'returns the clicks' do
      get '/clicks'

      expect(response).to be_ok
      json = response.parsed_body
      expect(json).to be_a(Array)
      expect(json.length).to eq(1)

      click = json.first.deep_symbolize_keys
      expect(click[:num_times]).to eq(11)
      expect(DateTime.parse(click[:last_clicked_at])).to eq(click_at)
    end
  end

  describe 'POST /clicks' do
    let(:first_click_at) { Time.zone.local(2023, 3, 2, 14, 44, 21) }
    let(:second_click_at) { Time.zone.local(2023, 3, 2, 17, 33, 11) }

    before do
      Timecop.freeze(first_click_at)
      Click.click!
    end

    after do
      Timecop.return
    end

    it 'updates the default click' do
      expect(Click.count).to eq(1)
      default_click = Click.last
      expect(default_click.name).to eq(Click::DEFAULT)
      expect(default_click.num_times).to eq(1)
      expect(default_click.last_clicked_at).to eq(first_click_at)

      Timecop.freeze(second_click_at)
      post '/clicks'

      expect(response).to have_http_status(:created)
      expect(Click.count).to eq(1)

      default_click = Click.last
      expect(default_click.name).to eq(Click::DEFAULT)
      expect(default_click.num_times).to eq(2)
      expect(default_click.last_clicked_at).to eq(second_click_at)
    end
  end
end
