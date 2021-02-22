/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
package com.phoenixrs.api.entities;

public class ModelIMTSolarClass8000Entity {
	private String time;
	private int id_device;
	private int error;
	private int low_alarm;
	private int high_alarm;
	private double irradiance;
	private double tcell;
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
	 * @return the low_alarm
	 */
	public int getLow_alarm() {
		return low_alarm;
	}
	/**
	 * @param low_alarm the low_alarm to set
	 */
	public void setLow_alarm(int low_alarm) {
		this.low_alarm = low_alarm;
	}
	/**
	 * @return the high_alarm
	 */
	public int getHigh_alarm() {
		return high_alarm;
	}
	/**
	 * @param high_alarm the high_alarm to set
	 */
	public void setHigh_alarm(int high_alarm) {
		this.high_alarm = high_alarm;
	}
	/**
	 * @return the irradiance
	 */
	public double getIrradiance() {
		return irradiance;
	}
	/**
	 * @param irradiance the irradiance to set
	 */
	public void setIrradiance(double irradiance) {
		this.irradiance = irradiance;
	}
	/**
	 * @return the tcell
	 */
	public double getTcell() {
		return tcell;
	}
	/**
	 * @param tcell the tcell to set
	 */
	public void setTcell(double tcell) {
		this.tcell = tcell;
	}
	
	
	
}
