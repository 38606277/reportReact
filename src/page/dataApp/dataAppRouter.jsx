
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
// 页面
import index from './index/index.jsx';
import finance from './finance.jsx';
import corp from './corp.jsx';
// // import gg from './gg.jsx';
import invest from './invest/invest.jsx';
import financeList from './financeList.jsx';
import CorpCube from './cube/CorpCube.jsx';
// // import graph from './g7.jsx';



export default class dataAppRouter extends React.Component{
    render(){
        return (
            <Switch>
                 <Route path="/dataApp/index" component={index} />
                <Route path="/dataApp/corp" component={corp} />
                <Route path="/dataApp/cube/CorpCube" component={CorpCube} />
                 <Route path="/dataApp/invest" component={invest} />
                 <Route path="/dataApp/financeList" component={financeList} />
                  <Route path="/dataApp/finance/:corp_code/:corp_name" component={finance} />
          
            </Switch>
        )
    }
}