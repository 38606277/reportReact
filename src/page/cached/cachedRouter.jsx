
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
// 页面
import CachedList from './cachedList.jsx';
import CachedInfo from './cachedInfo.jsx';
import temp from './temp.jsx';
import templist from './templist.jsx';
class CachedRouter extends React.Component{
    render(){
        return (
            <Switch>
                 <Route path="/cached/cachedList" component={CachedList} />
                 <Route path="/cached/cachedInfo/:cached_id" component={CachedInfo} />
                 <Route path="/temp/templist" component={templist} />
                 <Route path="/temp/temp" component={temp} />
                 <Redirect exact from="/temp" to="/temp/temp"/> 
            </Switch>
        )
    }
}
export default CachedRouter;