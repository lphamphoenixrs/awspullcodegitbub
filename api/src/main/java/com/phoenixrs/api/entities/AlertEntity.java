/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
package com.phoenixrs.api.entities;

import java.util.List;

public class AlertEntity {
	private int id;
	private int id_device;
	private String id_error;
	private String start_date;
	private String end_date;
	private String asset;
	private Double capacity;
	private int status;
	private String created_date;
	private String created_by;
	private String updated_date;
	private String updated_by;
	private int is_delete;
	private int id_customer;
	private int id_site;
	private int limit;
	private int offset;
	private int totalRecord;
	private int order_by;
	private String offset_timezone;
	private String sortOrder;
	private String sortColumn;
	private String localization_format;
	private String format_sql_short;
	private String format_sql_long;
	private String format_sql_string_short;
	private String format_sql_string_long;
	private String current_time;
	private List id_sites;
	private int priority;
	private int id_error_level;
	private List id_levels;
	private String site_name;
	private String date_from;
	private String date_to;
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
	 * @return the id_error
	 */
	public String getId_error() {
		return id_error;
	}
	/**
	 * @param id_error the id_error to set
	 */
	public void setId_error(String id_error) {
		this.id_error = id_error;
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
	 * @return the asset
	 */
	public String getAsset() {
		return asset;
	}
	/**
	 * @param asset the asset to set
	 */
	public void setAsset(String asset) {
		this.asset = asset;
	}
	/**
	 * @return the capacity
	 */
	public Double getCapacity() {
		return capacity;
	}
	/**
	 * @param capacity the capacity to set
	 */
	public void setCapacity(Double capacity) {
		this.capacity = capacity;
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
	 * @return the created_date
	 */
	public String getCreated_date() {
		return created_date;
	}
	/**
	 * @param created_date the created_date to set
	 */
	public void setCreated_date(String created_date) {
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
	public String getUpdated_date() {
		return updated_date;
	}
	/**
	 * @param updated_date the updated_date to set
	 */
	public void setUpdated_date(String updated_date) {
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
	public int getOrder_by() {
		return order_by;
	}
	/**
	 * @param order_by the order_by to set
	 */
	public void setOrder_by(int order_by) {
		this.order_by = order_by;
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
	 * @return the sortOrder
	 */
	public String getSortOrder() {
		return sortOrder;
	}
	/**
	 * @param sortOrder the sortOrder to set
	 */
	public void setSortOrder(String sortOrder) {
		this.sortOrder = sortOrder;
	}
	/**
	 * @return the sortColumn
	 */
	public String getSortColumn() {
		return sortColumn;
	}
	/**
	 * @param sortColumn the sortColumn to set
	 */
	public void setSortColumn(String sortColumn) {
		this.sortColumn = sortColumn;
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
	 * @return the priority
	 */
	public int getPriority() {
		return priority;
	}
	/**
	 * @param priority the priority to set
	 */
	public void setPriority(int priority) {
		this.priority = priority;
	}
	/**
	 * @return the id_error_level
	 */
	public int getId_error_level() {
		return id_error_level;
	}
	/**
	 * @param id_error_level the id_error_level to set
	 */
	public void setId_error_level(int id_error_level) {
		this.id_error_level = id_error_level;
	}
	/**
	 * @return the id_levels
	 */
	public List getId_levels() {
		return id_levels;
	}
	/**
	 * @param id_levels the id_levels to set
	 */
	public void setId_levels(List id_levels) {
		this.id_levels = id_levels;
	}
	/**
	 * @return the site_name
	 */
	public String getSite_name() {
		return site_name;
	}
	/**
	 * @param site_name the site_name to set
	 */
	public void setSite_name(String site_name) {
		this.site_name = site_name;
	}
	/**
	 * @return the date_from
	 */
	public String getDate_from() {
		return date_from;
	}
	/**
	 * @param date_from the date_from to set
	 */
	public void setDate_from(String date_from) {
		this.date_from = date_from;
	}
	/**
	 * @return the date_to
	 */
	public String getDate_to() {
		return date_to;
	}
	/**
	 * @param date_to the date_to to set
	 */
	public void setDate_to(String date_to) {
		this.date_to = date_to;
	}
	
	
	
	
}	
