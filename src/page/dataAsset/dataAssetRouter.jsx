
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
// 页面
import Loadable from 'react-loadable';
import loading from '../../util/loading.jsx';
const DataAssetLake = Loadable({
    loader:()=>import(/* webpackChunkName: "DataAssetLake" */ './dataAssetLake.jsx'),
    loading:loading,
    delay:3000
});
const DataAssetList = Loadable({
    loader:()=>import(/* webpackChunkName: "DataAssetList" */ './dataAssetList.jsx'),
    loading:loading,
    delay:3000
});
const DataAssetInfot = Loadable({
    loader:()=>import(/* webpackChunkName: "DataAssetInfot" */ './dataAssetInfo.jsx'),
    loading:loading,
    delay:3000
});
// import dataAssetList from './dataAssetList.jsx';
// import dataAssetInfo from './dataAssetInfo.jsx';
import dataadd from './index.jsx'//新建
import Xy from './Primordial.jsx'
import modelList from './modelList.jsx';
import addList from './newlform.jsx'
import addModule from './addModule.jsx'
import TatalAssets from './totalAssets.jsx'
export default class dataAssetRouter extends React.Component{
    render(){
        return (
            <Switch>
                 <Route path="/dataAsset/dataAssetList" component={DataAssetList} />
                 <Route path="/dataAsset/dataAssetLake" component={DataAssetLake} />
                 <Route path="/dataAsset/dataAssetInfo/:dataAsset_id" component={DataAssetInfot} />
                 <Route path="/dataAsset/index" component={dataadd} />
                 <Route path="/dataAsset/Primordial" component={Xy} />
                 <Route path="/dataAsset/modelList" component={modelList} />
                 <Route path='/dataAsset/newlform/:module_id' component={addList}/>
                 <Route path='/dataAsset/addmodule' component={addModule}/>
                 <Route path='/dataAsset/totalAssets' component={TatalAssets}/>
                 {/* <Redirect exact from="/dataAsset" to="/dataAsset/dataAssetList"/>  */}
            </Switch>
        )
    }
}