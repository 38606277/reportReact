
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
// 页面
import RoleList from './roleList.jsx';
import RoleInfo from './roleInfo.jsx';
class RoleRouter extends React.Component{
    render(){
        return (
            <Switch>
                 <Route path="/role/roleList" component={RoleList} />
                 <Route path="/role/roleInfo/:roleId" component={RoleInfo} />
                 <Redirect exact from="/role" to="/role/roleList"/> 
            </Switch>
        )
    }
}
export default RoleRouter;