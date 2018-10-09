
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
// 页面
import RoleList from './roleList.jsx';
import RoleInfo from './roleInfo.jsx';
import RoleUser from './roleUser.jsx';
import RulesInfo from '../rule/ruleInfo.jsx';
class RoleRouter extends React.Component{
    render(){
        return (
            <Switch>
                 <Route path="/rule/ruleInfo/:roleId" component={RulesInfo} />
                 <Route path="/role/roleList" component={RoleList} />
                 <Route path="/role/roleInfo/:roleId" component={RoleInfo} />
                 <Route path="/role/roleUser/:roleId" component={RoleUser} />
                 <Redirect exact from="/role" to="/role/roleList"/> 
            </Switch>
        )
    }
}
export default RoleRouter;