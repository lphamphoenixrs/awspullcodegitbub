/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
package com.phoenixrs.api.controllers;
import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.phoenixrs.api.utils.Constants;
import com.phoenixrs.api.entities.SiteEntity;
import com.phoenixrs.api.services.MiniSiteService;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@ApiIgnore
@RequestMapping("/minisite")
public class MiniSiteController extends BaseController {

	/**
	 * @description Get mini site information
	 * @author long.pham
	 * @since 2020-11-02
	 * @param id_site
	 * @return data (status, message, array, total_row
	 */

	@PostMapping("/info")
	public Object getSummarySiteByCustomerId(@RequestBody SiteEntity obj) {
		try {
			MiniSiteService service = new MiniSiteService();
			Object getMiniSite = service.getMiniSiteInfo(obj);
			if (getMiniSite != null) {
				return this.jsonResult(true, Constants.GET_SUCCESS_MSG, getMiniSite, 1);
			} else {
				return this.jsonResult(false, Constants.GET_ERROR_MSG, null, 0);
			}
		} catch (Exception e) {
			// log error
			return this.jsonResult(false, Constants.GET_ERROR_MSG, e, 0);
		}
	}
	
	/**
	 * @description Get chart inverter performance by site
	 * @author long.pham
	 * @since 2020-11-02
	 * @param id
	 * @return data (status, message, array, total_row
	 */
	@PostMapping("/get-chart-minisite-inverter-performance")
	public Object getChartInverterPerformance(@RequestBody SiteEntity obj) {
		try {

			MiniSiteService service = new MiniSiteService();
			String filterBy = obj.getFilterBy();
			switch(filterBy) {
			  case "month":
				  List dataMonth = service.getChartInverterPerformanceIrradiance(obj);
				  obj.setEnergy(dataMonth);
				  
			    break;
			  case "year":
				  List dataYear = service.getChartInverterPerformanceIrradiance(obj);
				  obj.setEnergy(dataYear);
			    break;
			    
			  case "lifetime":
				  List dataLifetime = service.getChartInverterPerformanceIrradiance(obj);
				  obj.setEnergy(dataLifetime);
			    break;
			    
			  default:
				  List dataIrradiance = service.getChartInverterPerformanceIrradiance(obj);
				  obj.setIrradiance(dataIrradiance);
				  List dataEnergy = service.getChartInverterPerformanceEnergy(obj);
				  obj.setEnergy(dataEnergy);
				  break;		  
			}
			
			return this.jsonResult(true, Constants.GET_SUCCESS_MSG, obj, 1);
		} catch (Exception e) {
			log.error(e);
			return this.jsonResult(false, Constants.GET_ERROR_MSG, e, 0);
		}
	}
	
}
