import BaseValidate from './BaseValidate';
class AccountingValidate extends BaseValidate {
    constructor() {
        super();
        this.data = {

        }
    }
    setRule() {
        this.addRuleForField('account_number', 'trim', true);
        this.addRuleForField('account_number', 'required', true, trans.translate('validate_rule.required'));
        this.addRuleForField('account_number', 'maxLength', 30, trans.translate('validate_rule.maxLength_input'));
      
        this.addRuleForField('account_name', 'trim', true);
        this.addRuleForField('account_name', 'required', true, trans.translate('validate_rule.required'));
        this.addRuleForField('account_name', 'maxLength', 255, trans.translate('validate_rule.maxLength_input'));

        this.addRuleForField('is_active', 'required', false, trans.translate('validate_rule.required'));
        this.addRuleForField('is_active', 'type', 'integer', trans.translate('validate_rule.type_integer'));
        this.addRuleForField('is_active', 'maxLength', 1, trans.translate('validate_rule.maxLength_input'));

    }
    setAlias() {
        this.v.setAlias({
            account_number: trans.translate('accounting.code'),
            account_name: trans.translate('accounting.name'),
            is_active: trans.translate('common.active'),

        });
    }
}
export default AccountingValidate;