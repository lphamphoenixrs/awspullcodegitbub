/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
package com.phoenixrs.api.services;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import com.phoenixrs.api.DBManagers.DB;
import com.phoenixrs.api.entities.PortfolioEntity;
import com.phoenixrs.api.entities.WeatherEntity;

import com.phoenixrs.api.utils.Constants;

public class PortfolioService extends DB {

	/**
	 * @description get list portfolio by array(id_site)
	 * @author long.pham
	 * @since 2021-01-21
	 * @param arr id_site
	 */

	public List getList(PortfolioEntity obj) {
		List dataList, newData = new ArrayList();
		try {
			dataList = queryForList("Portfolio.getList", obj);
			if (dataList == null)
				return new ArrayList();

			for (int i = 0; i < dataList.size(); i++) {
				Map<String, Object> siteItem = (Map<String, Object>) dataList.get(i);
				// Get weather API
				double lat = (double) siteItem.get("lat");
				double lon = (double) siteItem.get("lng");
				WeatherEntity weather = fetchFromJSONNext(lat, lon);
				siteItem.put("weather_icon", weather.getWeather_icon());
				siteItem.put("weather_description", weather.getWeather_description());
				
				int id = (int) siteItem.get("id");
				int idSiteType = (int) siteItem.get("id_site_type");
				PortfolioEntity siteMapItem = this._buildSiteItem(id, obj.getOffset_timezone(), obj.getCurrent_time(),
						idSiteType);
				
				// Get energy now
				List listItem = new ArrayList();
				listItem = queryForList("Portfolio.getSiteEnergyNow", siteMapItem);
				double energyNow = 0;
				if (listItem != null && listItem.size() == 2) {
					Map<String, Object> item1 = (Map<String, Object>) listItem.get(0);
					Map<String, Object> item2 = (Map<String, Object>) listItem.get(1);
					double energy1 = (double) item1.get("energy_now");
					double energy2 = (double) item2.get("energy_now");
					energyNow = energy1 - energy2;
					siteItem.put("energy_now", energyNow);
				} else {
					siteItem.put("energy_now", 0);
				}
				
				// Get irradiance now
				List itemIrradiance = new ArrayList();
				itemIrradiance = queryForList("Portfolio.getSiteIrradianceNow", siteMapItem);
				if(itemIrradiance != null && itemIrradiance.size() > 0) {
					Map<String, Object> irrItem = (Map<String, Object>) itemIrradiance.get(0);
					double irradiance = (double) irrItem.get("irradiance_now");
					siteItem.put("irradiance", irradiance);
				} else {
					siteItem.put("irradiance", 0);
				}
				
				// Get list alert
				List listAlert = new ArrayList();
				listAlert = queryForList("Portfolio.getListAlertBySite", siteMapItem);
				siteItem.put("alerts", listAlert);
				
				if(listAlert != null && listAlert.size() > 0) {
					Map<String, Object> alertItem = (Map<String, Object>) listAlert.get(0);
					String iconAlert = (String) alertItem.get("icon_alert");
					siteItem.put("icon_alert", iconAlert);
				} else {
					siteItem.put("icon_alert", "");
					
				}
				
				newData.add(siteItem);
			}
		} catch (Exception ex) {
			return new ArrayList();
		}
		return newData;
	}


	/**
	 * build site item
	 * @param siteItem
	 * @return
	 */
	private PortfolioEntity _buildSiteItem(int siteId, String offsetTimeZone, String currentTime, int idSiteType) {
		try {
			PortfolioEntity siteItem = new PortfolioEntity();
			siteItem.setId(siteId);
			siteItem.setOffset_timezone(offsetTimeZone);
			siteItem.setCurrent_time(currentTime);
			siteItem.setId_site_type(idSiteType);
			return siteItem;
		} catch (Exception e) {
			return null;
		}
	}

	public static WeatherEntity fetchFromJSONNext(double lat, double lon)
			throws FileNotFoundException, IOException, org.json.simple.parser.ParseException {
		
		try {
			String inline = "";
			WeatherEntity item = new WeatherEntity();
			String APIURL = Constants.weatherAPIURL + "?lat=" + lat + "&lon=" + lon + "&appid="
					+ Constants.weatherAPIKEY + "&units=imperial&lang=en";
			URL url = new URL(APIURL);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.connect();
			int responsecode = conn.getResponseCode();
			if (responsecode == 200) {
				Scanner sc = new Scanner(url.openStream());
				while (sc.hasNext()) {
					inline += sc.nextLine();
				}
				sc.close();
				JSONParser parse = new JSONParser();
				JSONObject jobj = (JSONObject) parse.parse(inline);
				JSONArray jsonarr_1 = (JSONArray) jobj.get("weather");
				for (int k = 0; k < jsonarr_1.size(); k++) {
					JSONObject jsonobj_1 = (JSONObject)jsonarr_1.get(k);
					String  weatherIcon = (String )jsonobj_1.get("icon");
					String  weatherDescription = (String )jsonobj_1.get("description");
					item.setWeather_icon(weatherIcon);
					item.setWeather_description(weatherDescription);
				}
			}
			return item;
		} catch (Exception e) {
			return null;
		}
	}
}
