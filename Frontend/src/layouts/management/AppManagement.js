import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AdminHeader from '../../ui/common/adminHeader/AdminHeader';
// import Footer from '../../ui/common/footer/Footer';
import AdminSidebar from '../../ui/common/adminSidebar/AdminSidebar';
import AdminAppBody from './../../ui/AdminAppBody';
import 'bootstrap/dist/css/bootstrap.css';
import './../../scss/layouts/admin/App.scss';


export default class AppManagement extends Component {
    constructor(props) {
        super(props)
        this.app_sidebar = React.createRef();
        this.app_body = React.createRef();
        return;
    }

    forceUpdateAppBody() {

        this.app_body.current.forceUpdate();
    }

    showSidebarClient(is_show_sidebar, client_id) {

        if (this.app_sidebar && this.app_sidebar.current) {
            this.app_sidebar.current.showSidebar(is_show_sidebar, client_id);
        }
    }


    render() {
        return (

            <Router>
                <Fragment>
                    <div className="wrapper">
                        <AdminHeader />
                        <AdminSidebar parent={this} ref={this.app_sidebar} />
                        <div className="main_content">
                            <AdminAppBody parent={this} ref={this.app_body} />
                        </div>
                        {/* <Footer /> */}
                    </div>
                </Fragment>
            </Router>
        )
    }

}
