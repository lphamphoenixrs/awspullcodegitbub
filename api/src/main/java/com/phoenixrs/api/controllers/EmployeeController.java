/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
package com.phoenixrs.api.controllers;

import static org.apache.commons.lang3.RandomStringUtils.randomAlphabetic;

import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.phoenixrs.api.utils.Constants;
import com.phoenixrs.api.utils.Lib;
import com.phoenixrs.api.entities.EmployeeManageEntity;
import com.phoenixrs.api.services.EmployeeService;
import springfox.documentation.annotations.ApiIgnore;
import javax.validation.Valid;

@RestController
@ApiIgnore
@RequestMapping("/employee")
public class EmployeeController extends BaseController {

	/**
	 * @description Get list role
	 * @author long.pham
	 * @since 2021-01-06
	 * @return data (status, message, array, total_row
	 */
	@PostMapping("/list")
	public Object getList(@RequestBody EmployeeManageEntity obj) {
		try {
			if (obj.getLimit() == 0) {
				obj.setLimit(Constants.MAXRECORD);
			}
			EmployeeService service = new EmployeeService();
			List data = service.getList(obj);
			int totalRecord = service.getTotalRecord(obj);
			return this.jsonResult(true, Constants.GET_SUCCESS_MSG, data, totalRecord);
		} catch (Exception e) {
			log.error(e);
			return this.jsonResult(false, Constants.GET_ERROR_MSG, e, 0);
		}
	}

	/**
	 * @description update Employee status
	 * @author long.pham
	 * @since 2021-01-06
	 * @param id
	 * @return data (status, message, array, total_row
	 */
	@PostMapping("/update-status")
	public Object updateOwnAccountstatus(@RequestBody EmployeeManageEntity obj) {
		try {
			EmployeeService service = new EmployeeService();
			service.updateStatus(obj);
			return this.jsonResult(true, "Update status complate.", obj, 1);
		} catch (Exception e) {
			// log error
			return this.jsonResult(false, Constants.GET_ERROR_MSG, e, 0);
		}
	}

	/**
	 * @description save Employee
	 * @author long.pham
	 * @since 2021-01-06
	 * @param  screen_mode = 0:add, 1:edit
	 */

	@PostMapping("/save")
	public Object saveRole(@Valid @RequestBody EmployeeManageEntity obj) {
		try {
			EmployeeService service = new EmployeeService();
			String fileName = "";
			String saveDir = "";
			if (obj.getScreen_mode() == 1) {
				EmployeeManageEntity getEmployeeByEmail = service.getEmployeeByEmail(obj.getEmail());
				if(getEmployeeByEmail.getId() > 0) {
					return this.jsonResult(false, "Email already exists", null, 0);
				}
				
				if(!Lib.isBlank(obj.getFile_upload())) {
					saveDir = uploadRootPath() +"/"+ Lib.getReourcePropValue(Constants.appConfigFileName, Constants.uploadFilePathConfigKeyAvatar);
					fileName = randomAlphabetic(16);
					String saveFileName = Lib.uploadFromBase64(obj.getFile_upload(), fileName, saveDir);
					obj.setAvatar(Lib.getReourcePropValue(Constants.appConfigFileName, Constants.uploadFilePathConfigKeyAvatar)+"/"+saveFileName);
				}
				
				EmployeeManageEntity data = service.insertEmployee(obj);
				if (data != null) {
					return this.jsonResult(true, Constants.SAVE_SUCCESS_MSG, data, 1);
				} else {
					return this.jsonResult(false, Constants.SAVE_ERROR_MSG, null, 0);
				}
			} else {
				if (obj.getScreen_mode() == 2) {
					if(!Lib.isBlank(obj.getFile_upload())) {
						saveDir = uploadRootPath() +"/"+ Lib.getReourcePropValue(Constants.appConfigFileName, Constants.uploadFilePathConfigKeyAvatar);
						fileName = randomAlphabetic(16);
						String saveFileName = Lib.uploadFromBase64(obj.getFile_upload(), fileName, saveDir);
						obj.setAvatar(Lib.getReourcePropValue(Constants.appConfigFileName, Constants.uploadFilePathConfigKeyAvatar)+"/"+saveFileName);
					}
					
					boolean checkEmployeeEmailExist = service.checkEmployeeEmailExist(obj);
					if(checkEmployeeEmailExist) {
						return this.jsonResult(false, "Email already exists", null, 0);
					}
					
					if(Lib.isBlank(obj.getPassword())) {
						EmployeeManageEntity getEmployeeById = service.getEmployeeById(obj.getId());
						if(getEmployeeById.getId() > 0) {
							obj.setPassword(getEmployeeById.getPassword());
						} else {
							return this.jsonResult(false, Constants.UPDATE_ERROR_MSG, null, 0);
						}
					}
					
					boolean insert = service.updateEmployee(obj);
					if (insert == true) {
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

	/**
	 * @description delete Employee
	 * @author long.pham
	 * @since 2021-01-06
	 * @param id
	 * @return data (status, message, array, total_row
	 */
	@PostMapping("/delete")
	public Object delete(@Valid @RequestBody EmployeeManageEntity obj) {
		EmployeeService service = new EmployeeService();
		try {
			boolean result = service.deleteEmployee(obj);
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
	
}
