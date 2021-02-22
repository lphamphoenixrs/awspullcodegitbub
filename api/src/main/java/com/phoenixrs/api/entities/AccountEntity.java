/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
package com.phoenixrs.api.entities;

import java.util.Date;

public class AccountEntity {
	private int id;
	private String password;
	private String first_name;
	private String last_name;
	private String email;
	private String birthday;
	private String avatar;
	private String status;
	private String is_delete;
	private Date created_date;
	private String updated_date;
	private String hash_id_user;
	private String old_password;
	private String customer_type;
	
	public String getOld_password() {
		return old_password;
	}
	public void setOld_password(String old_password) {
		this.old_password = old_password;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getFirst_name() {
		return first_name;
	}
	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}
	public String getLast_name() {
		return last_name;
	}
	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getBirthday() {
		return birthday;
	}
	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}
	public String getAvatar() {
		return avatar;
	}
	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getIs_delete() {
		return is_delete;
	}
	public void setIs_delete(String is_delete) {
		this.is_delete = is_delete;
	}
	public Date getCreated_date() {
		return created_date;
	}
	public void setCreated_date(Date created_date) {
		this.created_date = created_date;
	}
	public String getUpdated_date() {
		return updated_date;
	}
	public void setUpdated_date(String updated_date) {
		this.updated_date = updated_date;
	}
	public String getHash_id_user() {
		return hash_id_user;
	}
	public void setHash_id_user(String hash_id_user) {
		this.hash_id_user = hash_id_user;
	}
	/**
	 * @return the customer_type
	 */
	public String getCustomer_type() {
		return customer_type;
	}
	/**
	 * @param customer_type the customer_type to set
	 */
	public void setCustomer_type(String customer_type) {
		this.customer_type = customer_type;
	}
	
	
}
