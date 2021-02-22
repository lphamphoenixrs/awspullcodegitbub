import React, { Component } from 'react';
import Modal from 'react-bootstrap4-modal';
class Print extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visible
        };
        this.toggle = this.toggle.bind(this);
        this.close = this.close.bind(this);
    }
    toggle() {
        this.setState({
            visible: !this.state.visible
        });

    }
    close() {
        this.toggle();
        this.props.funcCallBack(false);
    }
    callPrint() {
        // let iframeId =  document.getElementById('iframeprint')
        // iframeId.focus();
        // iframeId.contentWindow.print();
    }
    render() {
        return (
            <React.Fragment>
                <Modal aria-labelledby="contained-modal-title" visible={this.state.visible} onClickBackdrop={() => this.close()} id="">
                    {
                        (typeof this.props.title != 'undefined' && this.props.title !== null) ?
                            <div className="modal-header">
                                <h5 className="modal-title">{this.props.title}</h5>
                                <button type="button" onClick={() => this.close()} className="bootbox-close-button close" data-dismiss="modal" aria-hidden="true" style={{ marginTop: '-10px' }}>×</button>
                            </div>
                            : null
                    }
                    <div className="modal-body">
                        <iframe id="iframeprint" src={this.props.base64} height="500px" width="100%"></iframe>
                    </div>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Print;