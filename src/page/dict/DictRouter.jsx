
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';
import Loadable from 'react-loadable';
import loading from '../../util/loading.jsx';
// 页面


const DictList = Loadable({
    loader: () => import(/* webpackChunkName: "DictList" */ './DictList.jsx'),
    loading: loading,
    delay:3000
});

const DictCreator = Loadable({
    loader: () => import(/* webpackChunkName: "DictCreator" */ './DictCreator.jsx'),
    loading: loading,
    delay:3000
});


const DictViewData = Loadable({
    loader: () => import(/* webpackChunkName: "DictViewData" */ './DictViewData.jsx'),
    loading: loading,
    delay:3000
});

const DictValueList = Loadable({
    loader: () => import(/* webpackChunkName: "DictValueList" */ './DictValueList.jsx'),
    loading: loading,
    delay:3000
});


// const DictValueInfo = Loadable({
//     loader: () => import(/* webpackChunkName: "DictValueInfo" */ './DictValueInfo.jsx'),
//     loading: loading,
//     delay:3000
// });

// const DictValueInfo = Loadable({//新建
//     loader: () => import(/* webpackChunkName: "DictValueInfo" */ '../dataAsset/index.jsx'),
//     loading: loading,
//     delay:3000
// });
export default class DictRouter extends React.Component{
    render(){
        return (
            <Switch>
                 <Route path="/dict/DictList" component={DictList} />
                 <Route path="/dict/DictCreator/:action/:id" component={DictCreator} />
                 <Route path="/dict/DictViewData/:id" component={DictViewData} />
                 <Route path="/dict/DictValueList/:dictId" component={DictValueList} />
                 {/* <Route path="/dict/index" component={DictValueInfo} /> */}
                 {/* <Route path="/dict/DictValueInfo/:dictId/:value_code" component={DictValueInfo} /> */}
                 <Redirect exact from="/dict" to="/dict/DictList"/> 
            </Switch>
        )
    }
}