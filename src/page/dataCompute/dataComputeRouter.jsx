
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
// 页面
import pyDataCompute from './pyDataCompute.jsx';
import sparkDataCompute from './sparkDataCompute.jsx';
import sqlDataCompute from './sqlDataCompute.jsx';
import MQTT from './MQTT.jsx'
import ServiceAll from './serviceAll.jsx'
import Eacharts from './mecharts2.jsx'
export default class dataCompute extends React.Component{
    render(){
        return (
            <Switch>
                 <Route path="/dataCompute/sqlDataCompute" component={sqlDataCompute} />
                 <Route path="/dataCompute/pyDataCompute" component={pyDataCompute} />
                 <Route path="/dataCompute/sparkDataCompute" component={sparkDataCompute} />
                 <Route path="/dataCompute/MQTT" component={MQTT} />
                 <Route path="/dataCompute/serviceAll" component={ServiceAll} />
                 <Route path="/dataCompute/Eacharts" component={Eacharts} />
            </Switch>
        )
    }
}