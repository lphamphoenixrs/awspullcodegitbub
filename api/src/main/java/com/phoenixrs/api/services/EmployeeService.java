/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
package com.phoenixrs.api.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.phoenixrs.api.DBManagers.DB;
import com.phoenixrs.api.entities.EmployeeManageEntity;
import com.phoenixrs.api.entities.EmployeeRoleMapEntity;
import com.phoenixrs.api.entities.UserEntity;

public class EmployeeService extends DB {

	/**
	 * @description get admin by (email)
	 * @author long.pham
	 * @since 2020-12-22
	 * @param username
	 * @return object
	 */

	public UserEntity getAdminByUserName(String userName) {
		UserEntity user = new UserEntity();
		try {
			user = (UserEntity) queryForObject("Employee.findByAdminLoginId", userName);
			if (user == null)
				return new UserEntity();

			// Get permission by user id
			List dataList = new ArrayList();
			if (user.getId() != 0 && user.getRoles() != null) {
				dataList = queryForList("Employee.getPermissionByUser", user);
			}

			user.setPermissions(dataList);

		} catch (Exception ex) {
			return new UserEntity();
		}
		return user;
	}

	/**
	 * @description get list Employee
	 * @author long.pham
	 * @since 2021-01-06
	 */

	public List getList(EmployeeManageEntity obj) {
		List dataList = new ArrayList();
		try {
			dataList = queryForList("Employee.getList", obj);
			if (dataList == null)
				return new ArrayList();
		} catch (Exception ex) {
			return new ArrayList();
		}
		return dataList;
	}

	/**
	 * @description get total record Employee
	 * @author long.pham
	 * @since 2021-01-06
	 */
	public int getTotalRecord(EmployeeManageEntity obj) {
		try {
			return (int) queryForObject("Employee.getListCount", obj);
		} catch (Exception ex) {
			return 0;
		}
	}

	/**
	 * @description update role status
	 * @author long.pham
	 * @since 2021-01-06
	 * @param id
	 */
	public boolean updateStatus(EmployeeManageEntity obj) {
		try {
			return update("Employee.updateStatus", obj) > 0;
		} catch (Exception ex) {
			log.error("Employee.updateStatus", ex);
			return false;
		}
	}

	/**
	 * @description insert Employee
	 * @author long.pham
	 * @since 2021-01-06
	 * @param id
	 */
	public EmployeeManageEntity insertEmployee(EmployeeManageEntity obj) {
		SqlSession session = this.beginTransaction();
		try {
			List roles = obj.getRoles();
			if (roles.size() <= 0) {
				throw new Exception();
			}

			session.insert("Employee.insertEmployee", obj);
			int insertOrderLastId = obj.getId();

			if (insertOrderLastId > 0) {
				for (int i = 0; i < roles.size(); i++) {
					Map<String, Object> user = (Map<String, Object>) roles.get(i);
					int id = (int) user.get("id_role");
					EmployeeRoleMapEntity employeeRoleMaptItem = this._buildEmployeeRoleMapItem(insertOrderLastId, id);
					session.insert("Employee.insertEmployeeRoleMap", employeeRoleMaptItem);
				}
			} else {
				return null;
			}

			session.commit();
			return obj;
		} catch (Exception ex) {
			session.rollback();
			log.error("Employee.insertEmployee", ex);
			return null;
		} finally {
			session.close();
		}

	}

	/**
	 * build order product item
	 * 
	 * @param productItem
	 * @param productId
	 * @param insertOrderLastId
	 * @return
	 */
	private EmployeeRoleMapEntity _buildEmployeeRoleMapItem(int employeeId, int roleId) {
		try {
			EmployeeRoleMapEntity employeeRoleMapItem = new EmployeeRoleMapEntity();
			employeeRoleMapItem.setId_enployee(employeeId);
			employeeRoleMapItem.setId_role(roleId);
			return employeeRoleMapItem;
		} catch (Exception e) {
			return null;
		}
	}

	/**
	 * @description update Employee
	 * @author long.pham
	 * @since 2021-01-06
	 * @param id
	 */
	public boolean updateEmployee(EmployeeManageEntity obj) {
		SqlSession session = this.beginTransaction();
		try {
			List roles = obj.getRoles();
			if (roles.size() <= 0) {
				throw new Exception();
			}

			session.delete("Employee.deleteEmpyeeRoleMap", obj);
			session.update("Employee.updateEmployee", obj);

			for (int i = 0; i < roles.size(); i++) {
				Map<String, Object> user = (Map<String, Object>) roles.get(i);
				int id = (int) user.get("id_role");
				EmployeeRoleMapEntity employeeRoleMaptItem = this._buildEmployeeRoleMapItem(obj.getId(), id);
				session.insert("Employee.insertEmployeeRoleMap", employeeRoleMaptItem);
			}

			session.commit();
			return true;
		} catch (Exception ex) {
			session.rollback();
			log.error("Employee.updateEmployee", ex);
			return false;
		} finally {
			session.close();
		}

//		
//		try{
//			return update("Employee.updateEmployee", obj)>0;
//		}catch (Exception ex) {
//			log.error("Employee.updateEmployee", ex);
//			return false;
//		}
	}

	/**
	 * @description delete Employee
	 * @author long.pham
	 * @since 2021-01-06
	 * @param id
	 */
	public boolean deleteEmployee(EmployeeManageEntity obj) {
		try {
			return update("Employee.deleteEmployee", obj) > 0;
		} catch (Exception ex) {
			log.error("Employee.deleteEmployee", ex);
			return false;
		}
	}

	/**
	 * @description get Employee by email
	 * @author long.pham
	 * @since 2021-01-06
	 * @param email
	 */

	public EmployeeManageEntity getEmployeeByEmail(String email) {
		EmployeeManageEntity employee = new EmployeeManageEntity();
		try {
			employee = (EmployeeManageEntity) queryForObject("Employee.getEmployeeByEmail", email);
			if (employee == null)
				return new EmployeeManageEntity();
		} catch (Exception ex) {
			log.error("Employee.getEmployeeByEmail", ex);
			return new EmployeeManageEntity();
		}
		return employee;
	}

	/**
	 * @description get Employee Exist email and id
	 * @author long.pham
	 * @since 2021-01-06
	 * @param email, id
	 */
	public boolean checkEmployeeEmailExist(EmployeeManageEntity dataE) {
		try {
			return (int) queryForObject("Employee.checkEmployeeEmailExist", dataE) > 0;
		} catch (Exception e) {

		}
		return true;
	}

	/**
	 * @description get Employee by email
	 * @author long.pham
	 * @since 2021-01-06
	 * @param email
	 */

	public EmployeeManageEntity getEmployeeById(int id) {
		EmployeeManageEntity employee = new EmployeeManageEntity();
		try {
			employee = (EmployeeManageEntity) queryForObject("Employee.getEmployeeById", id);
			if (employee == null)
				return new EmployeeManageEntity();
		} catch (Exception ex) {
			log.error("Employee.getEmployeeById", ex);
			return new EmployeeManageEntity();
		}
		return employee;
	}

}
