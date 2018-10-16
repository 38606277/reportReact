
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
// 页面
import RulesInfo from './ruleInfo.jsx';

class RuleRouter extends React.Component{
    render(){
        return (
            <Switch>
                 <Route path="/rule/ruleInfo/:roleId" component={RulesInfo} />
                 <Redirect exact from="/rule" to="/rule/ruleInfo/null"/> 
            </Switch>
        )
    }
}
export default RuleRouter;