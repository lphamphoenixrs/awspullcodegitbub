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
import com.phoenixrs.api.entities.DeviceParameterEntity;
import com.phoenixrs.api.services.DeviceParameterService;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@ApiIgnore
@RequestMapping("/device-parameter")
public class DeviceParameterController extends BaseController {

	/**
	 * @description Get device by device type
	 * @author long.pham
	 * @since 2020-11-06
	 * @param  array id_device
	 * @return data (status, message, array, total_row)
	 */
	@PostMapping("/list-by-device")
	public Object getList(@RequestBody DeviceParameterEntity obj) {
		try {
			if(obj.getId_device() <= 0) {
				return this.jsonResult(true, Constants.GET_SUCCESS_MSG, null, 0);
			}
			
			DeviceParameterService service = new DeviceParameterService();
			List data = service.getListByDevice(obj);
			return this.jsonResult(true, Constants.GET_SUCCESS_MSG, data, data.size());
		} catch (Exception e) {
			log.error(e);
			return this.jsonResult(false, Constants.GET_ERROR_MSG, e, 0);
		}
	}
}
