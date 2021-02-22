/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
package com.phoenixrs.api.controllers;

import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.phoenixrs.api.entities.UserEntity;
import com.phoenixrs.api.entities.AccountEntity;
import com.phoenixrs.api.services.UserService;
import com.phoenixrs.api.utils.Constants;
import com.phoenixrs.api.utils.Lib;
import com.phoenixrs.api.utils.SendMail;
import com.phoenixrs.api.utils.Translator;

import springfox.documentation.annotations.ApiIgnore;

@RestController
@ApiIgnore
@RequestMapping("/user")
public class UserController extends BaseController {

	@PostMapping("/forgotpassword")
	public Object ForgotPassword(@RequestBody UserEntity obj) {
		try {
			UserService service = new UserService();
			UserEntity getUserByEmail = service.getUserByEmail(obj.getEmail());
			if (getUserByEmail.getId() > 0) {
				Calendar cal = Calendar.getInstance(TimeZone.getDefault());
				int expiredTime = Lib.strToInteger(
						Lib.getReourcePropValue(Constants.appConfigFileName, Constants.RESETPASSW_EXPIRED_TIME_KEY));
				cal.add(Calendar.MINUTE, expiredTime);
				Date now = cal.getTime();
				String strExpired = Lib.DateToString(now);
				String link = Lib.getReourcePropValue(Constants.mailConfigFileName, Constants.mailResetPassword);
				String mailFromContact = Lib.getReourcePropValue(Constants.mailConfigFileName,
						Constants.mailFromContact);

				String msgTemplate = Constants.getMailTempleteByState(12);
				String fullname = getUserByEmail.getFirst_name() + " " + getUserByEmail.getLast_name();
				link += "" + secretCard.encrypt(Integer.toString(getUserByEmail.getId())) + "."
						+ secretCard.encrypt(strExpired);
				String logoURL = Constants.logoURL;
				String body = String.format(msgTemplate, logoURL, fullname, link, "");
				String mailTo = obj.getEmail();
				String subject = Constants.getMailSubjectByState(12);

				String tags = "reset_password";
				boolean flagSent = SendMail.mailCritsend(mailFromContact, mailTo, subject, body, tags);

				if (!flagSent) {
					throw new Exception(Translator.toLocale(Constants.SEND_MAIL_ERROR_MSG));
				}
				return this.jsonResult(true, Constants.SAVE_SUCCESS_MSG, null, 0);
			} else {
				return this.jsonResult(false, Constants.EMAIL_NOT_EXIST, null, 0);
			}

		} catch (Exception e) {
			// log error
			return this.jsonResult(false, Constants.UPDATE_ERROR_MSG, e, 0);
		}
	}

	@PostMapping("/check-hash-by-user")
	public Object checkHashByUser(@RequestBody AccountEntity obj) {
		try {
			UserService service = new UserService();

			if (!Lib.isBlank(obj.getHash_id_user())) {
				String hashId = obj.getHash_id_user();
				if (Lib.isBlank(hashId)) {
					return this.jsonResult(false, Constants.UPDATE_ERROR_MSG, null, 0);
				}
				String[] hashArr = hashId.split("[.]");

				String strExpiredTime = secretCard.decrypt(hashArr[1]);
				if (Lib.isBlank(strExpiredTime)) {
					return this.jsonResult(false, Constants.LINK_EXPIRED_ERROR_MSG, null, 0);
				}

				Date expiredTime = Lib.StringToDate(strExpiredTime, "yyyy/MM/dd HH:mm:ss");
				if (expiredTime.before(new Date())) {
					return this.jsonResult(false, Constants.LINK_EXPIRED_ERROR_MSG, null, 0);
				}

				if (hashArr.length == 2) {
					String id_user = secretCard.decrypt(hashArr[0]);
					obj.setId(Integer.parseInt(id_user));
					AccountEntity getUserById = service.getUserById(Integer.parseInt(id_user));
					if (getUserById != null) {
						return this.jsonResult(true, Constants.USER_EXIST, obj, 1);
					} else {
						return this.jsonResult(false, null, null, 0);
					}

				} else {
					return this.jsonResult(false, Constants.UPDATE_ERROR_MSG, null, 0);
				}
			} else {
				return this.jsonResult(false, Constants.UPDATE_ERROR_MSG, null, 0);
			}

		} catch (Exception e) {
			// log error
			return this.jsonResult(false, Constants.UPDATE_ERROR_MSG, e, 0);
		}
	}

