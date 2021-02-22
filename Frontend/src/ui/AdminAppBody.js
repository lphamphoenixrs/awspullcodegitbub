import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { FLToast } from '../component/FLToast';
import asyncComponent from '../component/AsyncComponent';

const Dashboard = asyncComponent(() => import('./desktop/admin/dashboard/Dashboard').then(module => module.default))
const Roles = asyncComponent(() => import('./desktop/admin/roles/Roles').then(module => module.default))
const Permissions = asyncComponent(() => import('./desktop/admin/permissions/Permissions').then(module => module.default))
const Customer = asyncComponent(() => import('./desktop/admin/customer/Customer').then(module => module.default))
const Employee = asyncComponent(() => import('./desktop/admin/employee/Employee').then(module => module.default))
const Site = asyncComponent(() => import('./desktop/admin/site/Site').then(module => module.default))
const Map = asyncComponent(() => import('./desktop/admin/map/Map').then(module => module.default))
const SitePortfolio = asyncComponent(() => import('./desktop/admin/sitePortfolio/SitePortfolio').then(module => module.default))
const Alerts = asyncComponent(() => import('./desktop/admin/alerts/Alerts').then(module => module.default))

export default class AdminAppBody extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <section className="app-content">
                <FLToast position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={true} />
                <Switch>
                    <Route exact path="/management" component={(props) => <Dashboard parent={this.props.parent} baseParam={props} />} />
                    <Route exact path="/management/role" component={(props) => <Roles parent={this.props.parent} baseParam={props} />} />
                    <Route exact path="/management/permission" component={(props) => <Permissions parent={this.props.parent} baseParam={props} />} />
                    <Route exact path="/management/customer" component={(props) => <Customer parent={this.props.parent} baseParam={props} />} />
                    <Route exact path="/management/employee" component={(props) => <Employee parent={this.props.parent} baseParam={props} />} />
                    <Route exact path="/management/site" component={(props) => <Site parent={this.props.parent} baseParam={props} />} />
                    <Route exact path="/management/map" component={(props) => <Map parent={this.props.parent} baseParam={props} />} />
                    <Route exact path="/management/portfolio" component={(props) => <SitePortfolio parent={this.props.parent} baseParam={props} />} />
                    <Route exact path="/management/alerts" component={(props) => <Alerts parent={this.props.parent} baseParam={props} />} />
                </Switch>
            </section>
        );
    }
}
