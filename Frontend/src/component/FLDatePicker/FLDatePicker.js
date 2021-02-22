import React, { Component } from 'react';
import Libs from '../../utils/Libs';
// import './FLDatePicker.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import enGB from 'date-fns/locale/en-GB';
// import './FLDatePicker.css';
/**
 * @description Flex date picker
 * @author Long.Pham
 * @since 28/08/2018
 */

export default class FLDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      minDate: null,
      maxDate: null,
      showTimeSelect: false,
      showDisabledMonthNavigation: false,
      timeCaption: "Time",
      dateFormat: "MM/dd/yyyy HH:mm",
      timeFormat: "HH:mm",
      timeIntervals: 15,
      readOnly: false,
      disabled: false,
      isClearable: false,
      isOpen: false,
      peekNextMonth: false,
      showMonthDropdown: false,
      showYearDropdown: false,
      dropdownMode: null,
      showMonthYearPicker: null,
      showYearPicker: null,
      yearItemNumber: null,
      showTimeSelectOnly: null,
      monthsShown: 1,
      inline: false
    };
    this.focus = false;
    this.handleChange = this.handleChange.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
  }
  componentDidMount() {
    let { showTimeSelect, readOnly, disabled, dateFormat, format, minDate, maxDate, value, peekNextMonth, showMonthDropdown, showYearDropdown, dropdownMode, showMonthYearPicker, showYearPicker, yearItemNumber, timeCaption, showTimeSelectOnly, timeIntervals, monthsShown, inline } = this.props;
    if (Libs.isBlank(dateFormat)) {
      dateFormat = "MM/dd/yyyy";
    }
    if (Libs.isBlank(format)) {
      format = "MM/DD/YYYY HH:mm";
    }
    if (!Libs.isBlank(minDate)) {
      minDate = Libs.convertStrtoDate(minDate, format);
    }
    if (!Libs.isBlank(maxDate)) {
      maxDate = Libs.convertStrtoDate(maxDate, format);
    }
    if (!Libs.isBlank(value)) {
      value = Libs.convertStrtoDate(value, format);
    } else {
      value = null;
    }
    this.setState({
      startDate: value,
      readOnly: !Libs.isBlank(readOnly) ? readOnly : false,
      disabled: !Libs.isBlank(disabled) ? disabled : false,
      format: format,
      dateFormat: dateFormat,
      showTimeSelect: !Libs.isBlank(showTimeSelect) ? showTimeSelect : false,
      minDate: !Libs.isBlank(minDate) ? minDate : null,
      maxDate: !Libs.isBlank(maxDate) ? maxDate : null,
      peekNextMonth: !Libs.isBlank(peekNextMonth) ? peekNextMonth : null,
      showMonthDropdown: !Libs.isBlank(showMonthDropdown) ? showMonthDropdown : null,
      showYearDropdown: !Libs.isBlank(showYearDropdown) ? showYearDropdown : null,
      dropdownMode: !Libs.isBlank(dropdownMode) ? dropdownMode : null,
      showMonthYearPicker: !Libs.isBlank(showMonthYearPicker) ? showMonthYearPicker : null,
      showYearPicker: !Libs.isBlank(showYearPicker) ? showYearPicker : null,
      yearItemNumber: !Libs.isBlank(yearItemNumber) ? yearItemNumber : null,
      timeCaption: !Libs.isBlank(timeCaption) ? timeCaption : null,
      showTimeSelectOnly: !Libs.isBlank(showTimeSelectOnly) ? showTimeSelectOnly : null,
      timeIntervals: !Libs.isBlank(timeIntervals) ? timeIntervals : null,
      monthsShown: !Libs.isBlank(monthsShown) ? monthsShown : null,
      inline: inline ? inline : false,
      
    })
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    let { showTimeSelect, readOnly, disabled, dateFormat, format, minDate, maxDate, value, peekNextMonth, showMonthDropdown, showYearDropdown, dropdownMode, showMonthYearPicker, showYearPicker, yearItemNumber, timeActive, timeCaption, showTimeSelectOnly, timeIntervals, monthsShown, inline } = this.props;
    if (prevProps.disabled != disabled || prevProps.minDate != minDate ||
      prevProps.maxDate != maxDate || prevProps.value != value || prevProps.timeActive != timeActive ) {
      if (Libs.isBlank(dateFormat)) {
        dateFormat = "MM/dd/yyyy";
      }
      if (Libs.isBlank(format)) {
        format = "MM/DD/YYYY HH:mm";
      }
      if (!Libs.isBlank(minDate)) {
        minDate = Libs.convertStrtoDate(minDate, format);
      }
      if (!Libs.isBlank(maxDate)) {
        maxDate = Libs.convertStrtoDate(maxDate, format);
      }

      if (!Libs.isBlank(value)) {
        value = Libs.convertStrtoDate(value, format);
      }
      this.setState({
        startDate: value,
        readOnly: !Libs.isBlank(readOnly) ? readOnly : false,
        disabled: !Libs.isBlank(disabled) ? disabled : false,
        format: format,
        dateFormat: dateFormat,
        showTimeSelect: !Libs.isBlank(showTimeSelect) ? showTimeSelect : false,
        minDate: !Libs.isBlank(minDate) ? minDate : null,
        maxDate: !Libs.isBlank(maxDate) ? maxDate : null,
        peekNextMonth: !Libs.isBlank(peekNextMonth) ? peekNextMonth : null,
        showMonthDropdown: !Libs.isBlank(showMonthDropdown) ? showMonthDropdown : null,
        showYearDropdown: !Libs.isBlank(showYearDropdown) ? showYearDropdown : null,
        dropdownMode: !Libs.isBlank(dropdownMode) ? dropdownMode : null,
        showMonthYearPicker: !Libs.isBlank(showMonthYearPicker) ? showMonthYearPicker : null,
        showYearPicker: !Libs.isBlank(showYearPicker) ? showYearPicker : null,
        yearItemNumber: !Libs.isBlank(yearItemNumber) ? yearItemNumber : null,
        timeCaption: !Libs.isBlank(timeCaption) ? timeCaption : null,
        showTimeSelectOnly: !Libs.isBlank(showTimeSelectOnly) ? showTimeSelectOnly : null,
        timeIntervals: !Libs.isBlank(timeIntervals) ? timeIntervals : null,
        monthsShown: !Libs.isBlank(monthsShown) ? monthsShown : null,
        inline: inline ? inline : false,

      })

    }
    // this.forceUpdate();
  }
  handleChange(date, e, name) {
    if (typeof this.props.handleChange === 'function') {

      let _date = Libs.dateFormat(date, this.state.format);
      let target = {
        target: {
          name: name,
          value: _date
        }
      }
      this.props.handleChange(target, name, _date);
    }
  }
  handleOnBlur(e) {
    if (typeof this.props.handleOnBlur === 'function') {
      this.props.handleOnBlur(e);
    }
    else if (typeof this.props.onBlur === 'function') {
      this.props.onBlur(e);
    }
  }

  /**
   * @description em chuyển lại this.focus = false;
   * lỗi trường hợp nó sẽ nhảy từ true -> false
   * click 2 lần mới open calendar
   * @author Long.Pham 21-12-2018
   */
  toggle = (e) => {
    // let open = this.component.isCalendarOpen();
    this.component.setOpen(!this.focus);
    // this.focus = !this.focus;

  }

  handleOnInputClick(e) {
    if (typeof this.props.handleOnInputClick === 'function') {
      this.props.handleOnInputClick(e);
    }
  }

  render() {
    const datepickerFixed = (this.props.isFixed != 'undefined' && this.props.isFixed) ? ' datepicker-fixed' : '';
    const inputClass = typeof this.props.inputClass === 'string' && this.props.inputClass != "" ? this.props.inputClass : null;
    const inputName = typeof this.props.inputName === 'string' && this.props.inputName != "" ? this.props.inputName : null;
    const placeholder = typeof this.props.placeholder === 'string' && this.props.placeholder != "" ? this.props.placeholder : null;
    const inputId = typeof this.props.inputId === 'string' && this.props.inputId != "" ? this.props.inputId : null;
    return (
      <React.Fragment>

        {(this.props.label != "" && typeof this.props.label != 'undefined') ?
          <label className="control-label">{trans.translate(this.props.label)}
            {this.props.required == 'required' ? <span className="required">*</span> : null}
          </label> : null}
        <div className={'input-group fldatepicker pl-0 pr-0' + datepickerFixed + (this.state.disabled ? ' bg-disabled' : '') + (this.state.showTimeSelectOnly ? " onlytime" : '')} >
          <div className={inputClass}>
            <DatePicker
              id={inputId}
              name={inputName}
              autoComplete="off"
              // className={"input-datepicker " + inputClass}
              selected={this.state.startDate}
              onChange={(d, e) => this.handleChange(d, e, inputName)}
              onFocus={(e) => this.handleOnInputClick(e)}
              onBlur={this.handleOnBlur}
              showTimeSelect={this.state.showTimeSelect}
              timeFormat={this.state.timeFormat}
              timeIntervals={this.state.timeIntervals}
              dateFormat={this.state.dateFormat}
              timeCaption={this.state.timeCaption}
              todayButton={trans.translate("common.today")}
              placeholderText={placeholder}
              minDate={this.state.minDate}
              maxDate={this.state.maxDate}
              readOnly={this.state.readOnly}
              disabled={this.state.disabled}
              isClearable={this.state.isClearable}
              showDisabledMonthNavigation={this.state.showDisabledMonthNavigation}
              locale={enGB}
              // popperPlacement="bottom-start"
              fixedHeight={false}
              popperPlacement="bottom-start"
              peekNextMonth={this.state.peekNextMonth}
              showMonthDropdown={this.state.showMonthDropdown}
              showYearDropdown={this.state.showYearDropdown}
              dropdownMode={this.state.dropdownMode}
              showMonthYearPicker={this.state.showMonthYearPicker}
              showYearPicker={this.state.showYearPicker}
              yearItemNumber={this.state.yearItemNumber}

              showTimeSelect = {this.state.showTimeSelect}
              showTimeSelectOnly = {this.state.showTimeSelectOnly}
              monthsShown = {this.state.monthsShown}
              inline = {this.state.inline}
              ref={(r) => {
                this.component = r;
              }}
            />

          </div>
          <div className="input-group-append">
            <button onClick={(e) => this.toggle(e)} className="btn btn-outline-secondary datepickerbutton" type="button">
              {Libs.isBlank(this.state.showTimeSelectOnly) ? <span className="icon icon-calendar"></span> : <span className="icon icon-clock-o"></span>}
              
              </button>
          </div>
        </div>
        {typeof this.props.validate === 'boolean' && this.props.validate === true ?
          <p className="pl-0 col-sm-12 validate-message d-none"></p> :
          null
        }
      </React.Fragment>
    );

  }
}
