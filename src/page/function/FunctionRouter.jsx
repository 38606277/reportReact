
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';
import Loadable from 'react-loadable';
import loading from '../../util/loading';
// 页面
//import ExecQuery from './ExecQuery.jsx';
const FunctionClass = Loadable({
    loader: () => import('./FunctionClass.jsx'),
    loading: loading,
    delay:3000
});


class FunctionRouter extends React.Component{
    render(){
        return (
            <Switch>
                 <Route path="/function/functionClass" component={FunctionClass} />
                 <Redirect exact from="/function/functionClass" to="/function/functionClass"/> 
            </Switch>
        )
    }
}
export default FunctionRouter;