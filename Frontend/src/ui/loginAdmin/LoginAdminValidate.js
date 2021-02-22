import BaseValidate from './../../validator/BaseValidate';

class LoginAdminValidate extends BaseValidate{
    constructor(){
        super();
    }
    setRule(){
        this.addRuleForField('user_name', 'trim', true);
        this.addRuleForField('user_name', 'required', true, trans.translate('validate_rule.required'));
        this.addRuleForField('user_name', 'type', 'email', trans.translate('validate_rule.type_email'));
        this.addRuleForField('user_name', 'maxLength', 100, trans.translate('validate_rule.maxLength_input'));

        this.addRuleForField('password', 'trim', true);
        this.addRuleForField('password', 'required', true, trans.translate('validate_rule.required'));
        this.addRuleForField('password', 'maxLength', 30, trans.translate('validate_rule.maxLength_input'));
    }
    setAlias(){
        this.v.setAlias({
            user_name: trans.translate('common.email'),
            password: trans.translate('info.password'),
        });
        
    }
}
export default LoginAdminValidate;