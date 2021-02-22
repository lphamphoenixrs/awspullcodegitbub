/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/

package com.phoenixrs.api.services;

import java.util.ArrayList;
import java.util.List;

import com.phoenixrs.api.DBManagers.DB;
import com.phoenixrs.api.entities.DeviceEntity;


public class DeviceService extends DB {

	/**
	 * @description get list site for page employee manage site
	 * @author long.pham
	 * @since 2021-01-12
	 */

	public List getListDeviceBySite(DeviceEntity obj) {
		List dataList = new ArrayList();
		try {
			dataList = queryForList("Device.getListDeviceBySite", obj);
			if (dataList == null)
				return new ArrayList();
		} catch (Exception ex) {
			return new ArrayList();
		}
		return dataList;
	}

	/**
	 * @description get total device by id_site
	 * @author long.pham
	 * @since 2021-01-12
	 */
	public int getDeviceBySiteTotalRecord(DeviceEntity obj) {
		try {
			return (int) queryForObject("Device.getDeviceBySiteTotalRecord", obj);
		} catch (Exception ex) {
			return 0;
		}
	}
	
	
	
	/**
	 * @description get device list by serial_number
	 * @author long.pham
	 * @since 2020-10-07
	 * @param serial_number
	 */
	
	public List getDeviceListBySerialNumber(DeviceEntity obj) {
		List dataList = new ArrayList();
		try {
			dataList = queryForList("Device.getListBySerialNumber", obj);
			if (dataList == null)
				return new ArrayList();
		} catch (Exception ex) {
			return new ArrayList();
		}
		return dataList;
	}
	
	
	/**
	 * @description get list device by id device type
	 * @author long.pham
	 * @since 2020-11-06
	 * @param id_site, id_customer, id_type_device
	 * @return array
	 */
	
	public List getListByDeviceType(DeviceEntity obj) {
		List dataList = new ArrayList();
		try {
			dataList = queryForList("Device.getListByDeviceType", obj);
			if (dataList == null)
				return new ArrayList();
		} catch (Exception ex) {
			return new ArrayList();
		}
		return dataList;
	}
	
	
	/**
	 * @description get list device by id device type
	 * @author long.pham
	 * @since 2020-11-12
	 * @param id_site, id_customer, id_type_device
	 * @return array
	 */
	
	public List getListDeviceByGroup(DeviceEntity obj) {
		List dataList = new ArrayList();
		try {
			dataList = queryForList("Device.getListDeviceByGroup", obj);
			if (dataList == null)
				return new ArrayList();
		} catch (Exception ex) {
			return new ArrayList();
		}
		return dataList;
	}
	
	/**
	 * @description update device status
	 * @author long.pham
	 * @since 2021-01-12
	 * @param id
	 */
	public boolean updateStatus(DeviceEntity obj) {
		try {
			return update("Device.updateStatus", obj) > 0;
		} catch (Exception ex) {
			log.error("Device.updateStatus", ex);
			return false;
		}
	}
	
	/**
	 * @description delete site
	 * @author long.pham
	 * @since 2021-01-11
	 * @param id
	 */
	public boolean deleteDevice(DeviceEntity obj) {
		try {
			return update("Device.deleteDevice", obj) > 0;
		} catch (Exception ex) {
			log.error("Device.deleteDevice", ex);
			return false;
		}
	}
	
	
	/**
	 * @description insert device
	 * @author long.pham
	 * @since 2021-01-12
	 */
	public DeviceEntity insertDevice(DeviceEntity obj) 
	{
		try
	    {
	       Object insertId = insert("Device.insertDevice", obj);
	       if(insertId != null && insertId instanceof Integer) {
	    	   return obj;
	       }else {
	    	   return null;
	       }
	    }
	    catch(Exception ex)
	    {
	        log.error("insert", ex);
	        return null;
	    }	
	}
	
	/**
	 * @description update device
	 * @author long.pham
	 * @since 2021-01-12
	 */
	public boolean updateDevice(DeviceEntity obj){
		try{
			return update("Device.updateDevice", obj)>0;
		}catch (Exception ex) {
			log.error("Device.updateDevice", ex);
			return false;
		}
	}
	

}
