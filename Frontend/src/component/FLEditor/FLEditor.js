import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';

/**
 * @description Flex editor
 * @author thanh.bay
 * @since 28/08/2018
 */
class FLEditor extends Component {
  constructor(props, context) {
    super(props, context);
    var disabled = typeof props.disabled === 'boolean' ? props.disabled : false;
    this.state = {
      disabled: disabled
    }
    this._apiKey = "677jrk38u167uf6r78ksqv49eyqw7cojz4fno5us7295admi";
    this._editor = null;
    this._id = typeof props.inputId === 'string' ? props.inputId : "fleditor";
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.disabled != this.props.disabled) {
      var disabled = typeof this.props.disabled === 'boolean' ? this.props.disabled : false;
      this.setState({
        disabled: disabled
      }, () => {
        // this._editor.setMode(disabled ? "readonly" : "design");
        this._editor.getBody().setAttribute('contenteditable', !disabled);

      })
    }
  }

  componentDidMount() {
    var textAreaName = typeof this.props.inputName === 'string' ? this.props.inputName : this._id;
    this.textAreaElement = document.getElementById(this._id)
    this.textAreaElement.name = textAreaName;
  }


  /**
  * @description function change call back of tinymce-react
  */
  handleChange(values, props) {
    if (typeof this.props.onEditorChange === 'function') {
      this.props.onEditorChange(values, props);
    }
  }

  render() {

    return (
      <React.Fragment>
        {(this.props.label != "" && typeof this.props.label != 'undefined') ?
          <label className="control-label">{trans.translate(this.props.label)}
            {this.props.required == 'required' ? <span className="required">*</span> : null}
          </label> : null}
          {/* link image code fullscreen */}
        <Editor
          id={this._id}
          name={this.props.inputName}
          apiKey={this._apiKey}
          value={this.props.value == null || typeof this.props.value === 'undefined' ? '' : this.props.value}
          init={{
            selector: 'textarea',
            autoresize_min_height: 350,
            menubar: false,
            statusbar: false,
            plugins: 'print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | fullscreen | code',
            readonly: this.state.disabled,
            setup: (editor) => {
              this._editor = editor
            }
          }}
          onEditorChange={(values, t) => { this.handleChange(values, this.props) }}
        />
      </React.Fragment>
    );
  }
}
export default FLEditor;