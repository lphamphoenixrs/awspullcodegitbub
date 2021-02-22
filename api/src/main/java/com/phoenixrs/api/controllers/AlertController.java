/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
package com.phoenixrs.api.controllers;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.phoenixrs.api.utils.Constants;
import com.phoenixrs.api.entities.AlertEntity;
import com.phoenixrs.api.services.AlertService;

import springfox.documentation.annotations.ApiIgnore;

@RestController
@ApiIgnore
@RequestMapping("/alert")
public class AlertController extends BaseController {

	/**
	 * @description Get list alert by site
	 * @author long.pham
	 * @since 2020-11-16
	 * @param id_customer, id_site, start_date, end_date
	 * @return data (status, message, array, total_row
	 */

	@PostMapping("/list")
    public Object getList(@RequestBody AlertEntity obj){
		try {
			if(obj.getLimit() == 0) {
				obj.setLimit(1000);
			}
			
			AlertService service = new AlertService();
			List data = service.getList(obj);
			int totalRecord = service.getListTotalCount(obj);
			return this.jsonResult(true, Constants.GET_SUCCESS_MSG, data, totalRecord);
		} catch (Exception e) {
			log.error(e);
			return this.jsonResult(false, Constants.GET_ERROR_MSG, e, 0);
		}
    }
	
	
	/**
	 * @description Get list alert by site
	 * @author long.pham
	 * @since 2020-11-16
	 * @param id_customer, id_site, start_date, end_date
	 * @return data (status, message, array, total_row
	 */

	@PostMapping("/list-by-id-sites")
    public Object getListSiteByEmployee(@RequestBody AlertEntity obj){
		try {
			if(obj.getLimit() == 0) {
				obj.setLimit(1000);
			}
			
			AlertService service = new AlertService();
			List data = service.getListIdSites(obj);
			return this.jsonResult(true, Constants.GET_SUCCESS_MSG, data, 1);
		} catch (Exception e) {
			log.error(e);
			return this.jsonResult(false, Constants.GET_ERROR_MSG, e, 0);
		}
    }
	
	
	/**
	 * @description Get detail alert
	 * @author long.pham
	 * @since 2020-11-24
	 * @param id_site, id_customer, id_alert, current_time
	 * @return data (status, message, array, total_row
	 */

	@PostMapping("/alert-detail")
	public Object getAlertDetail(@RequestBody AlertEntity obj) {
		try {
			AlertService service = new AlertService();
			Object detailObj = service.getDetailAlert(obj);
			if (detailObj != null) {
				return this.jsonResult(true, Constants.GET_SUCCESS_MSG, detailObj, 1);
			} else {
				return this.jsonResult(false, Constants.GET_ERROR_MSG, null, 0);
			}
		} catch (Exception e) {
			// log error
			return this.jsonResult(false, Constants.GET_ERROR_MSG, e, 0);
		}
	}
	
}
