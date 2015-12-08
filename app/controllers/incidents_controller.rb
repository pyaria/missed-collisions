class IncidentsController < ApplicationController
  def index
    @incident = Incident.new
  end

  def new
    @incident = Incident.new
  end

  def create
    @incident = Incident.new incident_params
    location =  params[:location]
    @incident.location =
    respond_to do |format|
      if @incident.save
        format.html{redirect_to root_path}
        format.json{render :create_success}
      else
        flash[:alert] = "Error!"
        format.html{render :new}
        format.js{render :create_failure}
      end
    end
  end

  private
  def incident_params
    params.require(:incident).permit([:date_time, :location,
      :license, :you, :them, :incident_type, :details])
  end
end
