import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { FLToast } from '../component/FLToast';
import asyncComponent from '../component/AsyncComponent';

const CustomerView = asyncComponent(() => import('./desktop/customerView/CustomerView').then(module => module.default) )

export default class AppBody extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <section className="app-content">
                <FLToast position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={true} />
                <Switch>
                <Route exact path="/" component={(props) => <CustomerView parent={this.props.parent} baseParam={props} />} />
                </Switch>
            </section>
        );
    }
}
