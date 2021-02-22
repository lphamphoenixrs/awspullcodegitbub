import React from 'react';
import Libs from '../utils/Libs';
export const RSwitch = (props) => (
    <React.Fragment>
        {(props.label != "" && typeof props.label != 'undefined') ?
            <label className="control-label">
                {trans.translate(props.label)}
            </label>
            : null}
        <div className="switch">
            <label>
                <input id={props.inputId} type="checkbox" name={props.inputName}
                    onChange={props.onChange} disabled={props.disabled} onKeyPress={Libs.rEnter}
                    checked={(props.checked == 1) ? true : false}
                />
                <span className="lever switch-col-darkblue" />
            </label>
        </div>
    </React.Fragment>
)

export const RCheckbox = (props) => (
    <React.Fragment>
        <input
            id={props.inputId}
            type="checkbox"
            name={props.inputName}
            className={props.inputClass != null && typeof props.inputClass != undefined ? props.inputClass :
                "filled-in chk-col-blue"}
            onChange={props.onChange}
            onClick={props.onClick}
            disabled={!Libs.isBlank(props.disabled) ? props.disabled : false}
            readOnly={!Libs.isBlank(props.readOnly) ? props.readOnly : false}
            onKeyPress={Libs.rEnter}
            value={props.value}
            checked={(props.checked == 1) ? true : false}
        />
        <label htmlFor={props.inputId} className={"chkbox-gray-border " + (props.labelClass ? props.labelClass : "")}>
            {(props.label != "" && typeof props.label != 'undefined') && trans.translate(props.label)}
        </label>
    </React.Fragment>
)


export const RText = (props) => (
    <React.Fragment>
        {(props.label != "" && typeof props.label != 'undefined') &&
            <label className="control-label">{trans.translate(props.label)}
                {props.required == 'required' ? <span className="required">*</span> : null}
            </label>}
        {props.labelIcon && 
            <i className={props.iconClass} onClick={props.iconClick} aria-hidden="true"></i>
        }
        <input id={props.inputId ? props.inputId : null}
            style={props.style ? props.style : null}
            className={props.inputClass}
            name={props.inputName}
            maxLength={typeof props.maxLength !== 'undefined' ? props.maxLength : null}
            value={props.value == null || typeof props.value === 'undefined' ? '' : props.value}
            placeholder={props.placeholder}
            onChange={props.onChange} tabIndex={props.tabindex}
            disabled={props.disabled} onKeyPress={Libs.rEnter}
            onKeyUp={props.onKeyUp}
            onFocus={props.onFocus}
            onClick={props.onClick}
            onKeyDown={props.onKeyDown}
            onKeyPress = {props.onKeyPress}
            autoComplete="off"
            onBlur={props.onBlur}
            pattern={props.pattern == null || typeof props.pattern === 'undefined' ? '.*' : props.pattern}
        />
    </React.Fragment>
)

export const RNumber = (props) => (
    <React.Fragment>
        {(props.label != "" && typeof props.label != 'undefined') ?
            <label className="control-label">{trans.translate(props.label)}
                {props.required == 'required' ? <span className="required">*</span> : null}
            </label> : null}
        {props.labelIcon && 
            <i className={props.iconClass||null} aria-hidden="true"></i>
        }
        <input id={props.inputId ? props.inputId : null}
            pattern="[0-9.]*"
            className={props.inputClass}
            name={props.inputName} maxLength={typeof props.maxLength !== 'undefined' ? props.maxLength : null}
            value={props.value == null || typeof props.value === 'undefined' ? '' : props.value}
            placeholder={props.placeholder}
            onChange={props.onChange} tabIndex={props.tabindex}
            disabled={props.disabled} onKeyPress={Libs.rEnter}
            onKeyUp={props.onKeyUp}
            onBlur={props.onBlur}
        />
    </React.Fragment>
)


export const RPassword = (props) => (
    <React.Fragment>
        {(props.label != "" && typeof props.label != 'undefined') ?
            <label className="control-label">{trans.translate(props.label)}
                {props.required == 'required' ? <span className="required">*</span> : null}
            </label> : null}
        {props.labelIcon && 
            <i className={props.iconClass||null} aria-hidden="true"></i>
        }
        <input id={props.inputId ? props.inputId : null}
            type="password"
            className={props.inputClass}
            name={props.inputName}
            value={props.value == null || typeof props.value === 'undefined' ? '' : props.value}
            placeholder={props.placeholder}
            onChange={props.onChange} tabIndex={props.tabindex}
            disabled={props.disabled} onKeyPress={Libs.rEnter}
            maxLength={typeof props.maxLength !== 'undefined' ? props.maxLength : null}
            onBlur={props.onBlur}
            autoComplete = {props.autoComplete}
            onKeyPress = {props.onKeyPress}
        />
    </React.Fragment>
)

export const RTextArea = (props) => (
    <React.Fragment>
        {(props.label != "" && typeof props.label != 'undefined' && props.label != null) ?
            <label className="control-label">{trans.translate(props.label)}
                {props.required == 'required' ? <span className="required">*</span> : null}
                {
                    (props.onTranslateClick && typeof props.onTranslateClick === 'function') && props.auth ?
                    <button 
                        disabled={props.disabledTranslateBtn}
                        className="btn translate-field"
                        onClick={props.onTranslateClick}
                        type="button"
                    >
                    <i className="fa fa-language"/>
                    </button>
                    : null
                }
            </label> : null}
        <textarea rows={props.rows} id={props.inputId ? props.inputId : null}
            className={props.inputClass} 
            name={props.inputName}
            value={props.value == null || typeof props.value === 'undefined' ? '' : props.value}
            placeholder={props.placeholder}
            onChange={props.onChange}
            onBlur={props.onBlur}
            disabled={props.disabled}
            tabIndex={props.tabindex}
            maxLength={typeof props.maxLength !== 'undefined' ? props.maxLength : null}
            style={props.style || null}
        >
        </textarea>
    </React.Fragment>
)

export const RSelect = (props) => (
    <React.Fragment>
        {(props.label != "" && typeof props.label != 'undefined') ?
            <label className="control-label">{trans.translate(props.label)}
                {props.required == 'required' ? <span className="required">*</span> : null}
            </label> : null}
        <select
            id={props.inputId !== null && props.inputId !== 'undefined' ? props.inputId : ''}
            className={props.className !== null && props.className !== 'undefined' ? props.className : ''}
            name={props.inputName}
            onChange={props.onChange}
            disabled={props.disabled}
            onKeyPress={Libs.rEnter}
            value={props.selectedValue == null || typeof props.selectedValue === 'undefined' ? '' : props.selectedValue}
        >
            {props.showEmpty ? <option key={0} value={props.emptyValue !== null && props.emptyValue !== 'undefined' ? props.emptyValue : 0}>{props.emptyText ? props.emptyText : trans.translate('common.all')}</option> : null}
            {props.createOptionElement !== null && props.createOptionElement !== 'undefined' ? props.createOptionElement : null}
        </select>
    </React.Fragment>
)

export const RButton = (props) => (
    <React.Fragment>
        <button id={props.btnId} disabled={((!props.auth) && props.auth !== undefined) || ((props.auth) && props.disabled)}
            className={props.className} onClick={props.onClick} type="button" aria-hidden="false" title={props.title}>
            {props.iClass != null && typeof props.iClass != undefined ? <i className={props.iClass}
            /> : null}
            {props.text != null && typeof props.text != undefined ? props.text : null}
        </button>
    </React.Fragment>
)
