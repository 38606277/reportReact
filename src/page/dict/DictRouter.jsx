
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';
import Loadable from 'react-loadable';
import loading from '../../util/loading.jsx';
// 页面


const DictList = Loadable({
    loader: () => import('./DictList.jsx'),
    loading: loading,
    delay:3000
});

const DictCreator = Loadable({
    loader: () => import('./DictCreator.jsx'),
    loading: loading,
    delay:3000
});


const DictViewData = Loadable({
    loader: () => import('./DictViewData.jsx'),
    loading: loading,
    delay:3000
});

export default class DictRouter extends React.Component{
    render(){
        return (
            <Switch>
                 <Route path="/dict/DictList" component={DictList} />
                 <Route path="/dict/DictCreator/:action/:id" component={DictCreator} />
                 <Route path="/dict/DictViewData/:id" component={DictViewData} />
                 <Redirect exact from="/dict" to="/dict/DictList"/> 
            </Switch>
        )
    }
}