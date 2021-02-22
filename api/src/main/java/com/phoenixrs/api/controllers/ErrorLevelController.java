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
import com.phoenixrs.api.entities.ErrorLevelEntity;
import com.phoenixrs.api.services.ErrorLevelService;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@ApiIgnore
@RequestMapping("/error-level")
public class ErrorLevelController extends BaseController {

	/**
	 * @description Get list error level
	 * @author long.pham
	 * @since 2021-01-28
	 * @return data (status, message, array, total_row
	 */
	@PostMapping("/list")
	public Object getList(@RequestBody ErrorLevelEntity obj) {
		try {
			ErrorLevelService service = new ErrorLevelService();
			List data = service.getList(obj);
			return this.jsonResult(true, Constants.GET_SUCCESS_MSG, data, data.size());
		} catch (Exception e) {
			log.error(e);
			return this.jsonResult(false, Constants.GET_ERROR_MSG, e, 0);
		}
	}
}
