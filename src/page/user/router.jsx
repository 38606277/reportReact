
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
// 页面
import UserList from './userList.jsx';
import UserInfo from './userInfo.jsx';
import UpdatePwd    from './UpdatePwd.jsx';
import UserView from './userView.jsx';

class UserRouter extends React.Component{
    render(){
        return (
            <Switch>
                 <Route path="/user/userList" component={UserList} />
                 <Route path="/user/userInfo/:userId" component={UserInfo} />
                 <Route path="/user/UpdatePwd/:userId" component={UpdatePwd} /> 
                 <Route path="/user/userView/:userId" component={UserView} />
                 <Redirect exact from="/user" to="/user/userList"/> 
            </Switch>
        )
    }
}
export default UserRouter;