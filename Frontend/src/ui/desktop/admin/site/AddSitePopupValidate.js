/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import BaseValidate from '../../../../validator/BaseValidate';
class AddCustomerPopupValidate extends BaseValidate{
    constructor(screenMode){
        super();
        this.screenMode = screenMode;
    }
    setRule(){
        this.addRuleForField('name', 'trim', true);
        this.addRuleForField('name', 'required', true, trans.translate('validate_rule.required'));
        this.addRuleForField('name', 'maxLength', 200, trans.translate('validate_rule.maxLength_input'));

        this.addRuleForField('id_customer', 'trim', true);
        this.addRuleForField('id_customer', 'required', true, trans.translate('validate_rule.required'));

        this.addRuleForField('id_time_zone', 'trim', true);
        this.addRuleForField('id_time_zone', 'required', true, trans.translate('validate_rule.required'));

        this.addRuleForField('id_site_type', 'trim', true);
        this.addRuleForField('id_site_type', 'required', true, trans.translate('validate_rule.required'));

        this.addRuleForField('built_since', 'trim', true);
        this.addRuleForField('built_since', 'required', true, trans.translate('validate_rule.required'));

        this.addRuleForField('commissioning', 'trim', true);
        this.addRuleForField('commissioning', 'required', true, trans.translate('validate_rule.required'));

        
        this.addRuleForField('lat', 'trim', true);
        this.addRuleForField('lat', 'required', true, trans.translate('validate_rule.required'));
        this.addRuleForField('lat', 'maxLength', 20, trans.translate('validate_rule.maxLength_input'));

        this.addRuleForField('lng', 'trim', true);
        this.addRuleForField('lng', 'required', true, trans.translate('validate_rule.required'));
        this.addRuleForField('lng', 'maxLength', 20, trans.translate('validate_rule.maxLength_input'));

        this.addRuleForField('id_country', 'trim', true);
        this.addRuleForField('id_country', 'required', true, trans.translate('validate_rule.required'));
        
    }
    setAlias(){
        this.v.setAlias({
            name: trans.translate('SITE.name'),
            id_customer: trans.translate('SITE.id_customer'),
            id_time_zone: trans.translate('SITE.id_time_zone'),
            built_since: trans.translate('SITE.built_since'),
            commissioning: trans.translate('SITE.commissioning'),
            lat:  trans.translate('SITE.lat'),
            lng:  trans.translate('SITE.lng'),
            id_country:  trans.translate('SITE.id_country')
        });
    }
}
export default AddCustomerPopupValidate;