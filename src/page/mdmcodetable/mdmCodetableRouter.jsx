
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';
import Loadable from 'react-loadable';
import loading from '../../util/loading.jsx';
// 页面


const mdmDictList = Loadable({
    loader: () => import(/* webpackChunkName: "codetableList" */ './codetableList.jsx'),
    loading: loading,
    delay:3000
});

const MdmDictCreator = Loadable({
    loader: () => import(/* webpackChunkName: "codetable" */ './codetable.jsx'),
    loading: loading,
    delay:3000
});

export default class DictRouter extends React.Component{
    render(){
        return (
            <Switch>
                 <Route path="/mdmcodetable/codetableList" component={mdmDictList} />
                 <Route path="/mdmcodetable/codetable/:dict_id" component={MdmDictCreator} />
                 <Redirect exact from="/mdmcodetable" to="/mdmcodetable/codetableList"/> 
            </Switch>
        )
    }
}