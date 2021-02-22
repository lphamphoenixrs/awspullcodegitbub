/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
package com.phoenixrs.api.entities;

public class ModelPVPInverterEntity {
	private String time;
	private int id_device;
	private int error;
	private int low_alarm;
	private int high_alarm;
	private double total_kwh_delivered;
	private float volts_a_l_n;
	private float volts_b_l_n;
	private float volts_c_l_n;
	private float current_a;
	private float current_b;
	private float current_c;
	private float dc_output_voltage;
	private float dc_output_current;
	private float line_frenquency;
	private float line_kw;
	private String inverter_operating_status;
	private float inverter_fault_word0;
	private float inverter_fault_word1;
	private float inverter_fault_word2;
	private String data_comm_status;
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
	 * @return the total_kwh_delivered
	 */
	public double getTotal_kwh_delivered() {
		return total_kwh_delivered;
	}
	/**
	 * @param total_kwh_delivered the total_kwh_delivered to set
	 */
	public void setTotal_kwh_delivered(double total_kwh_delivered) {
		this.total_kwh_delivered = total_kwh_delivered;
	}
	/**
	 * @return the volts_a_l_n
	 */
	public float getVolts_a_l_n() {
		return volts_a_l_n;
	}
	/**
	 * @param volts_a_l_n the volts_a_l_n to set
	 */
	public void setVolts_a_l_n(float volts_a_l_n) {
		this.volts_a_l_n = volts_a_l_n;
	}
	/**
	 * @return the volts_b_l_n
	 */
	public float getVolts_b_l_n() {
		return volts_b_l_n;
	}
	/**
	 * @param volts_b_l_n the volts_b_l_n to set
	 */
	public void setVolts_b_l_n(float volts_b_l_n) {
		this.volts_b_l_n = volts_b_l_n;
	}
	/**
	 * @return the volts_c_l_n
	 */
	public float getVolts_c_l_n() {
		return volts_c_l_n;
	}
	/**
	 * @param volts_c_l_n the volts_c_l_n to set
	 */
	public void setVolts_c_l_n(float volts_c_l_n) {
		this.volts_c_l_n = volts_c_l_n;
	}
	/**
	 * @return the current_a
	 */
	public float getCurrent_a() {
		return current_a;
	}
	/**
	 * @param current_a the current_a to set
	 */
	public void setCurrent_a(float current_a) {
		this.current_a = current_a;
	}
	/**
	 * @return the current_b
	 */
	public float getCurrent_b() {
		return current_b;
	}
	/**
	 * @param current_b the current_b to set
	 */
	public void setCurrent_b(float current_b) {
		this.current_b = current_b;
	}
	/**
	 * @return the current_c
	 */
	public float getCurrent_c() {
		return current_c;
	}
	/**
	 * @param current_c the current_c to set
	 */
	public void setCurrent_c(float current_c) {
		this.current_c = current_c;
	}
	/**
	 * @return the dc_output_voltage
	 */
	public float getDc_output_voltage() {
		return dc_output_voltage;
	}
	/**
	 * @param dc_output_voltage the dc_output_voltage to set
	 */
	public void setDc_output_voltage(float dc_output_voltage) {
		this.dc_output_voltage = dc_output_voltage;
	}
	/**
	 * @return the dc_output_current
	 */
	public float getDc_output_current() {
		return dc_output_current;
	}
	/**
	 * @param dc_output_current the dc_output_current to set
	 */
	public void setDc_output_current(float dc_output_current) {
		this.dc_output_current = dc_output_current;
	}
	/**
	 * @return the line_frenquency
	 */
	public float getLine_frenquency() {
		return line_frenquency;
	}
	/**
	 * @param line_frenquency the line_frenquency to set
	 */
	public void setLine_frenquency(float line_frenquency) {
		this.line_frenquency = line_frenquency;
	}
	/**
	 * @return the line_kw
	 */
	public float getLine_kw() {
		return line_kw;
	}
	/**
	 * @param line_kw the line_kw to set
	 */
	public void setLine_kw(float line_kw) {
		this.line_kw = line_kw;
	}
	/**
	 * @return the inverter_operating_status
	 */
	public String getInverter_operating_status() {
		return inverter_operating_status;
	}
	/**
	 * @param inverter_operating_status the inverter_operating_status to set
	 */
	public void setInverter_operating_status(String inverter_operating_status) {
		this.inverter_operating_status = inverter_operating_status;
	}
	/**
	 * @return the inverter_fault_word0
	 */
	public float getInverter_fault_word0() {
		return inverter_fault_word0;
	}
	/**
	 * @param inverter_fault_word0 the inverter_fault_word0 to set
	 */
	public void setInverter_fault_word0(float inverter_fault_word0) {
		this.inverter_fault_word0 = inverter_fault_word0;
	}
	/**
	 * @return the inverter_fault_word1
	 */
	public float getInverter_fault_word1() {
		return inverter_fault_word1;
	}
	/**
	 * @param inverter_fault_word1 the inverter_fault_word1 to set
	 */
	public void setInverter_fault_word1(float inverter_fault_word1) {
		this.inverter_fault_word1 = inverter_fault_word1;
	}
	/**
	 * @return the inverter_fault_word2
	 */
	public float getInverter_fault_word2() {
		return inverter_fault_word2;
	}
	/**
	 * @param inverter_fault_word2 the inverter_fault_word2 to set
	 */
	public void setInverter_fault_word2(float inverter_fault_word2) {
		this.inverter_fault_word2 = inverter_fault_word2;
	}
	/**
	 * @return the data_comm_status
	 */
	public String getData_comm_status() {
		return data_comm_status;
	}
	/**
	 * @param data_comm_status the data_comm_status to set
	 */
	public void setData_comm_status(String data_comm_status) {
		this.data_comm_status = data_comm_status;
	}
	
	
	
}
