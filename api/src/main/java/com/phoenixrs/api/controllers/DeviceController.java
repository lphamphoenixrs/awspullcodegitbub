/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
package com.phoenixrs.api.controllers;
import java.util.List;
import javax.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.phoenixrs.api.utils.Constants;
import com.phoenixrs.api.entities.DeviceEntity;
import com.phoenixrs.api.services.DeviceService;

import springfox.documentation.annotations.ApiIgnore;

@RestController
@ApiIgnore
@RequestMapping("/device")
public class DeviceController extends BaseController {

	/**
	 * @description Get list device by id_site
	 * @author long.pham
	 * @since 2021-01-12
	 * @param id_site
	 * @return data (status, message, array, total_row
	 */
	@PostMapping("/list-device-by-site")
	public Object getListDeviceBySite(@RequestBody DeviceEntity obj) {
		try {
			if (obj.getLimit() == 0) {
				obj.setLimit(Constants.MAXRECORD);
			}
			DeviceService service = new DeviceService();
			List data = service.getListDeviceBySite(obj);
			int totalRecord = service.getDeviceBySiteTotalRecord(obj);
			return this.jsonResult(true, Constants.GET_SUCCESS_MSG, data, totalRecord);
		} catch (Exception e) {
			log.error(e);
			return this.jsonResult(false, Constants.GET_ERROR_MSG, e, 0);
		}
	}
	
	/**
	 * @description Get device by device type
	 * @author long.pham
	 * @since 2020-11-06
	 * @param array id_device
	 * @return data (status, message, array, total_row)
	 */
	@PostMapping("/list-by-id-device-type")
	public Object getList(@RequestBody DeviceEntity obj) {
		try {
			DeviceService service = new DeviceService();
			List data = service.getListByDeviceType(obj);
			return this.jsonResult(true, Constants.GET_SUCCESS_MSG, data, data.size());
		} catch (Exception e) {
			log.error(e);
			return this.jsonResult(false, Constants.GET_ERROR_MSG, e, 0);
		}
	}
	
	/**
	 * @description Get list device by device group
	 * @author long.pham
	 * @since 2020-11-12
	 * @param id_site, id_device, id_device_group = 3
	 * @return data (status, message, array, total_row)
	 */
	@PostMapping("/list-device-by-id-group")
	public Object getListDeviceByGroup(@RequestBody DeviceEntity obj) {
		try {
			DeviceService service = new DeviceService();
			List data = service.getListDeviceByGroup(obj);
			return this.jsonResult(true, Constants.GET_SUCCESS_MSG, data, data.size());
		} catch (Exception e) {
			log.error(e);
			return this.jsonResult(false, Constants.GET_ERROR_MSG, e, 0);
		}
	}
	
	
	/**
	 * @description update device status
	 * @author long.pham
	 * @since 2021-01-12
	 * @param id
	 * @return data (status, message, array, total_row
	 */
	@PostMapping("/update-status")
	public Object updateStatus(@RequestBody DeviceEntity obj) {
		try {
			DeviceService service = new DeviceService();
			service.updateStatus(obj);
			return this.jsonResult(true, Constants.UPDATE_SUCCESS_MSG, obj, 1);
		} catch (Exception e) {
			// log error
			return this.jsonResult(false, Constants.GET_ERROR_MSG, e, 0);
		}
	}
	
	/**
	 * @description delete site
	 * @author long.pham
	 * @since 2021-01-11
	 * @param id
	 * @return data (status, message, array, total_row
	 */
	@PostMapping("/delete")
	public Object delete(@RequestBody DeviceEntity obj) {
		DeviceService service = new DeviceService();
		try {
			boolean result = service.deleteDevice(obj);
			if (result) {
				if (obj.getIs_delete() == 0) {
					return this.jsonResult(true, Constants.RESTORE_SUCCESS_MSG, obj, 1);
				}
				return this.jsonResult(true, Constants.DELETE_SUCCESS_MSG, obj, 1);
			}
			return this.jsonResult(false, Constants.DELETE_ERROR_MSG, null, 0);
		} catch (Exception e) {
			return this.jsonResult(false, Constants.DELETE_ERROR_MSG, e, 0);
		}
	}
	
	
	@PostMapping("/save")
	public Object saveDevice(@Valid @RequestBody DeviceEntity obj) {
		try {
			DeviceService service = new DeviceService();
			if (obj.getScreen_mode() == 1) {

				DeviceEntity data = service.insertDevice(obj);
				if (data != null) {
					return this.jsonResult(true, Constants.SAVE_SUCCESS_MSG, data, 1);
				} else {
					return this.jsonResult(false, Constants.SAVE_ERROR_MSG, null, 0);
				}
			} else {
				if (obj.getScreen_mode() == 2) {
					boolean update = service.updateDevice(obj);
					if (update == true) {
						return this.jsonResult(true, Constants.UPDATE_SUCCESS_MSG, obj, 1);
					} else {
						return this.jsonResult(false, Constants.UPDATE_ERROR_MSG, null, 0);
					}
				} else {
					return this.jsonResult(false, Constants.UPDATE_ERROR_MSG, null, 0);
				}
			}
		} catch (Exception e) {
			// log error
			return this.jsonResult(false, Constants.SAVE_ERROR_MSG, e, 0);
		}
	}
	
}
