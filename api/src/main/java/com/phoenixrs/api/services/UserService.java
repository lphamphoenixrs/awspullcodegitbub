/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
package com.phoenixrs.api.services;

import com.phoenixrs.api.DBManagers.DB;
//import com.phoenixrs.api.entities.CompanyEntity;
//import com.phoenixrs.api.entities.CustomerEntity;
import com.phoenixrs.api.entities.UserEntity;
import com.phoenixrs.api.entities.AccountEntity;

public class UserService extends DB {

	/**
	 * @description get user by username
	 * @author long.pham
	 * @since 2020-09-03
	 * @param
	 */
	public UserEntity getUserByUserName(String userName) {
		UserEntity user = new UserEntity();
		try {
			user = (UserEntity) queryForObject("User.findByLoginId", userName);
			if (user == null)
				return new UserEntity();
		} catch (Exception ex) {
			return new UserEntity();
		}
		return user;
	}

	/**
	 * @description get user by email
	 * @author long.pham
	 * @since 2020-09-03
	 * @param
	 */

	public UserEntity getUserByEmail(String email) {
		UserEntity user = new UserEntity();
		try {
			user = (UserEntity) queryForObject("User.getUserByEmail", email);
			if (user == null)
				return new UserEntity();
		} catch (Exception ex) {
			log.error("User.getUserByEmail", ex);
			return new UserEntity();
		}
		return user;
	}

	/**
	 * @description get user by id
	 * @author long.pham
	 * @since 2020-09-03
	 * @param
	 */

	public AccountEntity getUserById(int id) {
		AccountEntity user = new AccountEntity();
		try {
			user = (AccountEntity) queryForObject("User.getUserById", id);
			if (user == null)
				return new AccountEntity();
		} catch (Exception ex) {
			log.error("User.getUserById", ex);
			return new AccountEntity();
		}
		return user;
	}

	/**
	 * @description reset password
	 * @author long.pham
	 * @since 2020-09-03
	 * @param
	 */
	public boolean resetPassword(AccountEntity obj) {
		try {
			return update("User.resetPassword", obj) > 0;
		} catch (Exception ex) {
			log.error("User.resetPassword", ex);
			return false;
		}
	}

	/**
	 * @description change password
	 * @author long.pham
	 * @since 2020-09-03
	 * @param
	 */

	public boolean updateChangePassword(AccountEntity obj) {
		try {
			return update("User.updateChangePassword", obj) > 0;
		} catch (Exception ex) {
			log.error("User.updateChangePassword", ex);
			return false;
		}
	}

	/**
	 * @description get user by id
	 * @author long.pham
	 * @since 2020-09-03
	 * @param
	 */

	public AccountEntity getUserAdminById(int id) {
		AccountEntity user = new AccountEntity();
		try {
			user = (AccountEntity) queryForObject("User.getUserAdminById", id);
			if (user == null)
				return new AccountEntity();
		} catch (Exception ex) {
			log.error("User.getUserAdminById", ex);
			return new AccountEntity();
		}
		return user;
	}
	
	/**
	 * @description admin change password
	 * @author long.pham
	 * @since 2020-09-03
	 * @param
	 */

	public boolean updateAdminChangePassword(AccountEntity obj) {
		try {
			return update("User.updateAdminChangePassword", obj) > 0;
		} catch (Exception ex) {
			log.error("User.updateAdminChangePassword", ex);
			return false;
		}
	}
	
}
