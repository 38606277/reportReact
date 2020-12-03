
import React from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';
import Loadable from 'react-loadable';
import loading from '../../util/loading.jsx';
 import analysis from './analysis.jsx';
import monitor from './monitor.jsx';
import DataAnalysis  from './DataAnalysis.jsx';
import DashboardList from './DashboardList.jsx';

const DashboardCreator = Loadable({
    loader: () => import(/* webpackChunkName: "DashboardCreator" */ './DashboardCreator.jsx'),
    loading: loading,
    delay:3000
});

const FormCreator = Loadable({
    loader: () => import(/* webpackChunkName: "FormCreator" */ './FormCreator.jsx'),
    loading: loading,
    delay:3000
});

const dataAssetMap = Loadable({
    loader: () => import(/* webpackChunkName: "dataAssetMap" */ './dataAssetMap.jsx'),
    loading: loading,
    delay:3000
});


export default class DashboardRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/dashboard/analysis" component={analysis} />
                <Route path="/dashboard/dataAssetMap" component={dataAssetMap} />
                <Route path="/dashboard/monitor" component={monitor} />
                <Route path="/dashboard/DataAnalysis/:qry_id/:class_id/:cube_name" component={DataAnalysis}/>
                <Route path="/dashboard/DashboardCreator" component={FormCreator}/>
                <Route path="/dashboard/DashboardList" component={DashboardList}/>
                
            </Switch>
        )
    }
}