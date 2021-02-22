/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
package com.phoenixrs.api.entities;

import java.util.Date;

public class DeviceEntity {
	private int id;
	private int id_site;
	private int id_vendor;
	private String serial_number;
	private int modbusdevicenumber;
	private String devicename;
	private String devicetype;
	private int deviceclass;
	private String configuration;
	private String configurationchangetime;
	private String configurationchecksum;
	private String datatablename;
	private int id_device_type;
	private int id_device_group;
	private int id_customer;
	private int active;
	private int limit;
	private int offset;
	private int totalRecord;
	private String order_by;
	private String sort_by;
	private String keyword;
	private Date created_date;
	private String created_by;
	private Date updated_date;
	private String updated_by;
	private String sort_column;
	private int status;
	private int is_delete;
	private int screen_mode;
	private String code_prefix;
	
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
	 * @return the id_vendor
	 */
	public int getId_vendor() {
		return id_vendor;
	}
	/**
	 * @param id_vendor the id_vendor to set
	 */
	public void setId_vendor(int id_vendor) {
		this.id_vendor = id_vendor;
	}
	/**
	 * @return the serial_number
	 */
	public String getSerial_number() {
		return serial_number;
	}
	/**
	 * @param serial_number the serial_number to set
	 */
	public void setSerial_number(String serial_number) {
		this.serial_number = serial_number;
	}
	/**
	 * @return the modbusdevicenumber
	 */
	public int getModbusdevicenumber() {
		return modbusdevicenumber;
	}
	/**
	 * @param modbusdevicenumber the modbusdevicenumber to set
	 */
	public void setModbusdevicenumber(int modbusdevicenumber) {
		this.modbusdevicenumber = modbusdevicenumber;
	}
	/**
	 * @return the devicename
	 */
	public String getDevicename() {
		return devicename;
	}
	/**
	 * @param devicename the devicename to set
	 */
	public void setDevicename(String devicename) {
		this.devicename = devicename;
	}
	/**
	 * @return the devicetype
	 */
	public String getDevicetype() {
		return devicetype;
	}
	/**
	 * @param devicetype the devicetype to set
	 */
	public void setDevicetype(String devicetype) {
		this.devicetype = devicetype;
	}
	/**
	 * @return the deviceclass
	 */
	public int getDeviceclass() {
		return deviceclass;
	}
	/**
	 * @param deviceclass the deviceclass to set
	 */
	public void setDeviceclass(int deviceclass) {
		this.deviceclass = deviceclass;
	}
	/**
	 * @return the configuration
	 */
	public String getConfiguration() {
		return configuration;
	}
	/**
	 * @param configuration the configuration to set
	 */
	public void setConfiguration(String configuration) {
		this.configuration = configuration;
	}
	/**
	 * @return the configurationchangetime
	 */
	public String getConfigurationchangetime() {
		return configurationchangetime;
	}
	/**
	 * @param configurationchangetime the configurationchangetime to set
	 */
	public void setConfigurationchangetime(String configurationchangetime) {
		this.configurationchangetime = configurationchangetime;
	}
	/**
	 * @return the configurationchecksum
	 */
	public String getConfigurationchecksum() {
		return configurationchecksum;
	}
	/**
	 * @param configurationchecksum the configurationchecksum to set
	 */
	public void setConfigurationchecksum(String configurationchecksum) {
		this.configurationchecksum = configurationchecksum;
	}
	/**
	 * @return the datatablename
	 */
	public String getDatatablename() {
		return datatablename;
	}
	/**
	 * @param datatablename the datatablename to set
	 */
	public void setDatatablename(String datatablename) {
		this.datatablename = datatablename;
	}
	/**
	 * @return the id_device_type
	 */
	public int getId_device_type() {
		return id_device_type;
	}
	/**
	 * @param id_device_type the id_device_type to set
	 */
	public void setId_device_type(int id_device_type) {
		this.id_device_type = id_device_type;
	}
	/**
	 * @return the id_device_group
	 */
	public int getId_device_group() {
		return id_device_group;
	}
	/**
	 * @param id_device_group the id_device_group to set
	 */
	public void setId_device_group(int id_device_group) {
		this.id_device_group = id_device_group;
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
	 * @return the active
	 */
	public int getActive() {
		return active;
	}
	/**
	 * @param active the active to set
	 */
	public void setActive(int active) {
		this.active = active;
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
	 * @return the code_prefix
	 */
	public String getCode_prefix() {
		return code_prefix;
	}
	/**
	 * @param code_prefix the code_prefix to set
	 */
	public void setCode_prefix(String code_prefix) {
		this.code_prefix = code_prefix;
	}
	
	
	
	
}
