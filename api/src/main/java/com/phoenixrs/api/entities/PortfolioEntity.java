/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
package com.phoenixrs.api.entities;
import java.util.Date;
import java.util.List;

public class PortfolioEntity {
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
	private String sort_column;
	private double irradiance_now;
	private String offset_timezone;
	private String current_time;
	private String gallery;
	private String localization_format;
	private String format_sql_short;
	private String format_sql_long;
	private String format_sql_string_short;
	private String format_sql_string_long;
	private String format_sql_string_mdy;
	private String offset_from;
	private int id_site_type;
	private String keyword;
	private int screen_mode;
	private List id_sites;
	private double energy_now;
	private String weather_icon;
	private String weather_description;
	private List alerts;
	private String icon_alert;
	private String id_error_alert;
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
	 * @return the built_since
	 */
	public String getBuilt_since() {
		return built_since;
	}
	/**
	 * @param built_since the built_since to set
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
	 * @return the irradiance_now
	 */
	public double getIrradiance_now() {
		return irradiance_now;
	}
	/**
	 * @param irradiance_now the irradiance_now to set
	 */
	public void setIrradiance_now(double irradiance_now) {
		this.irradiance_now = irradiance_now;
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
	/**
	 * @return the energy_now
	 */
	public double getEnergy_now() {
		return energy_now;
	}
	/**
	 * @param energy_now the energy_now to set
	 */
	public void setEnergy_now(double energy_now) {
		this.energy_now = energy_now;
	}
	/**
	 * @return the weather_icon
	 */
	public String getWeather_icon() {
		return weather_icon;
	}
	/**
	 * @param weather_icon the weather_icon to set
	 */
	public void setWeather_icon(String weather_icon) {
		this.weather_icon = weather_icon;
	}
	/**
	 * @return the weather_description
	 */
	public String getWeather_description() {
		return weather_description;
	}
	/**
	 * @param weather_description the weather_description to set
	 */
	public void setWeather_description(String weather_description) {
		this.weather_description = weather_description;
	}
	/**
	 * @return the alerts
	 */
	public List getAlerts() {
		return alerts;
	}
	/**
	 * @param alerts the alerts to set
	 */
	public void setAlerts(List alerts) {
		this.alerts = alerts;
	}
	/**
	 * @return the icon_alert
	 */
	public String getIcon_alert() {
		return icon_alert;
	}
	/**
	 * @param icon_alert the icon_alert to set
	 */
	public void setIcon_alert(String icon_alert) {
		this.icon_alert = icon_alert;
	}
	/**
	 * @return the id_error_alert
	 */
	public String getId_error_alert() {
		return id_error_alert;
	}
	/**
	 * @param id_error_alert the id_error_alert to set
	 */
	public void setId_error_alert(String id_error_alert) {
		this.id_error_alert = id_error_alert;
	}
	
	
	
	
	
}
