
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
// 页面
import dataAnalysisList from './dataAnalysisList.jsx';
import ElectronicFormList from './ElectronicFormList.jsx'//电子表格列表
import addMouldForm from './addMouldForm.jsx'//创建电子表格模板
export default class dataAnalysisRouter extends React.Component{
    render(){
        return (
            <Switch>
                 <Route path="/dataAnalysis/dataAnalysisList" component={dataAnalysisList} />
                 <Route path="/dataAnalysis/ElectronicFormList" component={ElectronicFormList} />
                 <Route path="/dataAnalysis/addMouldForm" component={addMouldForm} />
            </Switch>
        )
    }
}