
import React from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';
import Loadable from 'react-loadable';
import loading from '../../util/loading.jsx';

// 页面
const FunctionClass = Loadable({
    loader: () => import('./FunctionClass.jsx'),
    loading: loading,
    delay: 3000
});

const functionList = Loadable({
    loader: () => import(/* webpackChunkName: "functionList" */'./functionList.jsx'),
    loading: loading,
    delay:3000
});

const functionCreator = Loadable({
    loader: () => import('./functionCreator.jsx'),
    loading: loading,
    delay:3000
});

class FunctionRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/function/functionClass" component={FunctionRouter} />
                <Route path="/function/functionCreator/:action/:id" component={functionCreator} />
                <Route path="/function/functionList" component={functionList} />
                <Redirect exact from="/function/functionClass" to="/function/functionClass" />
            </Switch>
        )
    }
}
export default FunctionRouter;