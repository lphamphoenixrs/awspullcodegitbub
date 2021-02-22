import BaseValidate from '../../validator/BaseValidate';

class ResetpasswordValidate extends BaseValidate{
    constructor(){
        super();
    }
    setRule(){
        this.addRuleForField('password', 'trim', true);
        this.addRuleForField('password', 'required', true, trans.translate('validate_rule.required'));
        this.addRuleForField('password', 'minLength', 8, trans.translate('validate_rule.minLength_input'));
        this.addRuleForField('password', 'maxLength', 20, trans.translate('validate_rule.maxLength_input'));

        this.addRuleForField('repassword', 'trim', true);
        this.addRuleForField('repassword', 'required', true, trans.translate('validate_rule.required'));
        this.addRuleForField('password', 'minLength', 8, trans.translate('validate_rule.minLength_input'));
        this.addRuleForField('repassword', 'maxLength', 20, trans.translate('validate_rule.maxLength_input'));
    }
    setAlias(){
        this.v.setAlias({
            password: trans.translate('LOGIN.password'),
            repassword: trans.translate('LOGIN.repassword')
        });
        
    }
}
export default ResetpasswordValidate;