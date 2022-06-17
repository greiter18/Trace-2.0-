class Api::WorkoutsController < ApplicationController

#controller actions 
#class variables - shared across all instances of the class
#instance variables are specific to each instance of the class 
# @ is a instance variable
# @@ is a class variable  
# symbol - immutable string ':'
 def index
    #@workouts = User.find(params[:user_id]).workouts
    #prefetching 
    @routes = Route.includes(:workouts).where(user_id: params[:user_id])
    #@workouts = Workout.where(route_id: params[@route.id])

    #super efficient way 
    # @workouts = current_user.workouts 
    render :index 
  end

  def show # if you dont specify which view to render, rails will look for a matching one
    @workout = Workout.find(params[:id])
    render :show
  end

  def create
    @workout = Workout.new(workout_params)
    # @routes = Route.where(user_id: params[:user_id])
    if @workout.save
      render :show
    else
      render json: @workout.errors.full_messages, status: 422
    end
  end

  def destroy
    @workout = Workout.find_by(id: params[:id])
    if @workout.destroy
      render json: {}
    else
      render json: @route.errors.full_messages, status: 422
    end
  end

  def update
    @workout = Workout.find(params[:id])
    if @workout.update(workout_params)
      render :show
    else
      render json: @workout.errors.full_messages, status: 422
    end
  end

  def workout_params
    params.require(:workout).permit(
      :title,
      :description,
      :date,
      :hours,
      :minutes,
      :seconds,
      :run_type,
      :route_id
    )
  end
end


# @workouts.each do |workout|
#   json.set! workout.id do
#    json.extract! workout, :id, :title, :description, :date, :run_type, :route_id, :hours, :minutes, :seconds
#       json.route do 
#         json.extract! workout.route, :id, :title, :user_id
#         json.extract! workout.route.user, :id, :email
#       end
#   end
# end

