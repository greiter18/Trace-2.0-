class ChangeDistanceData < ActiveRecord::Migration[5.2]
  def change
    remove_column :routes, :distance
    add_column :routes, :distance, :float
  end
end
