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

public class CustomerViewService extends DB {

	
	/**
	 * @description get customer view site info
	 * @author long.pham
	 * @since 2020-12-02
	 * @param id_site, id_customer
	 * @return Object
	 */

	public Object getCustomerViewInfo(SiteEntity obj) {
		Object dataObj = null;
		try {
			switch(obj.getId_site_type()) {
			  case 1:
				  dataObj = queryForObject("CustomerViewTypeA.getCustomerViewInfo", obj);
			    break;
			  case 2:
				  dataObj = queryForObject("CustomerViewTypeB.getCustomerViewInfo", obj);
			    break;
			  case 3:
				  dataObj = queryForObject("CustomerViewTypeC.getCustomerViewInfo", obj);
			    break;
			}
			
			if (dataObj == null)
				return null;
		} catch (Exception ex) {
			return null;
		}
		return dataObj;
	}
	
	/**
	 * @description get chart data energy
	 * @author long.pham
	 * @since 2020-12-04
	 * @param id_site, id_customer
	 */
	

	public List getChartDataEnergy(SiteEntity obj) {
		List dataList = new ArrayList();
		try {
			switch(obj.getId_site_type()) {
			  case 1:
				  dataList = queryForList("CustomerViewTypeA.getChartDataEnergy", obj);
			    break;
			  case 2:
				  dataList = queryForList("CustomerViewTypeB.getChartDataEnergy", obj);
			    break;
			  case 3:
				  dataList = queryForList("CustomerViewTypeC.getChartDataEnergy", obj);
			    break;
			}
			
			
			if (dataList == null)
				return new ArrayList();
		} catch (Exception ex) {
			return new ArrayList();
		}
		return dataList;
	}
	
	
	
	/**
	 * @description get list site by id customer
	 * @author long.pham
	 * @since 2020-12-08
	 * @param id_customer
	 */
	
	
	public List getList(SiteEntity obj) {
		List dataList = new ArrayList();
		try {
			dataList = queryForList("CustomerViewTypeA.getList", obj);
			if (dataList == null)
				return new ArrayList();
		} catch (Exception ex) {
			return new ArrayList();
		}
		return dataList;
	}
	
}
