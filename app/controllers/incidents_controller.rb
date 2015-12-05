class IncidentsController < ApplicationController
  def index
  end

  def new
    @incident = Incident.new
  end

  def create
    @incident = Incident.new incident_params
  end

  private
  def incident_params
    params.require(:incident).permit([:date_time, :location_1, :location_2,
      :license, :you, :them, :incident_type, :details])
  end
end
