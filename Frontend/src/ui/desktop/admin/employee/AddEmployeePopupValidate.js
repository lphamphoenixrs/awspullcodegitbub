import BaseValidate from '../../../../validator/BaseValidate';
class AddCustomerPopupValidate extends BaseValidate{
    constructor(screenMode){
        super();
        this.screenMode = screenMode;
    }
    setRule(){
        this.addRuleForField('first_name', 'trim', true);
        this.addRuleForField('first_name', 'required', true, trans.translate('validate_rule.required'));
        this.addRuleForField('first_name', 'maxLength', 100, trans.translate('validate_rule.maxLength_input'));

        this.addRuleForField('last_name', 'trim', true);
        this.addRuleForField('last_name', 'required', true, trans.translate('validate_rule.required'));
        this.addRuleForField('last_name', 'maxLength', 100, trans.translate('validate_rule.maxLength_input'));

        this.addRuleForField('email', 'trim', true);
        this.addRuleForField('email', 'required', true, trans.translate('validate_rule.required'));
        this.addRuleForField('email', 'type', 'email', trans.translate('validate_rule.type_email'));
        this.addRuleForField('email', 'maxLength', 100, trans.translate('validate_rule.maxLength_input'));

        this.addRuleForField('phone', 'trim', true);
        this.addRuleForField('phone', 'required', true, trans.translate('validate_rule.required'));
        this.addRuleForField('phone', 'maxLength', 20, trans.translate('validate_rule.maxLength_input'));

        if(this.screenMode == Constants.SCREEN_MODE.ADD){
            this.addRuleForField('password', 'trim', true);
            this.addRuleForField('password', 'required', true, trans.translate('validate_rule.required'));
            this.addRuleForField('password', 'maxLength', 20, trans.translate('validate_rule.maxLength_input'));
            this.addRuleForField('password', 'minLength', 8, trans.translate('validate_rule.minLength_input'));
        }
        

    }
    setAlias(){
        this.v.setAlias({
            first_name: trans.translate('EMPLOYEE.first_name'),
            last_name: trans.translate('EMPLOYEE.last_name'),
            email: trans.translate('EMPLOYEE.email'),
            password: trans.translate('EMPLOYEE.password'),
            phone: trans.translate('EMPLOYEE.phone')
        });
    }
}
export default AddCustomerPopupValidate;