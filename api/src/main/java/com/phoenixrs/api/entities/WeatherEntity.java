/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
package com.phoenixrs.api.entities;

public class WeatherEntity {
	private String weather_icon;
	private String weather_description;
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
	
	
}
