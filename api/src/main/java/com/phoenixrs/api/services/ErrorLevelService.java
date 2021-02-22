/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
package com.phoenixrs.api.services;

import java.util.ArrayList;
import java.util.List;

import com.phoenixrs.api.DBManagers.DB;
import com.phoenixrs.api.entities.ErrorLevelEntity;

public class ErrorLevelService extends DB {

	/**
	 * @description get error level
	 * @author long.pham
	 * @since 2021-01-28
	 * @returns array
	 */
	
	public List getList(ErrorLevelEntity obj) {
		List dataList = new ArrayList();
		try {
			dataList = queryForList("ErrorLevel.getList", obj);
			if (dataList == null)
				return new ArrayList();
		} catch (Exception ex) {
			return new ArrayList();
		}
		return dataList;
	}

}
