class CreateIncidents < ActiveRecord::Migration
  def change
    create_table :incidents do |t|
      t.datetime :date_time
      t.string :phone_email
      t.string :location_1
      t.string :location_2
      t.string :you
      t.string :them
      t.string :incident_type
      t.text :details

      t.timestamps null: false
    end
  end
end
