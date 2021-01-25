
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
// 页面
import dataxweb from './dataxweb.jsx';



export default class dataAppRouter extends React.Component{
    render(){
        return (
            <Switch>
                  <Route path="/dataxweb" component={dataxweb} />
            </Switch>
        )
    }
}