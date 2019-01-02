
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
// 页面
import CubeList from './cubeList.jsx';
import CubeInfo from './cubeInfo.jsx';
class CubeRouter extends React.Component{
    render(){
        return (
            <Switch>
                 <Route path="/cube/cubeList" component={CubeList} />
                 <Route path="/cube/cubeInfo/:cube_id" component={CubeInfo} />
                 <Redirect exact from="/cube" to="/cube/cubeList"/> 
            </Switch>
        )
    }
}
export default CubeRouter;