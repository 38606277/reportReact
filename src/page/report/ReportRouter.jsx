
import React from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';
import Loadable from 'react-loadable';
import loading from '../../util/loading.jsx';

// 报表列表
const reportList = Loadable({
    loader: () => import(/* webpackChunkName: "reportList" */ './reportList.jsx'),
    loading: loading,
    delay: 3000
});


//创建报表 
// const reportCreate = Loadable({
//     loader: () => import(/* webpackChunkName: "reportCreate" */ './reportCreate.jsx'),
//     loading: loading,
//     delay: 3000
// });

//创建报表 
const Simple = Loadable({
    loader: () => import(/* webpackChunkName: "Simple" */ './Simple.jsx'),
    loading: loading,
    delay: 3000
});




export default class ReportRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/report/simple" component={Simple} />
                <Route path="/report/reportList" component={reportList}/>
                {/* <Route path="/report/reportCreate" component={reportCreate} /> */}
              
            </Switch>
        )
    }
}
