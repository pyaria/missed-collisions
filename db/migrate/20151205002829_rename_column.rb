class RenameColumn < ActiveRecord::Migration
  def change
    rename_column :incidents, :location_1, :location
  end
end
