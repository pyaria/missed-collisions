class IncidentsController < ApplicationController


  def index
    @incident = Incident.new
    @incidents = Incident.all
    respond_to do |format|
      format.html {render}
      format.json {render json: @incidents.to_json }
    end
  end

  def new
    @incident = Incident.new
    if params.length == 3
      @incidents = Incident.all
    else
      filters = []
      params.each { |k, v| filters.push(k) if v == "true" }
      search_terms = filters.map { |x| x.split("_") }
      sql_search_term = []
      search_terms.each do |array|
        sql_search_term.push(array[0] + " = '" + array[1] + "'")
      end
      @incidents = Incident.where(sql_search_term.join(" OR "))
    end
    respond_to do |format|
      format.html {render}
      format.json {render json: @incidents.to_json }
    end
  end

  def create
    @incident = Incident.new incident_params
    respond_to do |format|
      if @incident.save
        format.html{redirect_to root_path}
        format.json{render :create_success}
      else
        flash[:alert] = "Error!"
        format.html{render :index}

      end
    end
  end

  private
  def incident_params
    params.require(:incident).permit([:reported_on, :reported_at, :phone_email, :location,
      :license, :you, :them, :incident_type, :details, :latitude, :longitude])
  end
end
