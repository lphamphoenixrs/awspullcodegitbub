/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
package com.phoenixrs.api.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.phoenixrs.api.utils.Constants;
import com.phoenixrs.api.entities.SiteEntity;
import com.phoenixrs.api.services.CustomerViewService;
import com.phoenixrs.api.services.SiteService;

import springfox.documentation.annotations.ApiIgnore;
import java.util.List;

@RestController
@ApiIgnore
@RequestMapping("/customer-view")
public class CustomerViewController extends BaseController {

	/**
	 * @description Get mini site information
	 * @author long.pham
	 * @since 2020-12-02
	 * @param id_site, id_customer
	 * @return data (status, message, array, total_row
	 */

	@PostMapping("/get-customer-view-info")
	public Object getCustomerViewInfo(@RequestBody SiteEntity obj) {
		try {
			CustomerViewService service = new CustomerViewService();
			Object dataObj = service.getCustomerViewInfo(obj);
			if (dataObj != null) {
				return this.jsonResult(true, Constants.GET_SUCCESS_MSG, dataObj, 1);
			} else {
				return this.jsonResult(false, Constants.GET_ERROR_MSG, null, 0);
			}
		} catch (Exception e) {
			// log error
			return this.jsonResult(false, Constants.GET_ERROR_MSG, e, 0);
		}
	}

	/**
	 * @description Get customer view chart data
	 * @author long.pham
	 * @since 2020-12-04
	 * @param id
	 * @return data (status, message, array, total_row
	 */
	@PostMapping("/get-chart-data-performance")
	public Object getChartInverterPerformance(@RequestBody SiteEntity obj) {
		try {

			CustomerViewService service = new CustomerViewService();
			String filterBy = obj.getFilterBy();
			switch (filterBy) {
			case "today":
				List dataEnergy = service.getChartDataEnergy(obj);
				obj.setEnergy(dataEnergy);
				break;
			case "last_month":
			case "this_month":
				List dataThisMonthEnergy = service.getChartDataEnergy(obj);
				obj.setEnergy(dataThisMonthEnergy);
				break;
			case "12_month":
				List data12MonthEnergy = service.getChartDataEnergy(obj);
				obj.setEnergy(data12MonthEnergy);
				break;
			case "lifetime":
				  List dataLifetimeEnergy = service.getChartDataEnergy(obj);
				obj.setEnergy(dataLifetimeEnergy);
				break;
			}

			return this.jsonResult(true, Constants.GET_SUCCESS_MSG, obj, 1);
		} catch (Exception e) {
			log.error(e);
			return this.jsonResult(false, Constants.GET_ERROR_MSG, e, 0);
		}
	}
	
	
	/**
	 * @description Get list site by id_customer
	 * @author long.pham
	 * @since 2020-10-09
	 * @param id_customer
	 * @return data (status, message, array, total_row
	 */
	@PostMapping("/list-site-by-customer")
	public Object getList(@RequestBody SiteEntity obj) {
		try {
			if (obj.getLimit() == 0) {
				obj.setLimit(Constants.MAXRECORD);
			}
			CustomerViewService service = new CustomerViewService();
			List data = service.getList(obj);
			return this.jsonResult(true, Constants.GET_SUCCESS_MSG, data, 1);
		} catch (Exception e) {
			log.error(e);
			return this.jsonResult(false, Constants.GET_ERROR_MSG, e, 0);
		}
	}

	

}
