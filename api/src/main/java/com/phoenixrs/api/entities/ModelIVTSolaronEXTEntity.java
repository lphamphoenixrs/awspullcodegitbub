/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
package com.phoenixrs.api.entities;

public class ModelIVTSolaronEXTEntity {
	private String time;
	private int id_device;
	private int error;
	private int low_alarm;
	private int high_alarm;
	private double today_kwh;
	private double ytd_kwh_total;
	private double life_kwh_total;
	private double ytd_kwh;
	private double life_kwh;
	private double last_15min_kwh;
	private double timestamp_15minutes;
	private double last_restart;
	private double uptime;
	private double ac_power;
	private float ac_frequency;
	private float pv_voltage;
	private float pv_current;
	private float common_mode;
	private float ambient_temperature;
	private float coolant_temperature;
	private float reactor_temperature;
	private float cabinet_temperature;
	private float bus_voltage;
	private float ground_current;
	private float reactive_power;
	private float active_faults1;
	private float active_faults2;
	private float active_faults3;
	private float status;
	private float warnings1;
	private float warnings2_reserved;
	private float warnings3_reserved;
	private float limits;
	private float year;
	private float month;
	private float day;
	private float hour;
	private float minutes;
	private float seconds;
	private double current_time;
	private double ac_current;
	private float requset_set_ac_power_limit;
	private float request_set_instantaneous_reactive_power_set_point;
	private float autostart_status;
	private float set_read_reactive_power_mode;
	private float set_read_p_ac_limit;
	private float set_read_instantaneous_reactive_power_set_point;
	private float set_read_power_factor_set_point;
	private float ac_power_ramp_rate;
	private float reactive_power_ramp_rate;
	private float power_factor_ramp_rate;
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
	 * @return the ytd_kwh_total
	 */
	public double getYtd_kwh_total() {
		return ytd_kwh_total;
	}
	/**
	 * @param ytd_kwh_total the ytd_kwh_total to set
	 */
	public void setYtd_kwh_total(double ytd_kwh_total) {
		this.ytd_kwh_total = ytd_kwh_total;
	}
	/**
	 * @return the life_kwh_total
	 */
	public double getLife_kwh_total() {
		return life_kwh_total;
	}
	/**
	 * @param life_kwh_total the life_kwh_total to set
	 */
	public void setLife_kwh_total(double life_kwh_total) {
		this.life_kwh_total = life_kwh_total;
	}
	/**
	 * @return the ytd_kwh
	 */
	public double getYtd_kwh() {
		return ytd_kwh;
	}
	/**
	 * @param ytd_kwh the ytd_kwh to set
	 */
	public void setYtd_kwh(double ytd_kwh) {
		this.ytd_kwh = ytd_kwh;
	}
	/**
	 * @return the life_kwh
	 */
	public double getLife_kwh() {
		return life_kwh;
	}
	/**
	 * @param life_kwh the life_kwh to set
	 */
	public void setLife_kwh(double life_kwh) {
		this.life_kwh = life_kwh;
	}
	/**
	 * @return the last_15min_kwh
	 */
	public double getLast_15min_kwh() {
		return last_15min_kwh;
	}
	/**
	 * @param last_15min_kwh the last_15min_kwh to set
	 */
	public void setLast_15min_kwh(double last_15min_kwh) {
		this.last_15min_kwh = last_15min_kwh;
	}
	/**
	 * @return the timestamp_15minutes
	 */
	public double getTimestamp_15minutes() {
		return timestamp_15minutes;
	}
	/**
	 * @param timestamp_15minutes the timestamp_15minutes to set
	 */
	public void setTimestamp_15minutes(double timestamp_15minutes) {
		this.timestamp_15minutes = timestamp_15minutes;
	}
	/**
	 * @return the last_restart
	 */
	public double getLast_restart() {
		return last_restart;
	}
	/**
	 * @param last_restart the last_restart to set
	 */
	public void setLast_restart(double last_restart) {
		this.last_restart = last_restart;
	}
	/**
	 * @return the uptime
	 */
	public double getUptime() {
		return uptime;
	}
	/**
	 * @param uptime the uptime to set
	 */
	public void setUptime(double uptime) {
		this.uptime = uptime;
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
	 * @return the ac_frequency
	 */
	public float getAc_frequency() {
		return ac_frequency;
	}
	/**
	 * @param ac_frequency the ac_frequency to set
	 */
	public void setAc_frequency(float ac_frequency) {
		this.ac_frequency = ac_frequency;
	}
	/**
	 * @return the pv_voltage
	 */
	public float getPv_voltage() {
		return pv_voltage;
	}
	/**
	 * @param pv_voltage the pv_voltage to set
	 */
	public void setPv_voltage(float pv_voltage) {
		this.pv_voltage = pv_voltage;
	}
	/**
	 * @return the pv_current
	 */
	public float getPv_current() {
		return pv_current;
	}
	/**
	 * @param pv_current the pv_current to set
	 */
	public void setPv_current(float pv_current) {
		this.pv_current = pv_current;
	}
	/**
	 * @return the common_mode
	 */
	public float getCommon_mode() {
		return common_mode;
	}
	/**
	 * @param common_mode the common_mode to set
	 */
	public void setCommon_mode(float common_mode) {
		this.common_mode = common_mode;
	}
	/**
	 * @return the ambient_temperature
	 */
	public float getAmbient_temperature() {
		return ambient_temperature;
	}
	/**
	 * @param ambient_temperature the ambient_temperature to set
	 */
	public void setAmbient_temperature(float ambient_temperature) {
		this.ambient_temperature = ambient_temperature;
	}
	/**
	 * @return the coolant_temperature
	 */
	public float getCoolant_temperature() {
		return coolant_temperature;
	}
	/**
	 * @param coolant_temperature the coolant_temperature to set
	 */
	public void setCoolant_temperature(float coolant_temperature) {
		this.coolant_temperature = coolant_temperature;
	}
	/**
	 * @return the reactor_temperature
	 */
	public float getReactor_temperature() {
		return reactor_temperature;
	}
	/**
	 * @param reactor_temperature the reactor_temperature to set
	 */
	public void setReactor_temperature(float reactor_temperature) {
		this.reactor_temperature = reactor_temperature;
	}
	/**
	 * @return the cabinet_temperature
	 */
	public float getCabinet_temperature() {
		return cabinet_temperature;
	}
	/**
	 * @param cabinet_temperature the cabinet_temperature to set
	 */
	public void setCabinet_temperature(float cabinet_temperature) {
		this.cabinet_temperature = cabinet_temperature;
	}
	/**
	 * @return the bus_voltage
	 */
	public float getBus_voltage() {
		return bus_voltage;
	}
	/**
	 * @param bus_voltage the bus_voltage to set
	 */
	public void setBus_voltage(float bus_voltage) {
		this.bus_voltage = bus_voltage;
	}
	/**
	 * @return the ground_current
	 */
	public float getGround_current() {
		return ground_current;
	}
	/**
	 * @param ground_current the ground_current to set
	 */
	public void setGround_current(float ground_current) {
		this.ground_current = ground_current;
	}
	/**
	 * @return the reactive_power
	 */
	public float getReactive_power() {
		return reactive_power;
	}
	/**
	 * @param reactive_power the reactive_power to set
	 */
	public void setReactive_power(float reactive_power) {
		this.reactive_power = reactive_power;
	}
	/**
	 * @return the active_faults1
	 */
	public float getActive_faults1() {
		return active_faults1;
	}
	/**
	 * @param active_faults1 the active_faults1 to set
	 */
	public void setActive_faults1(float active_faults1) {
		this.active_faults1 = active_faults1;
	}
	/**
	 * @return the active_faults2
	 */
	public float getActive_faults2() {
		return active_faults2;
	}
	/**
	 * @param active_faults2 the active_faults2 to set
	 */
	public void setActive_faults2(float active_faults2) {
		this.active_faults2 = active_faults2;
	}
	/**
	 * @return the active_faults3
	 */
	public float getActive_faults3() {
		return active_faults3;
	}
	/**
	 * @param active_faults3 the active_faults3 to set
	 */
	public void setActive_faults3(float active_faults3) {
		this.active_faults3 = active_faults3;
	}
	/**
	 * @return the status
	 */
	public float getStatus() {
		return status;
	}
	/**
	 * @param status the status to set
	 */
	public void setStatus(float status) {
		this.status = status;
	}
	/**
	 * @return the warnings1
	 */
	public float getWarnings1() {
		return warnings1;
	}
	/**
	 * @param warnings1 the warnings1 to set
	 */
	public void setWarnings1(float warnings1) {
		this.warnings1 = warnings1;
	}
	/**
	 * @return the warnings2_reserved
	 */
	public float getWarnings2_reserved() {
		return warnings2_reserved;
	}
	/**
	 * @param warnings2_reserved the warnings2_reserved to set
	 */
	public void setWarnings2_reserved(float warnings2_reserved) {
		this.warnings2_reserved = warnings2_reserved;
	}
	/**
	 * @return the warnings3_reserved
	 */
	public float getWarnings3_reserved() {
		return warnings3_reserved;
	}
	/**
	 * @param warnings3_reserved the warnings3_reserved to set
	 */
	public void setWarnings3_reserved(float warnings3_reserved) {
		this.warnings3_reserved = warnings3_reserved;
	}
	/**
	 * @return the limits
	 */
	public float getLimits() {
		return limits;
	}
	/**
	 * @param limits the limits to set
	 */
	public void setLimits(float limits) {
		this.limits = limits;
	}
	/**
	 * @return the year
	 */
	public float getYear() {
		return year;
	}
	/**
	 * @param year the year to set
	 */
	public void setYear(float year) {
		this.year = year;
	}
	/**
	 * @return the month
	 */
	public float getMonth() {
		return month;
	}
	/**
	 * @param month the month to set
	 */
	public void setMonth(float month) {
		this.month = month;
	}
	/**
	 * @return the day
	 */
	public float getDay() {
		return day;
	}
	/**
	 * @param day the day to set
	 */
	public void setDay(float day) {
		this.day = day;
	}
	/**
	 * @return the hour
	 */
	public float getHour() {
		return hour;
	}
	/**
	 * @param hour the hour to set
	 */
	public void setHour(float hour) {
		this.hour = hour;
	}
	/**
	 * @return the minutes
	 */
	public float getMinutes() {
		return minutes;
	}
	/**
	 * @param minutes the minutes to set
	 */
	public void setMinutes(float minutes) {
		this.minutes = minutes;
	}
	/**
	 * @return the seconds
	 */
	public float getSeconds() {
		return seconds;
	}
	/**
	 * @param seconds the seconds to set
	 */
	public void setSeconds(float seconds) {
		this.seconds = seconds;
	}
	/**
	 * @return the current_time
	 */
	public double getCurrent_time() {
		return current_time;
	}
	/**
	 * @param current_time the current_time to set
	 */
	public void setCurrent_time(double current_time) {
		this.current_time = current_time;
	}
	/**
	 * @return the ac_current
	 */
	public double getAc_current() {
		return ac_current;
	}
	/**
	 * @param ac_current the ac_current to set
	 */
	public void setAc_current(double ac_current) {
		this.ac_current = ac_current;
	}
	/**
	 * @return the requset_set_ac_power_limit
	 */
	public float getRequset_set_ac_power_limit() {
		return requset_set_ac_power_limit;
	}
	/**
	 * @param requset_set_ac_power_limit the requset_set_ac_power_limit to set
	 */
	public void setRequset_set_ac_power_limit(float requset_set_ac_power_limit) {
		this.requset_set_ac_power_limit = requset_set_ac_power_limit;
	}
	/**
	 * @return the request_set_instantaneous_reactive_power_set_point
	 */
	public float getRequest_set_instantaneous_reactive_power_set_point() {
		return request_set_instantaneous_reactive_power_set_point;
	}
	/**
	 * @param request_set_instantaneous_reactive_power_set_point the request_set_instantaneous_reactive_power_set_point to set
	 */
	public void setRequest_set_instantaneous_reactive_power_set_point(
			float request_set_instantaneous_reactive_power_set_point) {
		this.request_set_instantaneous_reactive_power_set_point = request_set_instantaneous_reactive_power_set_point;
	}
	/**
	 * @return the autostart_status
	 */
	public float getAutostart_status() {
		return autostart_status;
	}
	/**
	 * @param autostart_status the autostart_status to set
	 */
	public void setAutostart_status(float autostart_status) {
		this.autostart_status = autostart_status;
	}
	/**
	 * @return the set_read_reactive_power_mode
	 */
	public float getSet_read_reactive_power_mode() {
		return set_read_reactive_power_mode;
	}
	/**
	 * @param set_read_reactive_power_mode the set_read_reactive_power_mode to set
	 */
	public void setSet_read_reactive_power_mode(float set_read_reactive_power_mode) {
		this.set_read_reactive_power_mode = set_read_reactive_power_mode;
	}
	/**
	 * @return the set_read_p_ac_limit
	 */
	public float getSet_read_p_ac_limit() {
		return set_read_p_ac_limit;
	}
	/**
	 * @param set_read_p_ac_limit the set_read_p_ac_limit to set
	 */
	public void setSet_read_p_ac_limit(float set_read_p_ac_limit) {
		this.set_read_p_ac_limit = set_read_p_ac_limit;
	}
	/**
	 * @return the set_read_instantaneous_reactive_power_set_point
	 */
	public float getSet_read_instantaneous_reactive_power_set_point() {
		return set_read_instantaneous_reactive_power_set_point;
	}
	/**
	 * @param set_read_instantaneous_reactive_power_set_point the set_read_instantaneous_reactive_power_set_point to set
	 */
	public void setSet_read_instantaneous_reactive_power_set_point(float set_read_instantaneous_reactive_power_set_point) {
		this.set_read_instantaneous_reactive_power_set_point = set_read_instantaneous_reactive_power_set_point;
	}
	/**
	 * @return the set_read_power_factor_set_point
	 */
	public float getSet_read_power_factor_set_point() {
		return set_read_power_factor_set_point;
	}
	/**
	 * @param set_read_power_factor_set_point the set_read_power_factor_set_point to set
	 */
	public void setSet_read_power_factor_set_point(float set_read_power_factor_set_point) {
		this.set_read_power_factor_set_point = set_read_power_factor_set_point;
	}
	/**
	 * @return the ac_power_ramp_rate
	 */
	public float getAc_power_ramp_rate() {
		return ac_power_ramp_rate;
	}
	/**
	 * @param ac_power_ramp_rate the ac_power_ramp_rate to set
	 */
	public void setAc_power_ramp_rate(float ac_power_ramp_rate) {
		this.ac_power_ramp_rate = ac_power_ramp_rate;
	}
	/**
	 * @return the reactive_power_ramp_rate
	 */
	public float getReactive_power_ramp_rate() {
		return reactive_power_ramp_rate;
	}
	/**
	 * @param reactive_power_ramp_rate the reactive_power_ramp_rate to set
	 */
	public void setReactive_power_ramp_rate(float reactive_power_ramp_rate) {
		this.reactive_power_ramp_rate = reactive_power_ramp_rate;
	}
	/**
	 * @return the power_factor_ramp_rate
	 */
	public float getPower_factor_ramp_rate() {
		return power_factor_ramp_rate;
	}
	/**
	 * @param power_factor_ramp_rate the power_factor_ramp_rate to set
	 */
	public void setPower_factor_ramp_rate(float power_factor_ramp_rate) {
		this.power_factor_ramp_rate = power_factor_ramp_rate;
	}
	
	
	
}
