/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
package com.phoenixrs.api.services;


import com.phoenixrs.api.DBManagers.DB;
import com.phoenixrs.api.entities.ModelAdvancedEnergySolaronEntity;

public class ModelAdvancedEnergySolaronService extends DB {

	/**
	 * @description insert data from datalogger to model_advanced_energy_solaron
	 * @author long.pham
	 * @since 2020-12-11
	 * @param data from datalogger
	 */
	
	public boolean insertModelAdvancedEnergySolaron(ModelAdvancedEnergySolaronEntity obj) {
		try {
			 Object insertId = insert("ModelAdvancedEnergySolaron.insertModelAdvancedEnergySolaron", obj);
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
