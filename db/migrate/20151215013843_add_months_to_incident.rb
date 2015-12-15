class AddMonthsToIncident < ActiveRecord::Migration
  def change
    add_column :incidents, :month, :integer
  end
end
