/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
package com.phoenixrs.api.services;

import java.util.ArrayList;
import java.util.List;

import com.phoenixrs.api.DBManagers.DB;
import com.phoenixrs.api.entities.SiteEntity;

public class MiniSiteService extends DB {

	
	/**
	 * @description get mini site detail
	 * @author long.pham
	 * @since 2020-11-02
	 * @param id_site
	 * @return Object
	 */

	public Object getMiniSiteInfo(SiteEntity obj) {
		Object dataObj = null;
		try {
			dataObj = queryForObject("MiniSite.getMiniSiteInfo", obj);
			if (dataObj == null)
				return new SiteEntity();
		} catch (Exception ex) {
			return new SiteEntity();
		}
		return dataObj;
	}
	
	/**
	 * @description get chart inverter performance energy
	 * @author long.pham
	 * @since 2020-11-02
	 * @param id_site
	 */
	

	public List getChartInverterPerformanceEnergy(SiteEntity obj) {
		List dataList = new ArrayList();
		try {
			dataList = queryForList("MiniSite.getChartInverterPerformanceEnergy", obj);
			if (dataList == null)
				return new ArrayList();
		} catch (Exception ex) {
			return new ArrayList();
		}
		return dataList;
	}
	
	/**
	 * @description get chart inverter performance Irradiance
	 * @author long.pham
	 * @since 2020-11-03
	 * @param id_site
	 */
	

	public List getChartInverterPerformanceIrradiance(SiteEntity obj) {
		List dataList = new ArrayList();
		try {
			dataList = queryForList("MiniSite.getChartInverterPerformanceIrradiance", obj);
			if (dataList == null)
				return new ArrayList();
		} catch (Exception ex) {
			return new ArrayList();
		}
		return dataList;
	}
	
	
	
	
}