	@PostMapping("/resetpassword")
	public Object resetPassword(@RequestBody AccountEntity obj) {
		try {
			UserService service = new UserService();

			if (!Lib.isBlank(obj.getHash_id_user())) {
				String hashId = obj.getHash_id_user();
				if (Lib.isBlank(hashId)) {
					return this.jsonResult(false, Constants.UPDATE_ERROR_MSG, null, 0);
				}
				String[] hashArr = hashId.split("[.]");

				String strExpiredTime = secretCard.decrypt(hashArr[1]);
				if (Lib.isBlank(strExpiredTime)) {
					return this.jsonResult(false, Constants.LINK_EXPIRED_ERROR_MSG, null, 0);
				}
				Date expiredTime = Lib.StringToDate(strExpiredTime, "yyyy/MM/dd HH:mm:ss");
				if (expiredTime.before(new Date())) {
					return this.jsonResult(false, Constants.LINK_EXPIRED_ERROR_MSG, null, 0);
				}
				if (hashArr.length == 2) {
					String id_user = secretCard.decrypt(hashArr[0]);
					obj.setId(Integer.parseInt(id_user));
					service.resetPassword(obj);
					return this.jsonResult(true, Constants.CHANGE_PASSWORD_SUCCESS_MSG, obj, 1);
				} else {
					return this.jsonResult(false, Constants.UPDATE_ERROR_MSG, null, 0);
				}
			} else {
				return this.jsonResult(false, Constants.UPDATE_ERROR_MSG, null, 0);
			}

		} catch (Exception e) {
			// log error
			return this.jsonResult(false, Constants.UPDATE_ERROR_MSG, e, 0);
		}
	}

	/**
	 * @description Update change password
	 * @author long.pham
	 * @since 2020-09-03 Param id, email, password
	 */
	@PostMapping("/changepassword")
	public Object changePassword(@RequestBody AccountEntity obj) {
		try {
			UserService service = new UserService();
			AccountEntity dataCurrentUser = service.getUserById((int) obj.getId());
			String oldPassword = obj.getOld_password();
			if (!oldPassword.equals(dataCurrentUser.getPassword())) {
				return this.jsonResult(false, Constants.PASSWORD_OLD_ERROR_MSG, null, 0);
			} 
			
			if (obj.getPassword() == "" || obj.getPassword() == null) {
				obj.setPassword(dataCurrentUser.getPassword());
			}

			service.updateChangePassword(obj);
			return this.jsonResult(true, Constants.CHANGE_PASSWORD_SUCCESS_MSG, obj, 1);
		} catch (Exception e) {
			// log error
			return this.jsonResult(false, Constants.GET_ERROR_MSG, e, 0);
		}
	}
	
	/**
	 * @description Update change password
	 * @author long.pham
	 * @since 2020-09-03 Param id, email, password
	 */
	@PostMapping("/admin-change-password")
	public Object adminChangePassword(@RequestBody AccountEntity obj) {
		try {
			UserService service = new UserService();
			AccountEntity dataCurrentUserAdmin = service.getUserAdminById((int) obj.getId());
			String oldPassword = obj.getOld_password();
			if (!oldPassword.equals(dataCurrentUserAdmin.getPassword())) {
				return this.jsonResult(false, Constants.PASSWORD_OLD_ERROR_MSG, null, 0);
			} 
			
			if (obj.getPassword() == "" || obj.getPassword() == null) {
				obj.setPassword(dataCurrentUserAdmin.getPassword());
			}

			service.updateAdminChangePassword(obj);
			return this.jsonResult(true, Constants.CHANGE_PASSWORD_SUCCESS_MSG, obj, 1);
		} catch (Exception e) {
			// log error
			return this.jsonResult(false, Constants.GET_ERROR_MSG, e, 0);
		}
	}

}
