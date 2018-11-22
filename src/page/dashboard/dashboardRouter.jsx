
import React from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';
import Loadable from 'react-loadable';
import loading from '../../util/loading.jsx';
import analysis from './analysis.jsx';
import monitor from './monitor.jsx';
import DataAnalysis  from './DataAnalysis.jsx';

const DashboardCreator = Loadable({
    loader: () => import('./DashboardCreator.jsx'),
    loading: loading,
    delay:3000
});


export default class DashboardRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/dashboard/analysis" component={analysis} />
                <Route path="/dashboard/monitor" component={monitor} />
                <Route path="/dashboard/DataAnalysis" component={DataAnalysis}/>
                <Route path="/dashboard/DashboardCreator" component={DashboardCreator}/>
            </Switch>
        )
    }
}