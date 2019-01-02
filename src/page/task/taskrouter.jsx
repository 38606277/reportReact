
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
// 页面
import AgencyTaskList      from './AgencyTaskList.jsx';
import TaskInfo         from './taskInfo.jsx';
import TaskInfoView     from './taskInfoView.jsx';
import TaskList         from './taskList.jsx';

class TaskRouter extends React.Component{
    render(){
        return (
            <Switch>
                <Route path="/task/AgencyTaskList" component={AgencyTaskList}/>
                <Route path="/task/taskList" component={TaskList}/>
                <Route path="/task/taskInfo/:taskId" component={TaskInfo}/>
                <Route path="/task/taskInfoView/:taskId" component={TaskInfoView}/>
                <Redirect exact from="/task" to="/task/AgencyTaskList"/> 
            </Switch>
        )
    }
}
export default TaskRouter;