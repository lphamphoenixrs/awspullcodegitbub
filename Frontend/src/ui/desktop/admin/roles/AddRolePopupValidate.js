import BaseValidate from '../../../../validator/BaseValidate';
class AddRolePopupValidate extends BaseValidate{
    constructor(){
        super();
    }
    setRule(){
        this.addRuleForField('name', 'trim', true);
        this.addRuleForField('name', 'required', true, trans.translate('validate_rule.required'));
        this.addRuleForField('name', 'maxLength', 100, trans.translate('validate_rule.maxLength_input'));
    }
    setAlias(){
        this.v.setAlias({
            name: trans.translate('ROLE.name')
        });
    }
}
export default AddRolePopupValidate;