
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';
import Loadable from 'react-loadable';
import loading from '../../util/loading.jsx';
// 页面

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

const CreateTemplate = Loadable({
    loader: () => import('./CreateTemplate.jsx'),
    loading: loading,
    delay:3000
});

const QueryData = Loadable({
    loader: () => import('./QueryData.jsx'),
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
                 <Route path="/query/CreateTemplate" component={CreateTemplate} />
                 <Route path="/query/QueryData" component={QueryData} />
                 <Route path="/query/QueryCreator/:action/:id" component={QueryCreator} />
                 <Redirect exact from="/query" to="/query/ExecQuery"/> 
            </Switch>
        )
    }
}
export default QueryRouter;