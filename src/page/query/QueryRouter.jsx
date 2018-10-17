
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';
import Loadable from 'react-loadable';
import loading from '../../util/loading.jsx';
// 页面
//import ExecQuery from './ExecQuery.jsx';
const QueryData = Loadable({
    loader: () => import('./QueryList.jsx'),
    loading: loading,
    delay:3000
});
const ExecQuery = Loadable({
    loader:()=>import('./ExecQuery.jsx'),
    loading:loading,
    delay:3000
});
class QueryRouter extends React.Component{
    render(){
        return (
            <Switch>
                 <Route path="/query/ExecQuery" component={ExecQuery} />
                 <Redirect exact from="/query" to="/query/ExecQuery"/> 
            </Switch>
        )
    }
}
export default QueryRouter;