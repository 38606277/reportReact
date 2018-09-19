
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
// 页面
import IndextList      from './index/index.jsx';
import TaskInfo         from './index/taskInfo.jsx';
import TaskInfoView     from './index/taskInfo-view.jsx';
import TaskList         from './index/task-list.jsx';

class ProductRouter extends React.Component{
    render(){
        return (
            <Switch>
                <Route path="/product/index" component={IndextList}/>
                <Route path="/product/taskList" component={TaskList}/>
                <Route path="/product/taskInfo/:taskId" component={TaskInfo}/>
                <Route path="/product/taskInfoView/:taskId" component={TaskInfoView}/>
                {/* <Redirect exact from="/product" to="/product/index"/> */}
                {/* <Redirect exact from="/product-category" to="/product-category/index"/> */}
            </Switch>
        )
    }
}
export default ProductRouter;