
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
// 页面
import dataAnalysisList from './dataAnalysisList.jsx';
import reportForm from './reportForm.jsx'//新建电子表格
import ElectronicFormList from './ElectronicFormList.jsx'//电子表格列表
import addMouldForm from './addMouldForm.jsx'//创建电子表格模板
import algorithm from './algorithm.jsx'//模型算法
import moduleList from './moduleList.jsx'//模型管理 
export default class dataAnalysisRouter extends React.Component{
    render(){
        return (
            <Switch>
                 <Route path="/dataAnalysis/dataAnalysisList" component={dataAnalysisList} />
                 <Route path="/dataAnalysis/reportForm" component={reportForm} />
                 <Route path="/dataAnalysis/ElectronicFormList" component={ElectronicFormList} />
                 <Route path="/dataAnalysis/algorithm" component={algorithm} />
                 <Route path="/dataAnalysis/moduleList" component={moduleList} />
            </Switch>
        )
    }
}