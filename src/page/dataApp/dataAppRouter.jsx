
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
// 页面
import index from './index/index.jsx';
import finance from './finance.jsx';
import corp from './corp.jsx';
import demo from './g6.jsx';
// import graph from './g7.jsx';



export default class dataAppRouter extends React.Component{
    render(){
        return (
            <Switch>
                 <Route path="/dataApp/index" component={index} />
                 <Route path="/dataApp/corp" component={corp} />
                 <Route path="/dataApp/demo" component={demo} />
                 {/* <Route path="/dataApp/g7" component={graph} /> */}
                 <Route path="/dataApp/finance/:corp" component={finance} />
                 
                 
                 {/* <Redirect exact from="/dataAsset" to="/dataAsset/dataAssetList"/>  */}
            </Switch>
        )
    }
}