package com.phoenixrs.api.services;

import java.util.ArrayList;
import java.util.List;


import com.phoenixrs.api.DBManagers.DB;
import com.phoenixrs.api.entities.DemoEntity;

public class DemoService extends DB {
	
	// get all 
	@SuppressWarnings("rawtypes")
	public List getAll( DemoEntity obj) {
		List dataList = new ArrayList();
		try {
			dataList = queryForList("Demo.getAll", obj);
			if (dataList == null)
				return new ArrayList();
		} catch (Exception ex) {
			return new ArrayList();
		}
		return dataList;
	}
}
