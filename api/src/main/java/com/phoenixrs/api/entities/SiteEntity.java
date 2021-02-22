/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
package com.phoenixrs.api.entities;
import java.util.Date;
import java.util.List;

public class SiteEntity {
	private int id;
	private int id_customer;
	private int id_country;
	private int id_time_zone;
	private String name;
	private String street;
	private double lat;
	private double lng;
	private String old_data;
	private String number;
	private String postal_code;
	private String city;
	private String state;
	private String commissioning;
	private String emergency_contact;
	private double ac_capacity;
	private double dc_capacity;
	private int status;
	private int is_delete;
	private Date created_date;
	private String created_by;
	private Date updated_date;
	private String updated_by;
	private String built_since;
	private int limit;
	private int offset;
	private int totalRecord;
	private String order_by;
	private String sort_by;
	private String address_short;
	private double watts_3ph_total;
	private double sensor1_data;
	private double w_hours_total;
	
	private double w_hours_received;
	private double eer_this_month;
	private double total_energy_this_month;
	private double today_kwh;
	private double eer_last_month;
	private int total_error;
	private String alert_list;
	private String kpi_type;
	
	private List irradiance;
	private List power;
	private List energy;
	private String kpi_filter;
	private String offset_timezone;
	private List activeAlarm;
	
	
	private int total_site;
	private double installed_capacity;
	private double expected_last_month;
	private double expected_this_month;
	private double measured_today;
	private double measured_this_month;
	private double measured_last_month;
	private Float err_this_month;
	private Float err_last_month;
	private double err_today;
	private double expected_today;
	private String today;
	private String this_month;
	private String last_month;
	private String gallery;
	private int id_site_type;
	private String street_ws;
	private String file_upload;
	private String current_time;
	
	private double energy_this_year;
	private double energy_this_month;
	private double energy_today;
	private double ac_power;
	private double energy_lifetime;
	private String filterBy;
	private String start_date;
	private String end_date;
	private int device_type;
	private int id_site;
	private int id_device;
	private String localization_format;
	private String format_sql_short;
	private String format_sql_long;
	private String format_sql_string_short;
	private String format_sql_string_long;
	private String format_sql_string_mdy;
	private String offset_from;
	private String typeView;
	private String keyword;
	private String sort_column;
	private int screen_mode;
	private int is_manage;
	private int id_employee;
	private List id_sites;
	
