
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
// 页面
import DbsList from './dbsList.jsx';
import DbInfo from './dbInfo.jsx';
import DbView from './dbView.jsx';

class DbsRouter extends React.Component{
    render(){
        return (
            <Switch>
                 <Route path="/dbs/dbsList" component={DbsList} />
                 <Route path="/dbs/dbInfo/:name" component={DbInfo} />
                 <Route path="/dbs/dbView/:name" component={DbView} />
                 <Redirect exact from="/dbs" to="/dbs/dbsList"/> 
            </Switch>
        )
    }
}
export default DbsRouter;