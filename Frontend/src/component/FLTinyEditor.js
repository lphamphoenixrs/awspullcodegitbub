import React, { Component } from 'react';
import NewsService from '../services/NewsService';
import Libs from '../utils/Libs';
import Constants from '../utils/Constants';
class FLTinyEditor extends Component {
    //Khởi tạo constructor để nhận các giá trị props từ component
    constructor(props) {
        super(props);
        this.state = {
            content: null,
            readonly: false
        };
        this.tinymceEditor = null;
    }
    /**
     * @description Được gọi ngay trước khi chuẩn bị render, được dùng để thiết lập hay chuẩn bị trước khi render
     * @author Luyen Nguyen 2018-10-07
     */
    componentDidMount() {
        var { id, height, readonly, content } = this.props;
        if (!height) {
            height = 150;
        }
        if (!readonly) {
            readonly = false;
        }
        var _this = this;
        _this.setState({
            content,
            readonly
        });
        tinymce.init({
            //document_base_url:base_url,
            selector: "#" + id,
            theme: "silver",
            height: height,
            menubar: false,
            readonly: readonly,
            statusbar: false,
            toolbar: false,
            relative_urls: false,
            remove_script_host: false,
            convert_urls: false,
            paste_data_images: true,

            plugins: [
                "advlist autolink lists charmap print preview hr pagebreak",
                "wordcount code fullscreen insertdatetime nonbreaking",
                "save table contextmenu emoticons paste"
            ],
            toolbar: "undo redo | forecolor backcolor | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table",
            setup: editor => {
                _this.tinymceEditor = editor;
                editor.on('keyup change', () => {
                    const content = editor.getContent();
                    _this.props.onEditorChange(content, editor);
                });
                if (_this.props.onRegistered) {
                    _this.props.onRegistered(editor, _this);
                }
            }
        });
        tinymce.on('addeditor', function (event) {

        }, true);
    }
    setHeight(newHeight) {
        if (this.tinymceEditor && this.tinymceEditor.theme) {
            this.tinymceEditor.theme.resizeTo(null, newHeight);
        }
    }
    /**
     * @description Remove editor sau khi thoát khỏi component
     * @author Luyen Nguyen 2018-10-07
     */
    componentWillUnmount() {
        if (tinymce && this.tinymceEditor)
            tinymce.remove(this.tinymceEditor);
    }
    /**
     * @description Được gọi ngay trước khi có props mới tức nextProps
     * trong hàm này không được phép setState để setState phải gọi đến hàm componentDidUpdate
     * @author Luyen Nguyen 2018-10-30
     */
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.content !== prevState.content || nextProps.readonly !== prevState.readonly) {
            return { content: nextProps.content, readonly: nextProps.readonly };
        }
        else return null;
    }
    /**
     * @description Hàm này được gọi ngay sau khi component được render xong
     * Lúc này cấu trúc DOM mới được cập nhật, tiến hành set lại giá trị cho state
     * Kiểm tra xem nếu có thay đổi content và readonly mới tiến hành set lại content
     * @author Luyen Nguyen 2018-10-30
     */
    componentDidUpdate(prevProps, prevState) {
        if ((prevState.content !== this.state.content || prevState.readonly !== this.state.readonly)) {
            var { id, readonly } = this.props;
            if (tinymce && tinymce.EditorManager && tinymce.EditorManager.get(id)) {
                tinymce.EditorManager.get(id).setContent(this.state.content);
                if (tinymce.activeEditor) {
                    var editorMode = 'design';
                    if (readonly) {
                        editorMode = 'readonly';
                    }
                    tinymce.activeEditor.setMode(editorMode);
                }
            }
        }
    }
    render() {
        var { id, content, readonly, name } = this.props;
        return (
            <div className="main-editor">
                <textarea
                    id={id}
                    readOnly={readonly}
                    name={name}
                    defaultValue ={(content) ? content : ""}
                    onChange={this.props.onChange}
                />
            </div>
        );
    }
}

export default FLTinyEditor;