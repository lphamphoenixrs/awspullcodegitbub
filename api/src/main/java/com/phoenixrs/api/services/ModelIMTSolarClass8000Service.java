/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
package com.phoenixrs.api.services;


import com.phoenixrs.api.DBManagers.DB;
import com.phoenixrs.api.entities.ModelIMTSolarClass8000Entity;

public class ModelIMTSolarClass8000Service extends DB {

	/**
	 * @description insert data from datalogger to model_imt_solar_class8000
	 * @author long.pham
	 * @since 2020-12-11
	 * @param data from datalogger
	 */
	
	public boolean insertModelIMTSolarClass8000(ModelIMTSolarClass8000Entity obj) {
		try {
			 Object insertId = insert("ModelIMTSolarClass8000.insertModelIMTSolarClass8000", obj);
		        if(insertId == null ) {
		        	return false;
		        }
		        return true;
		} catch (Exception ex) {
			log.error("insert", ex);
			return false;
		}

	}

}
