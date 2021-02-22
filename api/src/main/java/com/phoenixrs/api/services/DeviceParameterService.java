/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
package com.phoenixrs.api.services;

import java.util.ArrayList;
import java.util.List;

import com.phoenixrs.api.DBManagers.DB;
import com.phoenixrs.api.entities.DeviceParameterEntity;

public class DeviceParameterService extends DB {
	
	/**
	 * @description get list parameter by device
	 * @author long.pham
	 * @since 2020-11-06
	 * @param array id_device
	 * @return array
	 */
	
	public List getListByDevice(DeviceParameterEntity obj) {
		List dataList = new ArrayList();
		try {
			dataList = queryForList("DeviceParameter.getListByDevice", obj);
			if (dataList == null)
				return new ArrayList();
		} catch (Exception ex) {
			return new ArrayList();
		}
		return dataList;
	}
	
	

}
