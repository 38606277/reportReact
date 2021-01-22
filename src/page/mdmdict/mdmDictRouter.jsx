
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';
import Loadable from 'react-loadable';
import loading from '../../util/loading.jsx';
// 页面


const mdmDictList = Loadable({
    loader: () => import(/* webpackChunkName: "dictList" */ './dictList.jsx'),
    loading: loading,
    delay:3000
});

const MdmDictCreator = Loadable({
    loader: () => import(/* webpackChunkName: "dict" */ './dict.jsx'),
    loading: loading,
    delay:3000
});

export default class DictRouter extends React.Component{
    render(){
        return (
            <Switch>
                 <Route path="/mdmdict/dictList" component={mdmDictList} />
                 <Route path="/mdmdict/dict/:dict_id" component={MdmDictCreator} />
                 <Redirect exact from="/mdmdict" to="/mdmdict/dictList"/> 
            </Switch>
        )
    }
}