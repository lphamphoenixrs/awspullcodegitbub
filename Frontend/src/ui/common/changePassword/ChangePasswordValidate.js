import BaseValidate from '../../../validator/BaseValidate';
class ChangePasswordValidate extends BaseValidate{
    constructor(){
        super();
    }
    setRule(){

        this.addRuleForField('password', 'trim', true);
        this.addRuleForField('password', 'required', true, trans.translate('validate_rule.required'));
        this.addRuleForField('password', 'maxLength', 30, trans.translate('validate_rule.maxLength_input'));
        this.addRuleForField('password', 'minLength', 8, trans.translate('validate_rule.minLength_input'));

        this.addRuleForField('old_password', 'trim', true);
        this.addRuleForField('old_password', 'required', true, trans.translate('validate_rule.required'));
        this.addRuleForField('old_password', 'maxLength', 30, trans.translate('validate_rule.maxLength_input'));
        this.addRuleForField('old_password', 'minLength', 8, trans.translate('validate_rule.minLength_input'));

        this.addRuleForField('password_confirm', 'trim', true);
        this.addRuleForField('password_confirm', 'required', true, trans.translate('validate_rule.required'));
        this.addRuleForField('password_confirm', 'maxLength', 20, trans.translate('validate_rule.maxLength_input'));
        this.addRuleForField('password_confirm', 'minLength', 8, trans.translate('validate_rule.minLength_input'));


    }
    setAlias(){
        this.v.setAlias({
            password: trans.translate('LOGIN.password'),
            password_confirm: trans.translate('LOGIN.password_confirm'),
            old_password: trans.translate('LOGIN.old_password')
        });
    }
}
export default ChangePasswordValidate;