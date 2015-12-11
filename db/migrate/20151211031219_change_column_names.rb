class ChangeColumnNames < ActiveRecord::Migration
  def change
    rename_column :incidents, :date, :reported_on
    rename_column :incidents, :time, :reported_at
  end
end
