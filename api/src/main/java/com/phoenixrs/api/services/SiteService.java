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

public class SiteService extends DB {

	/**
	 * @description get list site for page employee manage site
	 * @author long.pham
	 * @since 2021-01-07
	 */

	public List getListEmployeeManageSite(SiteEntity obj) {
		List dataList = new ArrayList();
		try {
			dataList = queryForList("Site.getListEmployeeManageSite", obj);
			if (dataList == null)
				return new ArrayList();
		} catch (Exception ex) {
			return new ArrayList();
		}
		return dataList;
	}

	/**
	 * @description get total site for page employee manage site
	 * @author long.pham
	 * @since 2021-01-07
	 */
	public int getManageSiteTotalRecord(SiteEntity obj) {
		try {
			return (int) queryForObject("Site.getManageSiteTotalRecord", obj);
		} catch (Exception ex) {
			return 0;
		}
	}
	
	
	
	/**
	 * @description get total record Employee
	 * @author long.pham
	 * @since 2021-01-06
	 */
	public int checkExitsManageSite(SiteEntity obj) {
		try {
			return (int) queryForObject("Site.checkExitsManageSite", obj);
		} catch (Exception ex) {
			return 0;
		}
	}
	
	
	
	/**
	 * @description insert site employee map
	 * @author long.pham
	 * @since 2021-01-08
	 * @param id_employee, id_site
	 */
	public SiteEntity insertSiteEmployeeMap(SiteEntity obj) 
	{
		try
	    {
	       Object insertId = insert("Site.insertSiteEmployeeMap", obj);
	       if(insertId != null && insertId instanceof Integer) {
	    	   return obj;
	       }else {
	    	   return null;
	       }
	    }
	    catch(Exception ex)
	    {
	        log.error("insert.insertSiteEmployeeMap", ex);
	        return null;
	    }	
	}
	
	
	 /** @description delete site employee map
	 * @author long.pham
	 * @since 2021-01-08
	 * @param id
	 */
	public boolean deleteSiteEmployeeMap(SiteEntity obj) {
		try {
			return delete("Site.deleteSiteEmployeeMap", obj) > 0;
		} catch (Exception ex) {
			log.error("Site.deleteSiteEmployeeMap", ex);
			return false;
		}
	}
	
	
	
