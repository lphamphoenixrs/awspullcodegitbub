import React from 'react';
import {RButton, RPassword } from '../../component/Controls';

export default function () {
	var { curItem, message } = this.state;
	return (
		<React.Fragment>
			<div className="main-login">
				<div className="login-header">

				</div>
				{message == true ? <div className="messge-login">
					<span onClick={this.closeMessage.bind(this)} className="close">&times;</span>
					{message}
				</div> : ''}
				<div className="box-login">

					<div className="title">
						{trans.translate('LOGIN.resetpassword_title')}
					</div>
					<div className="login-box-body">

						<div className="form-group">
							<RPassword
								label={trans.translate('LOGIN.new_password')}
								required="required"
								inputClass="form-control"
								inputId="password"
								inputName="password"
								value={curItem.password}
								onChange={(e) => { this.handleInputChange(e); this.validateOne(e) }}
								onKeyPress={(e) => { this.onPasswordKeyPress(e) }}
							/>
						</div>
						<div className="form-group">
							<RPassword
								label={trans.translate('LOGIN.repassword')}
								required="required"
								inputClass="form-control"
								inputId="repassword"
								inputName="repassword"
								value={curItem.repassword}
								onChange={(e) => { this.handleInputChange(e); this.validateOne(e) }}
								onKeyPress={(e) => { this.onPasswordKeyPress(e) }}
							/>
						</div>

						<div className="row">
							<div className="col-xl-12">
								<RButton className="btn btn-primary btn-app float-right"
									onClick={this.onSave.bind(this)}
									text={trans.translate('LOGIN.submit')}
									title={trans.translate('LOGIN.submit')} />
							</div>
						</div>
					</div>
				</div>
			</div>

		</React.Fragment >
	)
}