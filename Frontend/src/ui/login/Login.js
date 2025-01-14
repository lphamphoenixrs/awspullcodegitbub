import React, { Component } from 'react';
import Constants from '../../utils/Constants';
import Libs from '../../utils/Libs';
import jwt_decode from 'jwt-decode';
import LoginValidate from './LoginValidate';
import LoginJsx from './Login.jsx';
import './Login.scss';
export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			curItem: {},
			loginMessage: null,
			lang: "en",
			grant_type: 'password',
			client_id: 'backoffice',
			customer_type: Constants.CUSTOMER_TYPE.CLIENT,
			token_type: "bearer"
		}
		this.jsxTemplate = LoginJsx;
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
		if (localStorage.getItem(Constants.COMMON.TOKEN)) {
			window.location.href = Constants.FRONT_SITE_URL.DEFAULT_PAGE
		} else {
			localStorage.removeItem(Constants.COMMON.TOKEN);
			localStorage.removeItem(Constants.COMMON.USER_INFO);
			localStorage.removeItem(Constants.COMMON.ACCESS_PARAM);
		}
	}
	/**
     * @description Called immediately after the component is mounted in the DOM. Called after the render function
     * @author long.pham 2020-08-31
     */
	componentDidMount() {
		var email = $('input[name="email"]');
		email.focus();
	}

	/**
	 * action login
	 * @author long.pham 2020-08-31
	 */
	async login() {
		let curItem = this.state.curItem,
			self = this;
		let v = new LoginValidate();
		let errors = await v.FLValidationAll(curItem);
		if (errors) {
			setValidateMessage(errors);
			return;
		}
		var http = new flHttp(true);
		let user = {
			username: curItem.user_name + ":" + this.state.customer_type,
			password: Libs.md5(curItem.password),
			grant_type: this.state.grant_type,
			client_id: this.state.client_id,
			token_type: this.state.token_type,
			customer_type: this.state.customer_type
		};
		http.post('oauth/token?grant_type=' + user.grant_type + '&username=' + user.username + '&password=' + user.password + '&client_id=' + user.client_id + '&token_type=' + user.token_type + "&customer_type="+user.customer_type, user, function (status, rs) {
			if (status) {
				if (!Libs.isBlank(rs.error)) {
					self.setState({
						loginMessage: trans.translate('LOGIN.err_login_msg')
					});
					return;
				}
				var decoded = jwt_decode(rs.access_token);
				var param = {
					token: rs.access_token,
					data: decoded,
					permissions: decoded.authorities,
					user_name: decoded.user_name,
					first_name: decoded.first_name,
					last_name: decoded.last_name,
					timeout: decoded.exp,
					role: decoded.authorities,
					id_user: decoded.id_user,
					logo: decoded.logo,
					customer_type: Constants.CUSTOMER_TYPE.CLIENT,
				};
				self.setAccessParam(param);
				return;
			} else {
				self.setState({
					loginMessage: trans.translate('LOGIN.err_login_msg'),
				});
			}
		});
	}

	/**
	 * set staff login parameters to localstore
	 * @author long.pham 2020-08-31
	 * @param {object} param 
	 */
	setAccessParam(param) {
		let token = param.token;
		localStorage.setItem(Constants.COMMON.TOKEN, token);
		let jsonPermissions = JSON.stringify(param.permissions);
		localStorage.setItem(Constants.COMMON.ACCESS_PARAM, Libs.base64Encrypt(jsonPermissions));
		let info = {
			user_name: param.user_name,
			fullname: param.first_name +" "+ param.last_name,
			id_user: param.id_user,
			timeout: param.timeout,
			id_roles: param.id_roles,
			logo: param.logo,
			customer_type: param.customer_type,
		}
		let jsonCustomer = JSON.stringify(info);
		localStorage.setItem(Constants.COMMON.USER_INFO, Libs.base64Encrypt(jsonCustomer));
		window.location.href = Constants.FRONT_SITE_URL.DEFAULT_PAGE;
	}


	/**
	 * If keycode is 13 will proceed to login
	 * @author long.pham 2020-08-31
	 * @param {*} e 
	 */
	onPasswordKeyPress(e) {
		if (e.which == 13) {
			this.login();
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
			let v = new LoginValidate();
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
			loginMessage: null
		});
	}
}