import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import asyncComponent from '../component/AsyncComponent';
const ClientMini = asyncComponent(() => import('./desktop/clientMini/ClientMini').then(module => module.default))
export default class MiniSiteAppBody extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Switch>
                <Route exact path="/minisite/:id" component={(props) => <ClientMini parent={this.props.parent} baseParam={props} />} />
            </Switch>
        );
    }
}
