/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
package com.phoenixrs.api.services;

import java.util.ArrayList;
import java.util.List;

import com.phoenixrs.api.DBManagers.DB;
import com.phoenixrs.api.entities.DeviceGroupEntity;

public class DeviceGroupService extends DB {

	/**
	 * @description get list group device
	 * @author long.pham
	 * @since 2021-01-11
	 * @returns array
	 */
	
	public List getList(DeviceGroupEntity obj) {
		List dataList = new ArrayList();
		try {
			dataList = queryForList("DeviceGroup.getListDropdown", obj);
			if (dataList == null)
				return new ArrayList();
		} catch (Exception ex) {
			return new ArrayList();
		}
		return dataList;
	}

}
