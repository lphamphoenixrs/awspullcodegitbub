/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
package com.phoenixrs.api.services;

import java.util.ArrayList;
import java.util.List;

import com.phoenixrs.api.entities.AlertEntity;
import com.phoenixrs.api.entities.BatchJobTableEntity;
import com.phoenixrs.api.entities.DeviceEntity;

import com.phoenixrs.api.DBManagers.DB;

public class BatchJobService extends DB {
	
	/**
	 * @description get list device
	 * @author long.pham
	 * @since 2021-02-17
	 */
	
	public List getListDevice(DeviceEntity obj) {
		List dataList = new ArrayList();
		try {
			dataList = queryForList("BatchJob.getListDevice", obj);
			if (dataList == null)
				return new ArrayList();
		} catch (Exception ex) {
			return new ArrayList();
		}
		return dataList;
	}
	
	/**
	 * @description get last row "data table name" by device
	 * @author long.pham
	 * @since 2021-02-17
	 * @param datatablename
	 */

	public BatchJobTableEntity getLastRowItem(String datatablename) {
		BatchJobTableEntity rowItem = new BatchJobTableEntity();
		try {
			rowItem = (BatchJobTableEntity) queryForObject("BatchJob.getLastRowItem", datatablename);
			if (rowItem == null)
				return new BatchJobTableEntity();
		} catch (Exception ex) {
			log.error("BatchJob.getLastRowItem", ex);
			return new BatchJobTableEntity();
		}
		return rowItem;
	}
	
	
	/**
	 * @description get alert Exists
	 * @author long.pham
	 * @since 2021-02-18
	 * @param error_code, time
	 */
	public boolean checkAlertExist(AlertEntity dataE) {
		try {
			return (int) queryForObject("BatchJob.checkAlertlExist", dataE) > 0;
		}catch (Exception e) {
			
		}
		return true;
	}
	
	/**
	 * @description insert alert
	 * @author long.pham
	 * @since 2021-02-18
	 * @param {}
	 */
	public AlertEntity insertAlert(AlertEntity obj) 
	{
		try
	    {
	       Object insertId = insert("BatchJob.insertAlert", obj);
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
