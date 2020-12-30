
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';
import Loadable from 'react-loadable';
import loading from '../../util/loading.jsx';
// 页面

const ExecQuery = Loadable({
    loader:()=>import(/* webpackChunkName: "ExecQuery" */ './ExecQuery.jsx'),
    loading:loading,
    delay:3000
});

const QueryList = Loadable({
    loader: () => import(/* webpackChunkName: "QueryList" */ './QueryList.jsx'),
    loading: loading,
    delay:3000
});

const QueryListCard = Loadable({
    loader: () => import(/* webpackChunkName: "QueryListCard" */ './QueryListCard.jsx'),
    loading: loading,
    delay:3000
});

const HttpCreator = Loadable({
    loader: () => import(/* webpackChunkName: "HttpCreator" */ './HttpCreator.jsx'),
    loading: loading,
    delay:3000
});
const SqlCreator = Loadable({
    loader: () => import(/* webpackChunkName: "SqlCreator" */ './SqlCreator.jsx'),
    loading: loading,
    delay:3000
});
const SqlView = Loadable({
    loader: () => import(/* webpackChunkName: "SqlView" */ './SqlView.jsx'),
    loading: loading,
    delay:3000
});
const ProcedureCreator = Loadable({
    loader: () => import(/* webpackChunkName: "ProcedureCreator" */ './ProcedureCreator.jsx'),
    loading: loading,
    delay:3000
});
const TableCreator = Loadable({
    loader: () => import(/* webpackChunkName: "TableCreator" */ './TableCreator.jsx'),
    loading: loading,
    delay:3000
});
const QueryClass = Loadable({
    loader: () => import(/* webpackChunkName: "QueryClass" */ './QueryClass.jsx'),
    loading: loading,
    delay:3000
});

const CreateTemplate = Loadable({
    loader: () => import(/* webpackChunkName: "CreateTemplate" */ './CreateTemplate.jsx'),
    loading: loading,
    delay:3000
});

const QueryData = Loadable({
    loader: () => import(/* webpackChunkName: "QueryData" */ './QueryData.jsx'),
    loading: loading,
    delay:3000
});
const WebTemplate = Loadable({
    loader: () => import(/* webpackChunkName: "WebTemplate" */ './WebTemplate.jsx'),
    loading: loading,
    delay:3000
});
const NlpCreator = Loadable({
    loader: () => import(/* webpackChunkName: "NlpCreator" */ './NlpCreator.jsx'),
    loading: loading,
    delay:3000
});

const NlpList = Loadable({
    loader: () => import(/* webpackChunkName: "NlpList" */ './NlpList.jsx'),
    loading: loading,
    delay:3000
});
// const Indexs = Loadable({
//     loader: () => import(/* webpackChunkName: "DictList" */ './Indexs.jsx'),
//     loading: loading,
//     delay:3000
// });

class QueryRouter extends React.Component{
    render(){
        return (
            <Switch>
                 <Route path="/query/ExecQuery/:paramv/:paramv2/:paramv3/:paramv4" component={ExecQuery} />
                 <Route path="/query/QueryList" component={QueryList} />
                 <Route path="/query/QueryListCard" component={QueryListCard} />
                 <Route path="/query/QueryClass" component={QueryClass} />
                 <Route path="/query/CreateTemplate" component={CreateTemplate} />
                 <Route path="/query/QueryData" component={QueryData} />
                 {/* <Route path="/query/Contaier" component={Indexs} /> */}
                 {/* <Route path="/query/QueryCreator/:qry_type/:action/:id" component={QueryCreator} /> */}
                 <Route path="/query/SqlCreator/:action/:id" component={SqlCreator} />
                 <Route path="/query/ProcedureCreator/:action/:id" component={ProcedureCreator} />
                 <Route path="/query/HttpCreator/:action/:id" component={HttpCreator} />
                 <Route path="/query/TableCreator/:action/:id" component={TableCreator} />
                 <Route path="/query/web/:path" component={WebTemplate} />
                 <Route path="/query/nlpCreator/:tid" component={NlpCreator} />
                 <Route path="/query/NlpList" component={NlpList} />
                 <Route path="/query/SqlView/:action/:id" component={SqlView} />
                 <Redirect exact from="/query" to="/query/ExecQuery"/> 
            </Switch>
        )
    }
}
export default QueryRouter;