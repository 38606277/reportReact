/*
* @Author: Rosen
* @Date:   2018-01-31 13:06:57
* @Last Modified by:   Rosen
* @Last Modified time: 2018-02-04 22:21:43
*/
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'

// 页面
import IndextList      from 'page/product/index/index.jsx';
import TaskInfo         from 'page/product/index/taskInfo.jsx';
import TaskInfoView     from 'page/product/index/taskInfo-view.jsx';
import TaskList         from 'page/product/index/task-list.jsx';

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