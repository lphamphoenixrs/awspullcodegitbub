/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
package com.phoenixrs.api.services;


import com.phoenixrs.api.DBManagers.DB;
import com.phoenixrs.api.entities.ModelRT1Class30000Entity;

public class ModelRT1Class30000Service extends DB {

	/**
	 * @description insert data from datalogger to model_rt1_class30000
	 * @author long.pham
	 * @since 2020-10-07
	 * @param data from datalogger
	 */
	
	public boolean insertModelRT1Class30000(ModelRT1Class30000Entity obj) {
		try {
			 Object insertId = insert("ModelRT1Class30000.insertModelRT1Class30000", obj);
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