	/**
	 * @return the id
	 */
	public int getId() {
		return id;
	}
	/**
	 * @param id the id to set
	 */
	public void setId(int id) {
		this.id = id;
	}
	/**
	 * @return the id_customer
	 */
	public int getId_customer() {
		return id_customer;
	}
	/**
	 * @param id_customer the id_customer to set
	 */
	public void setId_customer(int id_customer) {
		this.id_customer = id_customer;
	}
	/**
	 * @return the id_country
	 */
	public int getId_country() {
		return id_country;
	}
	/**
	 * @param id_country the id_country to set
	 */
	public void setId_country(int id_country) {
		this.id_country = id_country;
	}
	/**
	 * @return the id_time_zone
	 */
	public int getId_time_zone() {
		return id_time_zone;
	}
	/**
	 * @param id_time_zone the id_time_zone to set
	 */
	public void setId_time_zone(int id_time_zone) {
		this.id_time_zone = id_time_zone;
	}
	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}
	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * @return the street
	 */
	public String getStreet() {
		return street;
	}
	/**
	 * @param street the street to set
	 */
	public void setStreet(String street) {
		this.street = street;
	}
	/**
	 * @return the lat
	 */
	public double getLat() {
		return lat;
	}
	/**
	 * @param lat the lat to set
	 */
	public void setLat(double lat) {
		this.lat = lat;
	}
	/**
	 * @return the lng
	 */
	public double getLng() {
		return lng;
	}
	/**
	 * @param lng the lng to set
	 */
	public void setLng(double lng) {
		this.lng = lng;
	}
	/**
	 * @return the old_data
	 */
	public String getOld_data() {
		return old_data;
	}
	/**
	 * @param old_data the old_data to set
	 */
	public void setOld_data(String old_data) {
		this.old_data = old_data;
	}
	/**
	 * @return the number
	 */
	public String getNumber() {
		return number;
	}
	/**
	 * @param number the number to set
	 */
	public void setNumber(String number) {
		this.number = number;
	}
	/**
	 * @return the postal_code
	 */
	public String getPostal_code() {
		return postal_code;
	}
	/**
	 * @param postal_code the postal_code to set
	 */
	public void setPostal_code(String postal_code) {
		this.postal_code = postal_code;
	}
	/**
	 * @return the city
	 */
	public String getCity() {
		return city;
	}
	/**
	 * @param city the city to set
	 */
	public void setCity(String city) {
		this.city = city;
	}
	/**
	 * @return the state
	 */
	public String getState() {
		return state;
	}
	/**
	 * @param state the state to set
	 */
	public void setState(String state) {
		this.state = state;
	}
	/**
	 * @return the commissioning
	 */
	public String getCommissioning() {
		return commissioning;
	}
	/**
	 * @param commissioning the commissioning to set
	 */
	public void setCommissioning(String commissioning) {
		this.commissioning = commissioning;
	}
	/**
	 * @return the emergency_contact
	 */
	public String getEmergency_contact() {
		return emergency_contact;
	}
	/**
	 * @param emergency_contact the emergency_contact to set
	 */
	public void setEmergency_contact(String emergency_contact) {
		this.emergency_contact = emergency_contact;
	}
	/**
	 * @return the ac_capacity
	 */
	public double getAc_capacity() {
		return ac_capacity;
	}
	/**
	 * @param ac_capacity the ac_capacity to set
	 */
	public void setAc_capacity(double ac_capacity) {
		this.ac_capacity = ac_capacity;
	}
	/**
	 * @return the dc_capacity
	 */
	public double getDc_capacity() {
		return dc_capacity;
	}
	/**
	 * @param dc_capacity the dc_capacity to set
	 */
	public void setDc_capacity(double dc_capacity) {
		this.dc_capacity = dc_capacity;
	}
	/**
	 * @return the status
	 */
	public int getStatus() {
		return status;
	}
	/**
	 * @param status the status to set
	 */
	public void setStatus(int status) {
		this.status = status;
	}
	/**
	 * @return the is_delete
	 */
	public int getIs_delete() {
		return is_delete;
	}
	/**
	 * @param is_delete the is_delete to set
	 */
	public void setIs_delete(int is_delete) {
		this.is_delete = is_delete;
	}
	/**
	 * @return the created_date
	 */
	public Date getCreated_date() {
		return created_date;
	}
	/**
	 * @param created_date the created_date to set
	 */
	public void setCreated_date(Date created_date) {
		this.created_date = created_date;
	}
	/**
	 * @return the created_by
	 */
	public String getCreated_by() {
		return created_by;
	}
	/**
	 * @param created_by the created_by to set
	 */
	public void setCreated_by(String created_by) {
		this.created_by = created_by;
	}
	/**
	 * @return the updated_date
	 */
	public Date getUpdated_date() {
		return updated_date;
	}
	/**
	 * @param updated_date the updated_date to set
	 */
	public void setUpdated_date(Date updated_date) {
		this.updated_date = updated_date;
	}
	/**
	 * @return the updated_by
	 */
	public String getUpdated_by() {
		return updated_by;
	}
	/**
	 * @param updated_by the updated_by to set
	 */
	public void setUpdated_by(String updated_by) {
		this.updated_by = updated_by;
	}
	/**
	 * @return the build_since
	 */
	public String getBuilt_since() {
		return built_since;
	}
	/**
	 * @param build_since the build_since to set
	 */
	public void setBuilt_since(String built_since) {
		this.built_since = built_since;
	}
	/**
	 * @return the limit
	 */
	public int getLimit() {
		return limit;
	}
	/**
	 * @param limit the limit to set
	 */
	public void setLimit(int limit) {
		this.limit = limit;
	}
	/**
	 * @return the offset
	 */
	public int getOffset() {
		return offset;
	}
	/**
	 * @param offset the offset to set
	 */
	public void setOffset(int offset) {
		this.offset = offset;
	}
	/**
	 * @return the totalRecord
	 */
	public int getTotalRecord() {
		return totalRecord;
	}
	/**
	 * @param totalRecord the totalRecord to set
	 */
	public void setTotalRecord(int totalRecord) {
		this.totalRecord = totalRecord;
	}
	/**
	 * @return the order_by
	 */
	public String getOrder_by() {
		return order_by;
	}
	/**
	 * @param order_by the order_by to set
	 */
	public void setOrder_by(String order_by) {
		this.order_by = order_by;
	}
	/**
	 * @return the sort_by
	 */
	public String getSort_by() {
		return sort_by;
	}
	/**
	 * @param sort_by the sort_by to set
	 */
	public void setSort_by(String sort_by) {
		this.sort_by = sort_by;
	}
	/**
	 * @return the address_short
	 */
	public String getAddress_short() {
		return address_short;
	}
	/**
	 * @param address_short the address_short to set
	 */
	public void setAddress_short(String address_short) {
		this.address_short = address_short;
	}
	/**
	 * @return the watts_3ph_total
	 */
	public double getWatts_3ph_total() {
		return watts_3ph_total;
	}
	/**
	 * @param watts_3ph_total the watts_3ph_total to set
	 */
	public void setWatts_3ph_total(double watts_3ph_total) {
		this.watts_3ph_total = watts_3ph_total;
	}
	/**
	 * @return the sensor1_data
	 */
	public double getSensor1_data() {
		return sensor1_data;
	}
	/**
	 * @param sensor1_data the sensor1_data to set
	 */
	public void setSensor1_data(double sensor1_data) {
		this.sensor1_data = sensor1_data;
	}
	/**
	 * @return the w_hours_total
	 */
	public double getW_hours_total() {
		return w_hours_total;
	}
	/**
	 * @param w_hours_total the w_hours_total to set
	 */
	public void setW_hours_total(double w_hours_total) {
		this.w_hours_total = w_hours_total;
	}
	/**
	 * @return the w_hours_received
	 */
	public double getW_hours_received() {
		return w_hours_received;
	}
	/**
	 * @param w_hours_received the w_hours_received to set
	 */
	public void setW_hours_received(double w_hours_received) {
		this.w_hours_received = w_hours_received;
	}
	/**
	 * @return the eer_this_month
	 */
	public double getEer_this_month() {
		return eer_this_month;
	}
	/**
	 * @param eer_this_month the eer_this_month to set
	 */
	public void setEer_this_month(double eer_this_month) {
		this.eer_this_month = eer_this_month;
	}
	/**
	 * @return the total_energy_this_month
	 */
	public double getTotal_energy_this_month() {
		return total_energy_this_month;
	}
	/**
	 * @param total_energy_this_month the total_energy_this_month to set
	 */
	public void setTotal_energy_this_month(double total_energy_this_month) {
		this.total_energy_this_month = total_energy_this_month;
	}
	/**
	 * @return the today_kwh
	 */
	public double getToday_kwh() {
		return today_kwh;
	}
	/**
	 * @param today_kwh the today_kwh to set
	 */
	public void setToday_kwh(double today_kwh) {
		this.today_kwh = today_kwh;
	}
	/**
	 * @return the eer_last_month
	 */
	public double getEer_last_month() {
		return eer_last_month;
	}
	/**
	 * @param eer_last_month the eer_last_month to set
	 */
	public void setEer_last_month(double eer_last_month) {
		this.eer_last_month = eer_last_month;
	}
	/**
	 * @return the total_error
	 */
	public int getTotal_error() {
		return total_error;
	}
	/**
	 * @param total_error the total_error to set
	 */
	public void setTotal_error(int total_error) {
		this.total_error = total_error;
	}
	/**
	 * @return the alert_list
	 */
	public String getAlert_list() {
		return alert_list;
	}
	/**
	 * @param alert_list the alert_list to set
	 */
	public void setAlert_list(String alert_list) {
		this.alert_list = alert_list;
	}
	/**
	 * @return the kpi_type
	 */
	public String getKpi_type() {
		return kpi_type;
	}
	/**
	 * @param kpi_type the kpi_type to set
	 */
	public void setKpi_type(String kpi_type) {
		this.kpi_type = kpi_type;
	}
	/**
	 * @return the irradiance
	 */
	public List getIrradiance() {
		return irradiance;
	}
	/**
	 * @param irradiance the irradiance to set
	 */
	public void setIrradiance(List irradiance) {
		this.irradiance = irradiance;
	}
	/**
	 * @return the power
	 */
	public List getPower() {
		return power;
	}
	/**
	 * @param power the power to set
	 */
	public void setPower(List power) {
		this.power = power;
	}
	/**
	 * @return the energy
	 */
	public List getEnergy() {
		return energy;
	}
	/**
	 * @param energy the energy to set
	 */
	public void setEnergy(List energy) {
		this.energy = energy;
	}
	/**
	 * @return the kpi_filter
	 */
	public String getKpi_filter() {
		return kpi_filter;
	}
	/**
	 * @param kpi_filter the kpi_filter to set
	 */
	public void setKpi_filter(String kpi_filter) {
		this.kpi_filter = kpi_filter;
	}
	/**
	 * @return the offset_timezone
	 */
	public String getOffset_timezone() {
		return offset_timezone;
	}
	/**
	 * @param offset_timezone the offset_timezone to set
	 */
	public void setOffset_timezone(String offset_timezone) {
		this.offset_timezone = offset_timezone;
	}
	/**
	 * @return the activeAlarm
	 */
	public List getActiveAlarm() {
		return activeAlarm;
	}
	/**
	 * @param activeAlarm the activeAlarm to set
	 */
	public void setActiveAlarm(List activeAlarm) {
		this.activeAlarm = activeAlarm;
	}
	/**
	 * @return the total_site
	 */
	public int getTotal_site() {
		return total_site;
	}
	/**
	 * @param total_site the total_site to set
	 */
	public void setTotal_site(int total_site) {
		this.total_site = total_site;
	}
	/**
	 * @return the installed_capacity
	 */
	public double getInstalled_capacity() {
		return installed_capacity;
	}
	/**
	 * @param installed_capacity the installed_capacity to set
	 */
	public void setInstalled_capacity(double installed_capacity) {
		this.installed_capacity = installed_capacity;
	}
	/**
	 * @return the expected_last_month
	 */
	public double getExpected_last_month() {
		return expected_last_month;
	}
	/**
	 * @param expected_last_month the expected_last_month to set
	 */
	public void setExpected_last_month(double expected_last_month) {
		this.expected_last_month = expected_last_month;
	}
	/**
	 * @return the expected_this_month
	 */
	public double getExpected_this_month() {
		return expected_this_month;
	}
	/**
	 * @param expected_this_month the expected_this_month to set
	 */
	public void setExpected_this_month(double expected_this_month) {
		this.expected_this_month = expected_this_month;
	}
	/**
	 * @return the measured_today
	 */
	public double getMeasured_today() {
		return measured_today;
	}
	/**
	 * @param measured_today the measured_today to set
	 */
	public void setMeasured_today(double measured_today) {
		this.measured_today = measured_today;
	}
	/**
	 * @return the measured_this_month
	 */
	public double getMeasured_this_month() {
		return measured_this_month;
	}
	/**
	 * @param measured_this_month the measured_this_month to set
	 */
	public void setMeasured_this_month(double measured_this_month) {
		this.measured_this_month = measured_this_month;
	}
	/**
	 * @return the measured_last_month
	 */
	public double getMeasured_last_month() {
		return measured_last_month;
	}
	/**
	 * @param measured_last_month the measured_last_month to set
	 */
	public void setMeasured_last_month(double measured_last_month) {
		this.measured_last_month = measured_last_month;
	}
	/**
	 * @return the err_this_month
	 */
	public Float getErr_this_month() {
		return err_this_month;
	}
	/**
	 * @param err_this_month the err_this_month to set
	 */
	public void setErr_this_month(Float err_this_month) {
		this.err_this_month = err_this_month;
	}
	/**
	 * @return the err_last_month
	 */
	public Float getErr_last_month() {
		return err_last_month;
	}
	/**
	 * @param err_last_month the err_last_month to set
	 */
	public void setErr_last_month(Float err_last_month) {
		this.err_last_month = err_last_month;
	}
	/**
	 * @return the err_today
	 */
	public double getErr_today() {
		return err_today;
	}
	/**
	 * @param err_today the err_today to set
	 */
	public void setErr_today(double err_today) {
		this.err_today = err_today;
	}
	/**
	 * @return the expected_today
	 */
	public double getExpected_today() {
		return expected_today;
	}
	/**
	 * @param expected_today the expected_today to set
	 */
	public void setExpected_today(double expected_today) {
		this.expected_today = expected_today;
	}
	/**
	 * @return the today
	 */
	public String getToday() {
		return today;
	}
	/**
	 * @param today the today to set
	 */
	public void setToday(String today) {
		this.today = today;
	}
	/**
	 * @return the this_month
	 */
	public String getThis_month() {
		return this_month;
	}
	/**
	 * @param this_month the this_month to set
	 */
	public void setThis_month(String this_month) {
		this.this_month = this_month;
	}
	/**
	 * @return the last_month
	 */
	public String getLast_month() {
		return last_month;
	}
	/**
	 * @param last_month the last_month to set
	 */
	public void setLast_month(String last_month) {
		this.last_month = last_month;
	}
	/**
	 * @return the gallery
	 */
	public String getGallery() {
		return gallery;
	}
	/**
	 * @param gallery the gallery to set
	 */
	public void setGallery(String gallery) {
		this.gallery = gallery;
	}
	/**
	 * @return the id_site_type
	 */
	public int getId_site_type() {
		return id_site_type;
	}
	/**
	 * @param id_site_type the id_site_type to set
	 */
	public void setId_site_type(int id_site_type) {
		this.id_site_type = id_site_type;
	}
	/**
	 * @return the street_ws
	 */
	public String getStreet_ws() {
		return street_ws;
	}
	/**
	 * @param street_ws the street_ws to set
	 */
	public void setStreet_ws(String street_ws) {
		this.street_ws = street_ws;
	}
	/**
	 * @return the file_upload
	 */
	public String getFile_upload() {
		return file_upload;
	}
	/**
	 * @param file_upload the file_upload to set
	 */
	public void setFile_upload(String file_upload) {
		this.file_upload = file_upload;
	}
	/**
	 * @return the current_time
	 */
	public String getCurrent_time() {
		return current_time;
	}
	/**
	 * @param current_time the current_time to set
	 */
	public void setCurrent_time(String current_time) {
		this.current_time = current_time;
	}
	/**
	 * @return the energy_this_year
	 */
	public double getEnergy_this_year() {
		return energy_this_year;
	}
	/**
	 * @param energy_this_year the energy_this_year to set
	 */
	public void setEnergy_this_year(double energy_this_year) {
		this.energy_this_year = energy_this_year;
	}
	/**
	 * @return the energy_this_month
	 */
	public double getEnergy_this_month() {
		return energy_this_month;
	}
	/**
	 * @param energy_this_month the energy_this_month to set
	 */
	public void setEnergy_this_month(double energy_this_month) {
		this.energy_this_month = energy_this_month;
	}
	/**
	 * @return the energy_today
	 */
	public double getEnergy_today() {
		return energy_today;
	}
	/**
	 * @param energy_today the energy_today to set
	 */
	public void setEnergy_today(double energy_today) {
		this.energy_today = energy_today;
	}
	/**
	 * @return the ac_power
	 */
	public double getAc_power() {
		return ac_power;
	}
	/**
	 * @param ac_power the ac_power to set
	 */
	public void setAc_power(double ac_power) {
		this.ac_power = ac_power;
	}
	/**
	 * @return the energy_lifetime
	 */
	public double getEnergy_lifetime() {
		return energy_lifetime;
	}
	/**
	 * @param energy_lifetime the energy_lifetime to set
	 */
	public void setEnergy_lifetime(double energy_lifetime) {
		this.energy_lifetime = energy_lifetime;
	}
	/**
	 * @return the filterBy
	 */
	public String getFilterBy() {
		return filterBy;
	}
	/**
	 * @param filterBy the filterBy to set
	 */
	public void setFilterBy(String filterBy) {
		this.filterBy = filterBy;
	}
	/**
	 * @return the start_date
	 */
	public String getStart_date() {
		return start_date;
	}
	/**
	 * @param start_date the start_date to set
	 */
	public void setStart_date(String start_date) {
		this.start_date = start_date;
	}
	/**
	 * @return the end_date
	 */
	public String getEnd_date() {
		return end_date;
	}
	/**
	 * @param end_date the end_date to set
	 */
	public void setEnd_date(String end_date) {
		this.end_date = end_date;
	}
	/**
	 * @return the device_type
	 */
	public int getDevice_type() {
		return device_type;
	}
	/**
	 * @param device_type the device_type to set
	 */
	public void setDevice_type(int device_type) {
		this.device_type = device_type;
	}
	/**
	 * @return the id_site
	 */
	public int getId_site() {
		return id_site;
	}
	/**
	 * @param id_site the id_site to set
	 */
	public void setId_site(int id_site) {
		this.id_site = id_site;
	}
	/**
	 * @return the id_device
	 */
	public int getId_device() {
		return id_device;
	}
	/**
	 * @param id_device the id_device to set
	 */
	public void setId_device(int id_device) {
		this.id_device = id_device;
	}
	/**
	 * @return the localization_format
	 */
	public String getLocalization_format() {
		return localization_format;
	}
	/**
	 * @param localization_format the localization_format to set
	 */
	public void setLocalization_format(String localization_format) {
		this.localization_format = localization_format;
	}
	/**
	 * @return the format_sql_short
	 */
	public String getFormat_sql_short() {
		return format_sql_short;
	}
	/**
	 * @param format_sql_short the format_sql_short to set
	 */
	public void setFormat_sql_short(String format_sql_short) {
		this.format_sql_short = format_sql_short;
	}
	/**
	 * @return the format_sql_long
	 */
	public String getFormat_sql_long() {
		return format_sql_long;
	}
	/**
	 * @param format_sql_long the format_sql_long to set
	 */
	public void setFormat_sql_long(String format_sql_long) {
		this.format_sql_long = format_sql_long;
	}
	/**
	 * @return the format_sql_string_short
	 */
	public String getFormat_sql_string_short() {
		return format_sql_string_short;
	}
	/**
	 * @param format_sql_string_short the format_sql_string_short to set
	 */
	public void setFormat_sql_string_short(String format_sql_string_short) {
		this.format_sql_string_short = format_sql_string_short;
	}
	/**
	 * @return the format_sql_string_long
	 */
	public String getFormat_sql_string_long() {
		return format_sql_string_long;
	}
	/**
	 * @param format_sql_string_long the format_sql_string_long to set
	 */
	public void setFormat_sql_string_long(String format_sql_string_long) {
		this.format_sql_string_long = format_sql_string_long;
	}
	/**
	 * @return the format_sql_string_mdy
	 */
	public String getFormat_sql_string_mdy() {
		return format_sql_string_mdy;
	}
	/**
	 * @param format_sql_string_mdy the format_sql_string_mdy to set
	 */
	public void setFormat_sql_string_mdy(String format_sql_string_mdy) {
		this.format_sql_string_mdy = format_sql_string_mdy;
	}
	/**
	 * @return the offset_from
	 */
	public String getOffset_from() {
		return offset_from;
	}
	/**
	 * @param offset_from the offset_from to set
	 */
	public void setOffset_from(String offset_from) {
		this.offset_from = offset_from;
	}
	/**
	 * @return the typeView
	 */
	public String getTypeView() {
		return typeView;
	}
	/**
	 * @param typeView the typeView to set
	 */
	public void setTypeView(String typeView) {
		this.typeView = typeView;
	}
	/**
	 * @return the keyword
	 */
	public String getKeyword() {
		return keyword;
	}
	/**
	 * @param keyword the keyword to set
	 */
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
	/**
	 * @return the sort_column
	 */
	public String getSort_column() {
		return sort_column;
	}
	/**
	 * @param sort_column the sort_column to set
	 */
	public void setSort_column(String sort_column) {
		this.sort_column = sort_column;
	}
	/**
	 * @return the screen_mode
	 */
	public int getScreen_mode() {
		return screen_mode;
	}
	/**
	 * @param screen_mode the screen_mode to set
	 */
	public void setScreen_mode(int screen_mode) {
		this.screen_mode = screen_mode;
	}
	/**
	 * @return the is_manage
	 */
	public int getIs_manage() {
		return is_manage;
	}
	/**
	 * @param is_manage the is_manage to set
	 */
	public void setIs_manage(int is_manage) {
		this.is_manage = is_manage;
	}
	/**
	 * @return the id_employee
	 */
	public int getId_employee() {
		return id_employee;
	}
	/**
	 * @param id_employee the id_employee to set
	 */
	public void setId_employee(int id_employee) {
		this.id_employee = id_employee;
	}
	/**
	 * @return the id_sites
	 */
	public List getId_sites() {
		return id_sites;
	}
	/**
	 * @param id_sites the id_sites to set
	 */
	public void setId_sites(List id_sites) {
		this.id_sites = id_sites;
	}
	
	
	
	
	
	
	
	
	
	

	
	
	
}
