class AddColumnToIncidents < ActiveRecord::Migration
  def change
    add_column :incidents, :license, :string
  end
end
