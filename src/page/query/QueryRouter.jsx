
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

const QueryList = Loadable({
    loader: () => import('./QueryList.jsx'),
    loading: loading,
    delay:3000
});

const QueryCreator = Loadable({
    loader: () => import('./QueryCreator.jsx'),
    loading: loading,
    delay:3000
});
const QueryClass = Loadable({
    loader: () => import('./QueryClass.jsx'),
    loading: loading,
    delay:3000
});

const QueryTemplate = Loadable({
    loader: () => import('./QueryTemplate.jsx'),
    loading: loading,
    delay:3000
});

class QueryRouter extends React.Component{
    render(){
        return (
            <Switch>
                 <Route path="/query/ExecQuery" component={ExecQuery} />
                 <Route path="/query/QueryList" component={QueryList} />
                 <Route path="/query/QueryClass" component={QueryClass} />
                 <Route path="/query/QueryTemplate" component={QueryTemplate} />
                 <Route path="/query/QueryCreator/:action/:id" component={QueryCreator} />
                 <Redirect exact from="/query" to="/query/ExecQuery"/> 
            </Switch>
        )
    }
}
export default QueryRouter;