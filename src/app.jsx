import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Redirect, Route} from 'react-router-dom'

import Loadable from 'react-loadable';
import loading from './util/loading.jsx'
import './App.css'


import Layout from './page/main/Layout.jsx';

const TaskRouter = Loadable({
    loader: () => import('./page/task/taskrouter.jsx'),
    loading: loading,
    delay:3000
});

const UserRouter = Loadable({
    loader: () => import('./page/user/router.jsx'),
    loading: loading,
    delay:3000
});

const DbsRouter = Loadable({
    loader: () => import('./page/system/dbs/dbsrouter.jsx'),
    loading: loading,
    delay:3000
});
const RuleRouter = Loadable({
    loader: () => import('./page/system/rule/rulerouter.jsx'),
    loading: loading,
    delay:3000
});

const RoleRouter = Loadable({
    loader: () => import('./page/system/role/rolerouter.jsx'),
    loading: loading,
    delay:3000
});

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



const Auth = Loadable({
    loader: () => import('./page/user/Auth.jsx'),
    loading: loading,
    delay:3000
});
const AuthTypeRouter = Loadable({
    loader: () => import('./page/system/authType/authTypeRouter.jsx'),
    loading: loading,
    delay:3000
});


const DictRouter = Loadable({
    loader: () => import('./page/dict/DictRouter.jsx'),
    loading: loading,
    delay:3000
});
const QueryRouter = Loadable({
    loader: () => import('./page/query/QueryRouter.jsx'),
    loading: loading,
    delay:3000
});

const FunctionRouter = Loadable({
    loader: () => import('./page/function/FunctionRouter.jsx'),
    loading: loading,
    delay:3000
});

const dashboardRouter = Loadable({
    loader: () => import('./page/dashboard/dashboardRouter.jsx'),
    loading: loading,
    delay:3000
});

function LoadPage(url){
//    console.log(Loadable({
//         loader: () => import(url),
//         loading: loading,
//         delay:3000
//     }));
            
console.log(UserInfo);
}

class App extends React.Component {
    render() {
        let LayoutRouter = (
            <Layout>
                <Switch>
                     <Route exact path="/" component={Home} />
                     <Route path="/dashboard" component={dashboardRouter}/>
                     <Route path="/task" component={TaskRouter}/>
                     <Route path="/user" component={UserRouter}/>
                     <Route path="/dbs" component={DbsRouter}/>
                     <Route path="/rule" component={RuleRouter}/>
                     <Route path="/Auth" component={Auth}/>
                     <Route path="/role" component={RoleRouter}/>
                     <Route path="/authType" component={AuthTypeRouter}/>
                     <Route path="/query" component={QueryRouter}/>
                     <Route path="/dict" component={DictRouter}/>
                     <Route path="/function" component={FunctionRouter}/>
                </Switch>
            </Layout>
        );
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login} />
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
