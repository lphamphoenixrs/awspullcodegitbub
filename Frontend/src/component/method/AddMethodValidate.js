import BaseValidate from '../../validator/BaseValidate';
class AddMethodValidate extends BaseValidate{
    constructor(){
        super();
    }
    setRule(){
        this.addRuleForField('id', 'trim', true);
        this.addRuleForField('id', 'required', true, trans.translate('validate_rule.required'));
        this.addRuleForField('id', 'maxLength', 30, trans.translate('validate_rule.maxLength_input'));
        this.addRuleForField('name', 'trim', true);
        this.addRuleForField('name', 'required', true, trans.translate('validate_rule.required'));
        this.addRuleForField('name', 'maxLength', 300, trans.translate('validate_rule.maxLength_input'));
        this.addRuleForField('desc', 'trim', true);
        this.addRuleForField('desc', 'maxLength', 300, trans.translate('validate_rule.maxLength_input'));
    }
    setAlias(){
        this.v.setAlias({
            id: trans.translate('method.method_id'),
            name: trans.translate('method.method_name'),
            desc: trans.translate('common.desc')
        });
    }
}
export default AddMethodValidate;