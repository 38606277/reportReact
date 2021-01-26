
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
import Loadable from 'react-loadable';
import loading from '../../util/loading.jsx';
import dataStandardInfo from './dataStandard.jsx';
import dataStandardList from './dataStandardList.jsx';

const dataStandard = Loadable({
    loader: () => import(/* webpackChunkName: "dataStandard" */ './dataStandard.jsx'),
    loading: loading,
    delay:3000
});

export default class dataStandardRouter extends React.Component{
    render(){
        return (
            <Switch>
                <Route path="/dataStandard/dataStandard/:catalog_id/:standard_id" component={dataStandard} />
                <Route path="/dataStandard/dataStandardList" component={dataStandardList} />
                <Redirect exact from="/dataStandard" to="/dataStandard/dataStandardList"/> 
            </Switch>
        )
    }
}