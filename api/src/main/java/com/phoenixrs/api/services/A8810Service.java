/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
package com.phoenixrs.api.services;


import com.phoenixrs.api.DBManagers.DB;
import com.phoenixrs.api.entities.A8810Entity;

public class A8810Service extends DB {

	// Insert data model A8810
	public boolean insertA8810(A8810Entity obj) {
		try {
			 Object insertId = insert("A8810.insertA8810", obj);
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
