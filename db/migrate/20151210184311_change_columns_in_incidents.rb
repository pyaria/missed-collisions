class ChangeColumnsInIncidents < ActiveRecord::Migration
  def change
    remove_column :incidents, :date_time
    add_column :incidents, :date, :date
    add_column :incidents, :time, :time
  end
end
