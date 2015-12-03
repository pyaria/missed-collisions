class Incident < ActiveRecord::Base
  validates :date_time, presence: true
  validates :location_1, presence: {scope: :location_2}
  validates :you, presence: true
  validates :them, presence: true
  validates :incident_type, presence: true

  # validate   :phone_email_option
  validate :phone_email_which
  validate :locations

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

  def locations
    if location_1 == nil && location_2 == nil
      errors.add(:phone_email, "Please enter a street address (eg, 1234 Broadway)
            in 'street 1' or cross streets in 'street 1' and 'street 2'
            (eg, street 1: Broadway street 2: Granville)")
    elsif location_1.present? && location_2 == nil
      if !(location_1.match(/\d/).present? && location_1.match(/[a-z]/i).present?)
        errors.add(:phone_email, "Please enter a street address (eg, 1234 Broadway)
              in 'street 1' or cross streets in 'street 1' and 'street 2'
              (eg, street 1: Broadway street 2: Granville)")
      end
    elsif location_1 == nil && location_2 == nil
      errors.add(:phone_email, "Please enter a street address (eg, 1234 Broadway)
            in 'street 1' or cross streets in 'street 1' and 'street 2'
            (eg, street 1: Broadway street 2: Granville)")
    end
  end
end
