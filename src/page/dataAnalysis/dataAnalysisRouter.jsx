
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
// 页面
import dataAnalysisList from './dataAnalysisList.jsx';
import ElectronicForm from './ElectronicForm.jsx'//新建电子表格
import ElectronicFormList from './ElectronicFormList.jsx'//电子表格列表
import reportForm from './reportForm.jsx'//报表
export default class dataAnalysisRouter extends React.Component{
    render(){
        return (
            <Switch>
                 <Route path="/dataAnalysis/dataAnalysisList" component={dataAnalysisList} />
                 <Route path="/dataAnalysis/ElectronicForm" component={ElectronicForm} />
                 <Route path="/dataAnalysis/ElectronicFormList" component={ElectronicFormList} />
                 <Route path="/dataAnalysis/reportForm" component={reportForm} />
            </Switch>
        )
    }
}