class Click < ApplicationRecord
  DEFAULT = 'default'.freeze

  def self.click!
    default_click = Click.find_or_initialize_by(name: DEFAULT)
    default_click.num_times += 1
    default_click.last_clicked_at = Time.zone.now
    default_click.save!
  end
end
