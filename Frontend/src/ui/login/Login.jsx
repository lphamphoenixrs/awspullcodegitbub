import React from 'react';
import { RText, RButton, RPassword } from '../../component/Controls';

export default function () {
	var { curItem } = this.state;
	return (
		<React.Fragment>
			<div className="main-login">
				<div className="login-header"></div>
				{this.state.loginMessage ? <div className="messge-login">
					<span onClick={this.closeMessage.bind(this)} className="close">&times;</span>
					{this.state.loginMessage}
				</div> : ''}
				<div className="box-login">

					<div className="title">
						{trans.translate('LOGIN.title')}
					</div>
					<div className="login-box-body">
						<div className="form-group">
							<RText
								label={trans.translate('LOGIN.email')}
								required="required"
								inputClass="form-control"
								inputId="user_name"
								inputName="user_name"
								value={curItem.user_name}
								onChange={(e) => { this.handleInputChange(e); this.validateOne(e) }}
							/>
						</div>
						<div className="form-group">
							<RPassword
								label={trans.translate('LOGIN.password')}
								required="required"
								inputClass="form-control"
								inputId="password"
								inputName="password"
								value={curItem.password}
								onChange={(e) => { this.handleInputChange(e); this.validateOne(e) }}
								onKeyPress={(e) => { this.onPasswordKeyPress(e) }}
							/>
						</div>

						<div className="form-group text-right">
							<a href="/forgot-password">{trans.translate('LOGIN.forgot_password')}</a>
						</div>

						<div className="row">
							<div className="col-xl-12">
								<RButton className="btn btn-primary btn-app float-right"
									onClick={() => this.login()}
									text={trans.translate('LOGIN.login')}
									title={trans.translate('LOGIN.login')} />
							</div>
						</div>
					</div>
				</div>
			</div>

		</React.Fragment >
	)
}