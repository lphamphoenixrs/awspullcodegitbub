import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MiniSiteAppBody from './../../ui/MiniSiteAppBody';

export default class MiniApp extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Router>
                <div className="mini-site-page">
                    <MiniSiteAppBody parent={this} />
                </div>
            </Router>
        )
    }

}
