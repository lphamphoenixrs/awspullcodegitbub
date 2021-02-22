import React from 'react';
import Modal from 'react-bootstrap4-modal';
import { RPassword } from '../../../component/Controls';

export default function () {
  var { curItem } = this.state;
  return (
    <React.Fragment>
      <Modal visible={true} className="payment" dialogClassName="modal-dialog modal-small modal-dialog-scrollable">
        <div className="modal-header">
          <h5 className="modal-title">{trans.translate("LOGIN.change_password")}</h5>
          <button type="button" onClick={this.props.onCloseChangePassword.bind(this)} className="bootbox-close-button close" data-dismiss="modal" aria-hidden="true">×</button>
        </div>
        <div className="modal-body">
          <div className="content">

            <div className="form-group">
              <RPassword
                label={trans.translate('LOGIN.old_password')}
                required="required"
                inputId="old_password"
                inputName="old_password"
                inputClass="form-control"
                value={curItem.old_password}
                onChange={(e) => { this.handleInputChange(e); this.validateOne.bind(e) }}
                maxLength={20}
                minLength={8}
                onBlur={(e) => { this.handleInputChange(e); this.validateOne.bind(e) }}
                autoComplete="new-password"
              />
            </div>


            <div className="form-group">
              <RPassword
                label={trans.translate('LOGIN.new_password')}
                required="required"
                inputId="password"
                inputName="password"
                inputClass="form-control"
                value={curItem.password}
                onChange={(e) => { this.handleInputChange(e); this.validateOne.bind(e) }}
                maxLength={20}
                minLength={8}
                onBlur={(e) => { this.handleInputChange(e); this.validateOne.bind(e) }}
                autoComplete="new-password"
              />
            </div>

            <div className="form-group">
              <RPassword
                label={trans.translate('LOGIN.repassword')}
                required="required"
                inputId="password_confirm"
                inputName="password_confirm"
                inputClass="form-control"
                value={curItem.password_confirm}
                onChange={(e) => { this.handleInputChange(e); this.validateOne.bind(e) }}
                maxLength={20}
                minLength={8}
                onBlur={(e) => { this.handleInputChange(e); this.validateOne.bind(e) }}
                autoComplete="new-password"
                onKeyPress={(e) => { this.handRegisterEnterChange(e); }}
              />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={this.onSaveChangePassword.bind(this)} type="button" className="btn btn-save">{trans.translate("LOGIN.submit")}</button>
        </div>

      </Modal>
    </React.Fragment>
  )
}