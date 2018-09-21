/*
* @Author: Rosen
* @Date:   2018-01-13 11:27:21
* @Last Modified by:   Rosen
* @Last Modified time: 2018-02-05 14:02:20
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Redirect, Route} from 'react-router-dom'

// import Layout from 'component/layout/index.jsx';
 import Layout from './page/main/Layout.jsx';
// // 页面

// import Home from './page/home/index.jsx';
import TaskRouter from './page/task/taskrouter.jsx';
import UserRouter from './page/user/router.jsx';
// import Login from './page/login/index.jsx';

// import ErrorPage from './page/error/index.jsx';
// import functionCreator from './page/function/functionCreator.jsx';
// import functionList from './page/function/functionList.jsx';
// import QueryList from './page/query/QueryList.jsx';
// import EditableTable from './page/function/EditTable.jsx'


// import Home from './page/home/index.jsx';
// import ProductRouter from './page/product/router.jsx';
// import Login from './page/login/index.jsx';
// import UserList from './page/user/index.jsx';
// import UserInfo from './page/user/userInfo.jsx';
// import User1 from './page/user/User1.jsx';
//  import ErrorPage from './page/error/index.jsx';
// import functionCreator from './page/function/functionCreator.jsx';
// import functionList from './page/function/functionList.jsx';
// import QueryList from './page/query/QueryList.jsx';
// import EditableTable from './page/function/EditTable.jsx'
// import NavSide from './component/nav-side/NavSide.jsx';
// import './App.css'
import Loadable from 'react-loadable';
import loading from './util/loading.jsx'


const Login = Loadable({
    loader: () => import('./page/login/index.jsx'),
    loading: loading,
    delay:3000
});

const Home = Loadable({
    loader: () => import('./page/home/index.jsx'),
    loading: loading,
    delay:3000
});

const functionList = Loadable({
    loader: () => import('./page/function/functionList.jsx'),
    loading: loading,
    delay:3000
});

const functionCreator = Loadable({
    loader: () => import('./page/function/functionCreator.jsx'),
    loading: loading,
    delay:3000
});

// const UserList = Loadable({
//     loader: () => import('./page/user/index.jsx'),
//     loading: loading,
//     delay:3000
// });

// const UserInfo = Loadable({
//     loader: () => import('./page/user/userInfo.jsx'),
//     loading: loading,
//     delay:3000
// });

class App extends React.Component {

    render() {
        let LayoutRouter = (
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home} />

                     <Route path="/task" component={TaskRouter}/>
                     <Route path="/user" component={UserRouter}/>
                    {/* <Route path="/function/EditableTable" component={EditableTable} /> */}
                    <Route path="/function/functionCreator/:action/:id" component={functionCreator} />

                     {/* <Route path="/product" component={ProductRouter}/>
                     <Route path="/user/index" component={UserList} /> 
                     <Route path="/user/userInfo/:userId" component={UserInfo} /> */}
                    
                    <Route path="/function/functionList" component={functionList} />
                    {/* <Route path="/query/QueryList" component={QueryList} /> */} 
                   
                    {/* <Route component={ErrorPage} /> */}
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
