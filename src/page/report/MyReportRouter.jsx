
import React from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';
import Loadable from 'react-loadable';
import loading from '../../util/loading.jsx';

// 页面
const Simple = Loadable({
    loader: () => import('./Simple.jsx'),
    loading: loading,
    delay: 3000
});


class MyReportRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/report/simple" component={Simple} />
              
            </Switch>
        )
    }
}
export default MyReportRouter;