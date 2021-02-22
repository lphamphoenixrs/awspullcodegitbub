import React, { Component } from 'react'
import Libs from '../utils/Libs';
import Auth from '../utils/Auth'
export default class AppFooter extends Component {
    constructor(props) {
        super(props);
        var today = new Date();
        var date = today.getFullYear();
        this.state = {
            date : date
        };
    }
    componentWillMount() {
        let info = localStorage.getItem(Constants.COMMON.USER_INFO);
        let userInfo = JSON.parse(Libs.base64Decrypt(info));
        this.setState({
            user: userInfo
        })
    }
    render() {
        return ( 
            <footer className="main-footer">
                <div className="pull-right hidden-xs">
                <b>Version</b> 1.0
                </div>
                <strong>Copyright © {this.state.date} <a href="https://adminlte.io">Avis Confiance</a>.</strong> All rights
                reserved.
            </footer>
        )
    }
}