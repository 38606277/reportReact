
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

const HttpCreator = Loadable({
    loader: () => import('./HttpCreator.jsx'),
    loading: loading,
    delay:3000
});
const SqlCreator = Loadable({
    loader: () => import('./SqlCreator.jsx'),
    loading: loading,
    delay:3000
});
const ProcedureCreator = Loadable({
    loader: () => import('./ProcedureCreator.jsx'),
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
const WebTemplate = Loadable({
    loader: () => import('./WebTemplate.jsx'),
    loading: loading,
    delay:3000
});
// const Indexs = Loadable({
//     loader: () => import('./Indexs.jsx'),
//     loading: loading,
//     delay:3000
// });

class QueryRouter extends React.Component{
    render(){
        return (
            <Switch>
                 <Route path="/query/ExecQuery/:paramv/:paramv2/:paramv3/:paramv4" component={ExecQuery} />
                 <Route path="/query/QueryList" component={QueryList} />
                 <Route path="/query/QueryClass" component={QueryClass} />
                 <Route path="/query/CreateTemplate" component={CreateTemplate} />
                 <Route path="/query/QueryData" component={QueryData} />
                 {/* <Route path="/query/Contaier" component={Indexs} /> */}
                 {/* <Route path="/query/QueryCreator/:qry_type/:action/:id" component={QueryCreator} /> */}
                 <Route path="/query/SqlCreator/:action/:id" component={SqlCreator} />
                 <Route path="/query/ProcedureCreator/:action/:id" component={ProcedureCreator} />
                 <Route path="/query/HttpCreator/:action/:id" component={HttpCreator} />
                 <Route path="/query/web/:path" component={WebTemplate} />
                 <Redirect exact from="/query" to="/query/ExecQuery"/> 
            </Switch>
        )
    }
}
export default QueryRouter;