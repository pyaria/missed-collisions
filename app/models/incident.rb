class Incident < ActiveRecord::Base
  validates :date_time, presence: true
  validates :location, presence: true
  validates :you, presence: true
  validates :them, presence: true
  validates :incident_type, presence: true

  # validate   :phone_email_option
  validate :phone_email_which

  geocoded_by :location
  after_validation :geocode

  YOU = ["car", "bike", "pedestrian"]
  THEM = ["car", "bike", "pedestrian", "road hazard"]

  def phone_email_which
    if phone_email.present?
      if phone_email.include? "@"
        "email"
      else
        validate_phone
        "phone"
      end
    end
  end

  private

  def validate_phone
    if phone_email.match(/[a-z]/i).present?
      errors.add(:phone_email, "Please remove alphabet characters from your phone number!")
    else
      stripped_pe = phone_email.gsub(/\W/, "")
      if stripped_pe.length > 11
        errors.add(:phone_email, "There are too many digits in your phone number!")
      elsif stripped_pe.length < 10
        errors.add(:phone_email, "There are not enough digits in your phone number!")
      end
    end
  end
end
