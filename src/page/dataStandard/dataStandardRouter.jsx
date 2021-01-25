
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
// 页面
// import dataStandard from './dataStandard.jsx';
import dataStandardList from './dataStandardList.jsx';


export default class dataStandardRouter extends React.Component{
    render(){
        return (
            <Switch>
                {/* <Route path="/dataStandard" component={dataStandard} /> */}
                <Route path="/dataStandardList" component={dataStandardList} />
            </Switch>
        )
    }
}