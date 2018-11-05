
import React from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';
import Loadable from 'react-loadable';
import loading from '../../util/loading.jsx';
import analysis from './analysis.jsx';
import monitor from './monitor.jsx';

class FunctionRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/dashboard/analysis" component={analysis} />
                <Route path="/dashboard/monitor" component={monitor} />
            </Switch>
        )
    }
}
export default FunctionRouter;