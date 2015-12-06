class RemoveLocation2FromIncidents < ActiveRecord::Migration
  def change
    remove_column :incidents, :location_2
  end
end
