
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
// 页面
import dataAssetList from './dataAssetList.jsx';
import dataAssetInfo from './dataAssetInfo.jsx';
import dataadd from './index.jsx'//新建
import Xy from './Primordial.jsx'
import modelList from './modelList.jsx';
import addList from './addmodules'
import NewForm from './newlform'
export default class dataAssetRouter extends React.Component{
    render(){
        return (
            <Switch>
                 <Route path="/dataAsset/dataAssetList" component={dataAssetList} />
                 <Route path="/dataAsset/dataAssetInfo/:dataAsset_id" component={dataAssetInfo} />
                 <Route path="/dataAsset/index" component={dataadd} />
                 <Route path="/dataAsset/Primordial" component={Xy} />
                 <Route path="/dataAsset/modelList" component={modelList} />
                 <Route path='/dataAsset/addLists' component={addList}/>
                 <Route path='/dataAsset/newlform' component={NewForm}/>
                 {/* <Redirect exact from="/dataAsset" to="/dataAsset/dataAssetList"/>  */}
            </Switch>
        )
    }
}