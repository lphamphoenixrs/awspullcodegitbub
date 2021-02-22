/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
package com.phoenixrs.api.services;


import com.phoenixrs.api.DBManagers.DB;
import com.phoenixrs.api.entities.ModelIVTSolaronEXTEntity;

public class ModelIVTSolaronEXTService extends DB {

	/**
	 * @description insert data from datalogger to model_ivt_solaron_ext
	 * @author long.pham
	 * @since 2020-10-07
	 * @param data from datalogger
	 */
	
	public boolean insertModelIVTSolaronEXT(ModelIVTSolaronEXTEntity obj) {
		try {
			 Object insertId = insert("ModelIVTSolaronEXT.insertModelIVTSolaronEXT", obj);
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