	/**
	 * @description insert site
	 * @author long.pham
	 * @since 2021-01-08
	 */
	public SiteEntity insertSite(SiteEntity obj) 
	{
		try
	    {
	       Object insertId = insert("Site.insertSite", obj);
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
	 * @description update role
	 * @author long.pham
	 * @since 2021-01-08
	 * @param id
	 */
	public boolean updateSite(SiteEntity obj){
		try{
			return update("Site.updateSite", obj)>0;
		}catch (Exception ex) {
			log.error("Site.updateSite", ex);
			return false;
		}
	}
	
	
	/**
	 * @description get list site by id customer
	 * @author long.pham
	 * @since 2020-10-09
	 * @param id_customer
	 */
	
	
	public List getList(SiteEntity obj) {
		List dataList = new ArrayList();
		try {
			dataList = queryForList("Site.getList", obj);
			if (dataList == null)
				return new ArrayList();
		} catch (Exception ex) {
			return new ArrayList();
		}
		return dataList;
	}
	
	public int getTotalRecord(SiteEntity obj) {
		try {
			return (int)queryForObject("Site.getListCount", obj);
		} catch (Exception ex) {
			return 0;
		}
	}
	
	
	/**
	 * @description update site status
	 * @author long.pham
	 * @since 2021-01-11
	 * @param id
	 */
	public boolean updateStatus(SiteEntity obj) {
		try {
			return update("Site.updateStatus", obj) > 0;
		} catch (Exception ex) {
			log.error("Site.updateStatus", ex);
			return false;
		}
	}
	
	
	/**
	 * @description delete site
	 * @author long.pham
	 * @since 2021-01-11
	 * @param id
	 */
	public boolean deleteEmployee(SiteEntity obj) {
		try {
			return update("Site.deleteSite", obj) > 0;
		} catch (Exception ex) {
			log.error("Site.deleteSite", ex);
			return false;
		}
	}
	
	
	/**
	 * @description get all site by id employee
	 * @author long.pham
	 * @since 2021-01-14
	 * @param id_employee, id_sites
	 */
	

	public List getAllSiteByEmployee(SiteEntity obj) {
		List dataList = new ArrayList();
		try {
			dataList = queryForList("Site.getAllSiteByEmployee", obj);
			if (dataList == null)
				return new ArrayList();
		} catch (Exception ex) {
			return new ArrayList();
		}
		return dataList;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/**
	 * @description get all site by id customer
	 * @author long.pham
	 * @since 2020-10-08
	 * @param id_customer
	 */
	

	public List getAllSiteByIdCustomer(SiteEntity obj) {
		List dataList = new ArrayList();
		try {
			dataList = queryForList("Site.getAllSiteByIdCustomer", obj);
			if (dataList == null)
				return new ArrayList();
		} catch (Exception ex) {
			return new ArrayList();
		}
		return dataList;
	}
	
	
	/**
	 * @description get summary site by customer id
	 * @author long.pham
	 * @since 2020-10-21
	 * @param id_customer
	 * @return Object
	 */

	public SiteEntity getSiteCustomerById(int id_customer) {
		SiteEntity siteCustomerEn = new SiteEntity();
		try {
			siteCustomerEn = (SiteEntity) queryForObject("Site.getSiteCustomerById", id_customer);
			if (siteCustomerEn == null)
				return new SiteEntity();
		} catch (Exception ex) {
			log.error("Site.SiteCustomer", ex);
			return new SiteEntity();
		}
		return siteCustomerEn;
	}
	
	
	/**
	 * @description get site detail
	 * @author long.pham
	 * @since 2020-10-22
	 * @param id_customer, id_site
	 * @return Object
	 */

	public SiteEntity getDetailSite(SiteEntity obj) {
		SiteEntity dataObj = new SiteEntity();
		try {
			dataObj = (SiteEntity) queryForObject("Site.getDetailSite", obj);
			if (dataObj == null)
				return new SiteEntity();
		} catch (Exception ex) {
			return new SiteEntity();
		}
		return dataObj;
	}
	
	
	/**
	 * @description get Irradiance kpi by day 
	 * @author long.pham
	 * @since 2020-10-23
	 * @param id_site, id_customer
	 */
	

	public List getChartKPIDayIrradiance(SiteEntity obj) {
		List dataList = new ArrayList();
		try {
			dataList = queryForList("Site.getChartKPIDayIrradiance", obj);
			if (dataList == null)
				return new ArrayList();
		} catch (Exception ex) {
			return new ArrayList();
		}
		return dataList;
	}
	
	/**
	 * @description get Power kpi by day 
	 * @author long.pham
	 * @since 2020-10-23
	 * @param id_site, id_customer
	 */
	

	public List getChartKPIDayPower(SiteEntity obj) {
		List dataList = new ArrayList();
		try {
			dataList = queryForList("Site.getChartKPIDayPower", obj);
			if (dataList == null)
				return new ArrayList();
		} catch (Exception ex) {
			return new ArrayList();
		}
		return dataList;
	}
	
	
	/**
	 * @description get energy kpi by day 
	 * @author long.pham
	 * @since 2020-10-23
	 * @param id_site, id_customer
	 */
	

	public List getChartKPIDayEnergy(SiteEntity obj) {
		List dataList = new ArrayList();
		try {
			dataList = queryForList("Site.getChartKPIDayEnergy", obj);
			if (dataList == null)
				return new ArrayList();
		} catch (Exception ex) {
			return new ArrayList();
		}
		return dataList;
	}
	
	
	/**
	 * @description get Power kpi by month
	 * @author long.pham
	 * @since 2020-10-26
	 * @param id_site, id_customer
	 */
	

	public List getChartKPIMonthPower(SiteEntity obj) {
		List dataList = new ArrayList();
		try {
			dataList = queryForList("Site.getChartKPIMonthPower", obj);
			if (dataList == null)
				return new ArrayList();
		} catch (Exception ex) {
			return new ArrayList();
		}
		return dataList;
	}
	
	
	/**
	 * @description get insolation kpi by month
	 * @author long.pham
	 * @since 2020-10-26
	 * @param id_site, id_customer
	 */
	

	public List getChartKPIMonthInsolation(SiteEntity obj) {
		List dataList = new ArrayList();
		try {
			dataList = queryForList("Site.getChartKPIMonthInsolation", obj);
			if (dataList == null)
				return new ArrayList();
		} catch (Exception ex) {
			return new ArrayList();
		}
		return dataList;
	}
	
	/**
	 * @description get kpi by month
	 * @author long.pham
	 * @since 2020-10-28
	 * @param id_site, id_customer
	 */
	

	public List getChartKPIMonth(SiteEntity obj) {
		List dataList = new ArrayList();
		try {
			dataList = queryForList("Site.getChartKPIMonth", obj);
			if (dataList == null)
				return new ArrayList();
		} catch (Exception ex) {
			return new ArrayList();
		}
		return dataList;
	}
	
	/**
	 * @description get kpi by year
	 * @author long.pham
	 * @since 2020-10-28
	 * @param id_site, id_customer
	 */
	

	public List getChartKPIYear(SiteEntity obj) {
		List dataList = new ArrayList();
		try {
			dataList = queryForList("Site.getChartKPIYear", obj);
			if (dataList == null)
				return new ArrayList();
		} catch (Exception ex) {
			return new ArrayList();
		}
		return dataList;
	}
	
	/**
	 * @description get active alarm
	 * @author long.pham
	 * @since 2020-10-29
	 * @param id_site, id_customer
	 */
	

	public List getActiveAlarm(SiteEntity obj) {
		List dataList = new ArrayList();
		try {
			dataList = queryForList("Site.getActiveAlarm", obj);
			if (dataList == null)
				return new ArrayList();
		} catch (Exception ex) {
			return new ArrayList();
		}
		return dataList;
	}
	
	
	
	/**
     * @description  Update site information 
     * @author long.pham
     * @since 2020-10-30
     * @param 
     */
	public boolean updateSiteInformation(SiteEntity obj){
		try{
			return update("Site.updateSite", obj) > 0;
		}catch (Exception ex) {
			log.error("Site.updateSite", ex);
			return false;
		}
	}
	
	
	/**
	 * @description get report quick query model shark 100
	 * @author long.pham
	 * @since 2020-11-09
	 * @param id_site, id_customer, id_device
	 */
	

	public List reportQuickQuery(SiteEntity obj) {
		List dataList = new ArrayList();
		try {
			dataList = queryForList("Site.reportQuickQuery", obj);
			if (dataList == null)
				return new ArrayList();
		} catch (Exception ex) {
			return new ArrayList();
		}
		return dataList;
	}
	
	
	
	/**
	 * @description get list data specific yield month
	 * @author long.pham
	 * @since 2020-11-10
	 * @param id_site, id_customer
	 */
	

	public List getSpecificYieldMonth(SiteEntity obj) {
		List dataList = new ArrayList();
		try {
			dataList = queryForList("Site.getSpecificYieldMonth", obj);
			if (dataList == null)
				return new ArrayList();
		} catch (Exception ex) {
			return new ArrayList();
		}
		return dataList;
	}
	
	/**
	 * @description get list data specific yield year
	 * @author long.pham
	 * @since 2020-11-10
	 * @param id_site, id_customer
	 */
	

	public List getSpecificYieldYear(SiteEntity obj) {
		List dataList = new ArrayList();
		try {
			dataList = queryForList("Site.getSpecificYieldYear", obj);
			if (dataList == null)
				return new ArrayList();
		} catch (Exception ex) {
			return new ArrayList();
		}
		return dataList;
	}
	
	
	
	/**
	 * @description get daily report summary
	 * @author long.pham
	 * @since 2020-11-11
	 * @param id_customer, id_site
	 * @return Object
	 */

	public Object getDailyReportSumary(SiteEntity obj) {
		Object dataObj = null;
		try {
			dataObj = queryForObject("Site.getDailyReportSumary", obj);
			if (dataObj == null)
				return new SiteEntity();
		} catch (Exception ex) {
			return new SiteEntity();
		}
		return dataObj;
	}
	
	
	/**
	 * @description get list data daily report to chart
	 * @author long.pham
	 * @since 2020-11-10
	 * @param id_site, id_customer, start_date,end_date
	 */
	

	public List getDailyReportChart(SiteEntity obj) {
		List dataList = new ArrayList();
		try {
			dataList = queryForList("Site.getDailyReportChart", obj);
			if (dataList == null)
				return new ArrayList();
		} catch (Exception ex) {
			return new ArrayList();
		}
		return dataList;
	}
	
	
	
	/**
	 * @description get list data report visualization device
	 * @author long.pham
	 * @since 2020-11-12
	 * @param id_site, id_customer,id_device, start_date, end_date
	 */
	

	public List getReportVisualizationDevice(SiteEntity obj) {
		List dataList = new ArrayList();
		try {
			dataList = queryForList("Site.getReportVisualizationDevice", obj);
			if (dataList == null)
				return new ArrayList();
		} catch (Exception ex) {
			return new ArrayList();
		}
		return dataList;
	}
	
	/**
	 * @description get list data report visualization device by day
	 * @author long.pham
	 * @since 2020-11-13
	 * @param id_site, id_customer,id_device, start_date, end_date
	 */
	

	public List getReportVisualizationDeviceDay(SiteEntity obj) {
		List dataList = new ArrayList();
		try {
			dataList = queryForList("Site.getReportVisualizationDeviceDay", obj);
			if (dataList == null)
				return new ArrayList();
		} catch (Exception ex) {
			return new ArrayList();
		}
		return dataList;
	}
	
	/**
	 * @description get list data annual comparison
	 * @author long.pham
	 * @since 2020-11-13
	 * @param id_site, id_customer, current_time
	 */
	

	public List getAnnualComparison(SiteEntity obj) {
		List dataList = new ArrayList();
		try {
			dataList = queryForList("Site.getAnnualComparison", obj);
			if (dataList == null)
				return new ArrayList();
		} catch (Exception ex) {
			return new ArrayList();
		}
		return dataList;
	}
	
	
	
}
