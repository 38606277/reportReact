
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
// 页面
import pyDataCompute from './pyDataCompute.jsx';
import sparkDataCompute from './sparkDataCompute.jsx';

export default class dataCompute extends React.Component{
    render(){
        return (
            <Switch>
                 <Route path="/dataCompute/pyDataCompute" component={pyDataCompute} />
                 <Route path="/dataCompute/sparkDataCompute" component={sparkDataCompute} />
            </Switch>
        )
    }
}