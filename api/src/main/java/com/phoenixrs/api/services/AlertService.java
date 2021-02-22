/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
package com.phoenixrs.api.services;

import java.util.ArrayList;
import java.util.List;

import com.phoenixrs.api.DBManagers.DB;
import com.phoenixrs.api.entities.AlertEntity;

public class AlertService extends DB {
	/**
	 * @description get list alert by site
	 * @author long.pham
	 * @since 2020-11-16
	 * @param id_customer, id_site, start_date, end_date
	 */
	
	public List getList(AlertEntity obj) {
		try {
			List rs = queryForList("Alert.getList", obj);
			if(rs== null) {
				return new ArrayList<>();
			}
			return rs;
		} catch (Exception ex) {
			return null;
		}
	}
	
	
	
	/**
	 * @description get list site by id_sites
	 * @author long.pham
	 * @since 2021-02-02
	 * @param arr id_sites
	 */
	
	public List getListIdSites(AlertEntity obj) {
		try {
			List rs = queryForList("Alert.getListIdSites", obj);
			if(rs== null) {
				return new ArrayList<>();
			}
			return rs;
		} catch (Exception ex) {
			return null;
		}
	}
	
	/**
	 * @description count total alert by site
	 * @author long.pham
	 * @since 2020-11-16
	 * @param id_customer, id_site, start_date, end_date
	 */
	
	public int getListTotalCount (AlertEntity obj) {
		try {
			AlertEntity totalRecord = (AlertEntity) queryForObject("Alert.getTotal", obj);
			return totalRecord.getTotalRecord();
		} catch (Exception ex) {
			return 0;
		}
	}
	
	
	/**
	 * @description get detail alert
	 * @author long.pham
	 * @since 2020-11-24
	 * @param id_site, id_alert, id_customer, current_time
	 * @return Object
	 */

	public Object getDetailAlert(AlertEntity obj) {
		Object dataObj = null;
		try {
			dataObj = queryForObject("Alert.getDetailAlert", obj);
			if (dataObj == null)
				return new AlertEntity();
		} catch (Exception ex) {
			return new AlertEntity();
		}
		return dataObj;
	
	}
	
	/**
	 * @description get alert Exists
	 * @author long.pham
	 * @since 2021-01-29
	 * @param error_code, time
	 */
	public boolean checkAlertExist(AlertEntity dataE) {
		try {
			return (int) queryForObject("Alert.checkAlertlExist", dataE) > 0;
		}catch (Exception e) {
			
		}
		return true;
	}
	
	
	
	/**
	 * @description insert alert
	 * @author long.pham
	 * @since 2021-01-29
	 * @param id
	 */
	public AlertEntity insertAlert(AlertEntity obj) 
	{
		try
	    {
	       Object insertId = insert("Alert.insertAlert", obj);
	       if(insertId != null && insertId instanceof Integer) {
	    	   return obj;
	       }else {
	    	   return null;
	       }
	    }
	    catch(Exception ex)
	    {
	        log.error("Alert.insertAlert", ex);
	        return null;
	    }	
	}
	
}
