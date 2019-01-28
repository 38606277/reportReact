
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
// 页面
import CachedList from './cachedList.jsx';
import CachedInfo from './cachedInfo.jsx';
class CachedRouter extends React.Component{
    render(){
        return (
            <Switch>
                 <Route path="/cached/cachedList" component={CachedList} />
                 <Route path="/cached/cachedInfo/:cached_id" component={CachedInfo} />
                 <Redirect exact from="/cached" to="/cached/cachedList"/> 
            </Switch>
        )
    }
}
export default CachedRouter;