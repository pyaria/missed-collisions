# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

you = ["car", "bike", "pedestrian"]
them = ["car", "bike", "pedestrian", "road hazard"]
incident_type = ["run red light", "dangerous", "distracted"]

# latitude = 49.28587426347105, 49.27792359692219 = 0.00795066654885801
# longitude = -123.13119442085735, -123.11625988106243 = -0.014934539794921875
20.times do
  incident = Incident.new(you: you.sample,
                          them: them.sample,
                          incident_type: incident_type.sample)
  lat = rand()
  if lat >= 0.795066654885801
    incident.latitude = 49.27792359692219 + lat / 1000
  else
    incident.latitude = 49.27792359692219 + lat / 100
  end
  long = rand()
  if long <= 0.14934539794921875
    incident.longitude = -123.11625988106243 + long / 10
  else
    incident.longitude = -123.11625988106243 + long / 100
  end
  incident.reported_on = Faker::Date.backward(360)
  incident.reported_at = Faker::Time.backward(360)
  incident.location = Faker::Address.street_address
  incident.month = incident.reported_on.mon
  incident.phone_email = ""
  incident.details = ""
  incident.license = ""
  incident.save
end

# latitude = 49.23282692276315, 49.26851551822799 = 0.03568859546484049
# longitude = -122.99060374265537, -123.19651156431064 = 0.20590782165527344
100.times do
  incident = Incident.new(you: you.sample,
                          them: them.sample,
                          incident_type: incident_type.sample)
  lat = rand()
  if lat >= 0.3568859546484049
    incident.latitude = 49.23282692276315 + lat / 100
  else
    incident.latitude = 49.23282692276315 + lat / 10
  end
  long = rand()
  if long <= 0.20590782165527344
    incident.longitude = -123.19651156431064 + long
  else
    incident.longitude = -123.19651156431064 + long / 10
  end
  incident.reported_on = Faker::Date.backward(360)
  incident.reported_at = Faker::Time.backward(360)
  incident.location = Faker::Address.street_address
  incident.month = incident.reported_on.mon
  incident.phone_email = ""
  incident.details = ""
  incident.license = ""
  incident.save
end
