/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
package com.phoenixrs.api.entities;


public class BatchJobTableEntity{
	
	private String time;
	private int id_device;
	private int error;
	private String datatablename;
	/**
	 * @return the time
	 */
	public String getTime() {
		return time;
	}
	/**
	 * @param time the time to set
	 */
	public void setTime(String time) {
		this.time = time;
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
	 * @return the error
	 */
	public int getError() {
		return error;
	}
	/**
	 * @param error the error to set
	 */
	public void setError(int error) {
		this.error = error;
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
	
	
}
