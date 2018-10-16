
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
// 页面
import AuthTypeList from './authTypeList.jsx';
 import AuthTypeInfo from './authTypeInfo.jsx';
// import DbView from './dbView.jsx';

class AuthTypeRouter extends React.Component{
    render(){
        return (
            <Switch>
                 <Route path="/authType/authTypeList" component={AuthTypeList} />
                 <Route path="/authType/authTypeInfo/:name" component={AuthTypeInfo} />
                 {/* <Route path="/dbs/dbView/:name" component={DbView} /> */}
                 <Redirect exact from="/authType" to="/authType/authTypeList"/> 
            </Switch>
        )
    }
}
export default AuthTypeRouter;