/*
* @Author: Rosen
* @Date:   2018-01-13 11:27:21
* @Last Modified by:   Rosen
* @Last Modified time: 2018-02-05 14:02:20
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'

// import Layout from 'component/layout/index.jsx';
import Layout from './page/main/Layout.jsx';
// // 页面
import Home from './page/home/index.jsx';
import ProductRouter from './page/product/router.jsx';
import Login from './page/login/index.jsx';
import UserList from './page/user/index.jsx';
import UserInfo from './page/user/userInfo.jsx';
import User1 from './page/user/User1.jsx';
// import ErrorPage from './page/error/index.jsx';
import functionCreator from './page/function/functionCreator.jsx';
import functionList from './page/function/functionList.jsx';
import QueryList from './page/query/QueryList.jsx';
import EditableTable from './page/function/EditTable.jsx'
// import NavSide from './component/nav-side/NavSide.jsx';
// import './App.css'

class App extends React.Component {

    render() {
        let LayoutRouter = (
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home} />
                     <Route path="/product" component={ProductRouter}/>
                    {/* <Route path="/product-category" component={ProductRouter}/>           */}
                     <Route path="/user/index" component={UserList} />
                    <Route path="/user/userInfo/:userId" component={UserInfo} />
                    <Route path="/user/User1" component={User1} />
                    <Route path="/function/EditableTable" component={EditableTable} />
                    <Route path="/function/functionCreator/:funcid" component={functionCreator} />
                    <Route path="/function/functionList" component={functionList} />
                    <Route path="/query/QueryList" component={QueryList} />
                    {/* <Redirect exact from="/user" to="/user/index" />
                    <Route component={ErrorPage} /> */}
                </Switch>
            </Layout>
        );
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login} />
                    {/* <Route path="/NavSide" component={NavSide} /> */}
                    {/* <Route path="/functionCreator" component={functionCreator}/> */}
                    {/* <Route path="/user/User1" component={User1}/> */}
                    <Route path="/" render={props => LayoutRouter} />
                </Switch>
            </Router>
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('app')
);
