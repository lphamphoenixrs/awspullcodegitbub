import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../../ui/common/header/Header';
import AppBody from './../../ui/AppBody';
import 'bootstrap/dist/css/bootstrap.css';
import './../../scss/layouts/home/App.scss';


export default class App extends Component {
    constructor(props) {
        super(props)
        this.app_sidebar = React.createRef();
        this.app_body = React.createRef();
    }

    forceUpdateAppBody() {
        this.app_body.current.forceUpdate();
    }

    showSidebarClient(is_show_sidebar, client_id){
        
        if(this.app_sidebar && this.app_sidebar.current){
            this.app_sidebar.current.showSidebar(is_show_sidebar, client_id);
        }
    }


    render() {
        return (

            <Router>
                <Fragment>
                    <div className="wrapper">
                        <Header />
                        {/* <SideBar parent={this} ref={this.app_sidebar} /> */}
                        <AppBody parent={this} ref={this.app_body} />
                        {/* <Footer /> */}
                    </div>
                </Fragment>
            </Router>
        )
    }

}
