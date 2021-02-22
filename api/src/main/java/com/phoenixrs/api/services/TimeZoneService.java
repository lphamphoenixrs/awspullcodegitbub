/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
package com.phoenixrs.api.services;

import java.util.ArrayList;
import java.util.List;

import com.phoenixrs.api.DBManagers.DB;
import com.phoenixrs.api.entities.TimeZoneEntity;

public class TimeZoneService extends DB {

	/**
	 * @description get list time zone
	 * @author long.pham
	 * @since 2020-10-30
	 * @returns array
	 */
	
	public List getList(TimeZoneEntity obj) {
		List dataList = new ArrayList();
		try {
			dataList = queryForList("TimeZone.getList", obj);
			if (dataList == null)
				return new ArrayList();
		} catch (Exception ex) {
			return new ArrayList();
		}
		return dataList;
	}

}
