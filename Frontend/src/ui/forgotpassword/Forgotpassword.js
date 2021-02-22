import React, { Component } from 'react';
import Constants from '../../utils/Constants';
import Libs from '../../utils/Libs';
import ForgotPasswordValidate from './ForgotpasswordValidate';
import ForgotpasswordJsx from './Forgotpassword.jsx';
import './Forgotpassword.scss';
export default class ForgotPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			curItem: {},
			message: null,
			status: false
		}
		this.jsxTemplate = ForgotpasswordJsx;
		this.handleInputChange = this.handleInputChange.bind(this);

	}

	/**
	 * @description default function reactJS
	 * @author long.pham 2020-08-31
	 */
	render() {
		if (!localStorage.getItem(Constants.COMMON.TOKEN)) {
			return this.jsxTemplate.call(this);
		}
		return null;
	}

	/**
     * @description When a component is rendered the first time, componentWillMount will be called before rendering
     * @author long.pham 2020-08-31
     */
	async componentWillMount() {
		localStorage.removeItem(Constants.COMMON.TOKEN);
		localStorage.removeItem(Constants.COMMON.USER_INFO);
		localStorage.removeItem(Constants.COMMON.ACCESS_PARAM);
	}
	/**
     * @description Called immediately after the component is mounted in the DOM. Called after the render function
     * @author long.pham 2020-08-31
     */
	componentDidMount() {
		var email = $('input[name="email"]');
		email.focus();
	}



	async onSubmit() {
		let self = this;
		let curItem = this.state.curItem;
		let v = new ForgotPasswordValidate();
		let errors = await v.FLValidationAll(curItem);
		if (errors) {
			setValidateMessage(errors);
			return;
		}
		var http = new flHttp(true);
		http.post(Constants.URL.FORGOT_PASSWORD, curItem, function (status, rs) {
			if (status && rs.status) {
				if (!Libs.isBlank(rs.mess)) {
					self.setState({
						status: true,
						message: Libs.stringAssign(trans.translate('LOGIN.checked_email_msg') , [curItem.email])
					});
					return;
				}

				return;
			} else {
				setValidateMessage({ email: trans.translate('LOGIN.email_not_exits') }, true); return;
			}
		});
	}

	/**
	 * If keycode is 13 will proceed to login
	 * @author long.pham 2020-08-31
	 * @param {*} e 
	 */
	onPasswordKeyPress(e) {
		if (e.which == 13) {
			this.onSubmit();
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
			let v = new ForgotPasswordValidate();
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
			message: null
		});
	}
}