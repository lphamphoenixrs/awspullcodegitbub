import BaseValidate from '../../validator/BaseValidate';

class LoginValidate extends BaseValidate{
    constructor(){
        super();
    }
    setRule(){
        this.addRuleForField('email', 'trim', true);
        this.addRuleForField('email', 'required', true, trans.translate('validate_rule.required'));
        this.addRuleForField('email', 'type', 'email', trans.translate('validate_rule.type_email'));
        this.addRuleForField('email', 'maxLength', 100, trans.translate('validate_rule.maxLength_input'));
    }
    setAlias(){
        this.v.setAlias({
            email: trans.translate('common.email')
        });
        
    }
}
export default LoginValidate;