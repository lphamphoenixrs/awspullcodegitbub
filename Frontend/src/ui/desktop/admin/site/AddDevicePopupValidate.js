/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/

import BaseValidate from '../../../../validator/BaseValidate';
class AddDevicePopupValidate extends BaseValidate{
    constructor(){
        super();
    }
    setRule(){
        this.addRuleForField('id_vendor', 'trim', true);
        this.addRuleForField('id_vendor', 'required', true, trans.translate('validate_rule.required'));

        this.addRuleForField('id_device_type', 'trim', true);
        this.addRuleForField('id_device_type', 'required', true, trans.translate('validate_rule.required'));

        this.addRuleForField('id_device_group', 'trim', true);
        this.addRuleForField('id_device_group', 'required', true, trans.translate('validate_rule.required'));

        this.addRuleForField('serial_number', 'trim', true);
        this.addRuleForField('serial_number', 'required', true, trans.translate('validate_rule.required'));
        this.addRuleForField('serial_number', 'maxLength', 20, trans.translate('validate_rule.maxLength_input'));

        this.addRuleForField('modbusdevicenumber', 'trim', true);
        this.addRuleForField('modbusdevicenumber', 'required', true, trans.translate('validate_rule.required'));
        this.addRuleForField('modbusdevicenumber', 'maxLength', 20, trans.translate('validate_rule.maxLength_input'));

        this.addRuleForField('devicename', 'trim', true);
        this.addRuleForField('devicename', 'required', true, trans.translate('validate_rule.required'));
        this.addRuleForField('devicename', 'maxLength', 100, trans.translate('validate_rule.maxLength_input'));

        this.addRuleForField('devicetype', 'trim', true);
        this.addRuleForField('devicetype', 'required', true, trans.translate('validate_rule.required'));
        this.addRuleForField('devicetype', 'maxLength', 100, trans.translate('validate_rule.maxLength_input'));
        
    }
    setAlias(){
        this.v.setAlias({
            id_vendor: trans.translate('SITE.id_vendor'),
            id_device_type: trans.translate('SITE.id_device_type'),
            id_device_group: trans.translate('SITE.id_device_group'),
            serial_number: trans.translate('SITE.serial_number'),
            modbusdevicenumber: trans.translate('SITE.modbusdevicenumber'),
            devicename:  trans.translate('SITE.devicename'),
            devicetype:  trans.translate('SITE.devicetype')
        });
    }
}
export default AddDevicePopupValidate;