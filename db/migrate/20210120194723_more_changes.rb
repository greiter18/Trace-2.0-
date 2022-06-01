class MoreChanges < ActiveRecord::Migration[5.2]
  def change
    #database constraint for having unique emails 
    # last resort to prevent having unique email 
    # will send back a nasty error message :( 
    add_column :users, :email, :string, null: false
    remove_column :users, :username
    add_index :users, :email, unique: true 
  end
end
