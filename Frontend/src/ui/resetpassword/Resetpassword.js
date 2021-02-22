import React, { Component } from 'react';
import Constants from '../../utils/Constants';
import Libs from '../../utils/Libs';
import ResetpasswordValidate from './ResetpasswordValidate';
import ResetpasswordJsx from './Resetpassword.jsx';
import LoginService from "../../services/LoginService";
import './Resetpassword.scss';
import cloneDeep from 'lodash-es/cloneDeep';

export default class Resetpassword extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			curItem: {},
			isShowMessage: false,
			message: null
		}
		this.jsxTemplate = ResetpasswordJsx;
		this.handleInputChange = this.handleInputChange.bind(this);

	}

	/**
     * @description Called immediately after the component is mounted in the DOM. Called after the render function
     * @author long.pham 2020-08-31
     */
	componentDidMount() {
		if (this.user) { this.props.baseParam.history.push('/'); return; }
		this.checkUserByHash();
	}

	/**
	 * @description default function reactJS
	 * @author long.pham 2020-08-31
	 */
	render() {
		return this.jsxTemplate.call(this);
	}


	/**
   * @description save user info
   */
	async checkUserByHash() {
		let params = this.state.curItem;

		var pathname = window.location.pathname;
		var hash_id_user = pathname.replace("/reset-password/", "");

		if (Libs.isBlank(hash_id_user)) {
			window.location.href = Constants.FRONT_SITE_URL.LOGIN; return;
		} else {
			params.hash_id_user = hash_id_user;
		}

		LoginService.instance.checkUserByHash(params, function (status, data, msg) {
			if (Libs.isObjectEmpty(data)) {
				window.location.href = Constants.FRONT_SITE_URL.LOGIN; return;
			}
		}, true);
	}


	async onSave() {
		var curItem = this.state.curItem, self = this;
		let param = cloneDeep(this.state.curItem);
		let v = new ResetpasswordValidate();
		let errors = await v.FLValidationAll(curItem);
		var errorState = false;
		if (errors) {
			setValidateMessage(errors);
			errorState = true;
		}

		// const regexp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;
		// if (Libs.isBlank(param.password) || param.password.length < 6 || regexp.exec(param1.password) == null) {
		if (Libs.isBlank(param.password) || param.password.length < 8) {
			setValidateMessage({ password: trans.translate('LOGIN.password_valid_min_8character') }, true);
			errorState = true;
		} else {
			setValidateMessage({ password: '' }, true);
		}

		if (param.password != param.repassword) {
			setValidateMessage({ repassword: trans.translate('LOGIN.password_incorrect') }, true);
			errorState = true;
		} else {
			setValidateMessage({ repassword: '' }, true);
		}

		if (errorState) { return; }
		//remove message validation
		removeAllValidateMessage();
		var pathname = window.location.pathname;
		param.hash_id_user = pathname.replace("/reset-password/", "");
		param.password = Libs.md5(param.password);

		LoginService.instance.resetPassword(param, function (status, data, msg) {
			if (status) {
				self.setState({
					curItem: {}
				});
				setTimeout(function () {
					window.location.href = Constants.FRONT_SITE_URL.LOGIN;
				}.bind(this), 1000);
			} else if (!Libs.isBlank(msg)) {
				self.setState({
					message: msg
				})
			}
		}, true);
	}

	/**
	 * If keycode is 13 will proceed to login
	 * @author long.pham 2020-08-31
	 * @param {*} e 
	 */
	onPasswordKeyPress(e) {
		if (e.which == 13) {
			this.onSave();
		}
	}

	/**
	 * @description validate a field input
	 * @author long.pham 2020-08-31
	 * @param {*} event 
	 */
	async validateOne(event) {
		let target = event.target;
		let name = target.name;
		let value = target.value
		if (name) {
			let param = {
				[name]: value
			}
			let v = new ResetpasswordValidate();
			let error = await v.validateOne(param, name);
			if (error != null) {
				setValidateMessage(error, true);
			}
		}
	}

	/**
     * setValue method to Input
     * @author long.pham 2020-08-31
     */
	handleInputChange(event) {
		let target = event.target;
		let name = target.name;
		let value = target.value;
		if (name) {
			let curItem = this.state.curItem;
			curItem[name] = value;
			this.setState({
				curItem: curItem
			});
		}
	}
	/**
     * @description close message 
     * @author long.pham 2020-08-31
     */
	closeMessage() {
		this.setState({
			isShowMessage: false
		});
	}
}