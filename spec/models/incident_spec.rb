require 'rails_helper'

RSpec.describe Incident, type: :model do
  def valid_params(new_params = {})
    {
      date_time: Faker::Time.between(DateTime.now - 90, DateTime.now),
      phone_email: Faker::PhoneNumber.cell_phone,
      license: Faker::Address.postcode,
      location_1: Faker::Address.street_address,
      # location_1: Faker::Address.street_name,
      # location_2: Faker::Address.street_name,
      you: ["car", "bike", "pedestrian"].sample,
      them: ["car", "bike", "pedestrian", "road hazard"].sample,
      incident_type: Faker::Book.title,
      details: Faker::Lorem.paragraph
    }.merge(new_params)
  end

  #### ASK TA: how can I dynamically swap out a field that takes a string for an email field?

  describe "validations" do
    context "must be present" do

      it "requires a date_time" do
        incident = Incident.new valid_params({date_time: nil})
        expect(incident).to be_invalid
      end
      it "requires a location_1" do
        incident = Incident.new valid_params({location_1: nil})
        expect(incident).to be_invalid
      end
      it "requires a you" do
        incident = Incident.new valid_params({you: nil})
        expect(incident).to be_invalid
      end
      it "requires a them" do
        incident = Incident.new valid_params({them: nil})
        expect(incident).to be_invalid
      end
      it "requires an incident_type" do
        incident = Incident.new valid_params({incident_type: nil})
        expect(incident).to be_invalid
      end
    end

    context "phone_email has alternate entries" do

      it "allows nil phone_email" do
        incident = Incident.new valid_params({phone_email: nil})
        expect(incident).to be_valid
      end

      it "recognizes an email input" do
        incident = Incident.new valid_params({phone_email: Faker::Internet.email})
        # GIVEN an input that is an email
        # WHEN submitted, it recognizes that it is an email
        # THEN it returns "email" for email validation
        expect(incident.phone_email_which).to eq("email")
      end

      it "recognizes a phone input" do
        incident = Incident.new valid_params
        # GIVEN an input that is a phone number
        # WHEN submitted, it recognizes that it is a phone number
        # THEN it returns "phone" for phone validation
        expect(incident.phone_email_which).to eq("phone")
      end

      context "invalid phone number" do

        it "rejects a phone number with alphabet characters" do
          incident = Incident.new valid_params({phone_email: "421-43g-5559"})
          expect(incident).to be_invalid
        end

        it "rejects a phone_number with number of digits greater than 11" do
          incident = Incident.new valid_params({phone_email: "1555-546-55498"})
          expect(incident).to be_invalid
        end

        it "rejects a phone number with number of digits less than 10" do
          incident = Incident.new valid_params({phone_email: "234"})
          expect(incident).to be_invalid
        end
      end

      context "valid phone number" do

        it "saves the phone number in the database" do
          incident = Incident.new valid_params
          expect(incident).to be_valid

        end

      end

    end
  end

  describe "one location" do

    it "requires location_1 to be a street address with digits and alpha characters" do
      incident = Incident.new valid_params({location_1: Faker::PhoneNumber.cell_phone})
      expect(incident).to be_invalid
    end

    it "requires location_2 to be filled in if location_1 has no digits" do
      incident = Incident.new valid_params({location_1: Faker::Address.street_name})
      expect(incident).to be_invalid
    end

    # THIS IS NOT TRUE. IE, 5TH AVENUE. 21ST ST.
    # it "requires location_2 to have no digits if location_1 has no digits" do
    #   incident = Incident.new valid_params({location_1: Faker::Address.street_name,
    #           location_2:Faker::Address.street_address })
    #   expect(incident).to be_invalid
    # end

  end

  describe "for two locations" do

    context "valid inputs" do

      it "recognizes when location_1 and location_2 cross"

    end

    context "invalid inputs" do

      it "recognizes if location_1 is not a valid street"
      it "recognizes if location_2 is not a valid street"
      it "recognizes when location_1 and location_2 do not cross"
      it "flashes an alert with useful error message information"

    end

  end

  describe "incident type" do
    context "valid or similar input" do
      it "recognizes similar expressions that change at front"
      it "recognizes similar expressions that change at middle"
      it "recognizes similar expressions that change at end"
      it "autocompletes to similar expression in database"
    end

    context "invalid input" do
      it "recognizes when an input is not in database"
    end


  end
end
