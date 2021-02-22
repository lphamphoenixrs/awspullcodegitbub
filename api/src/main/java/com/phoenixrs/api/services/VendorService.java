/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
package com.phoenixrs.api.services;

import java.util.ArrayList;
import java.util.List;

import com.phoenixrs.api.DBManagers.DB;
import com.phoenixrs.api.entities.VendorEntity;

public class VendorService extends DB {

	/**
	 * @description get list time zone
	 * @author long.pham
	 * @since 2020-10-30
	 * @returns array
	 */
	
	public List getListDropdown(VendorEntity obj) {
		List dataList = new ArrayList();
		try {
			dataList = queryForList("Vendor.getListDropdown", obj);
			if (dataList == null)
				return new ArrayList();
		} catch (Exception ex) {
			return new ArrayList();
		}
		return dataList;
	}

}
