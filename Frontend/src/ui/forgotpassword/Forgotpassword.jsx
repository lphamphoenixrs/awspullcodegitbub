import React from 'react';
import { RText, RButton } from '../../component/Controls';

export default function () {
	var { curItem, message, status } = this.state;
	return (
		<React.Fragment>
			<div className="main-login">
				<div className="login-header">

				</div>
				
				<div className="box-login">

					<div className="title">
						{status ? trans.translate('LOGIN.forgot_ok') : trans.translate('LOGIN.forgotpassword_title')}
					</div>
					{status ?
					<div className="login-box-body"> {message} </div>
					:
						<div className="login-box-body">

							<div className="form-group">
								<RText
									label={trans.translate('LOGIN.forgotpassword_email')}
									required="required"
									inputClass="form-control"
									inputId="email"
									inputName="email"
									value={curItem.email}
									onChange={(e) => { this.handleInputChange(e); this.validateOne(e) }}
								/>
							</div>


							<div className="row">
								<div className="col-xl-12">
									<RButton className="btn btn-primary btn-app float-right"
										onClick={this.onSubmit.bind(this)}
										text={trans.translate('LOGIN.submit')}
										title={trans.translate('LOGIN.submit')} />
								</div>
							</div>
						</div>
					}


				</div>
			</div>

		</React.Fragment >
	)
}