
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
import Loadable from 'react-loadable';
import loading from '../../util/loading.jsx';
// 页面
// import dataAssetLake from './dataAssetLake.jsx';
// import dataAssetList from './dataAssetList.jsx';
// import dataAssetInfo from './dataAssetInfo.jsx';
// import dataAssetInfonold from './dataAssetInfonold.jsx';
// import dataadd from './index.jsx';//新建
// import Xy from './Primordial.jsx';
// import ModelList from './modelList.jsx';
// import addList from './newlform.jsx';
// import addModule from './addModule.jsx';
// import dataAssetListInfo from './dataAssetListInfo.jsx';
// import TatalAssets from './totalAssets.jsx'
// import dataAssetInfonew from './dataAssetInfonew.jsx';
const Xy = Loadable({
    loader:()=>import(/* webpackChunkName: "Xy" */ './Primordial.jsx'),
    loading:loading,
    delay:3000
});
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
const DataAssetInfo = Loadable({
    loader:()=>import(/* webpackChunkName: "DataAssetInfo" */ './dataAssetInfo.jsx'),
    loading:loading,
    delay:3000
});
const DataAssetInfonew = Loadable({
    loader:()=>import(/* webpackChunkName: "DataAssetInfonew" */ './dataAssetInfonew.jsx'),
    loading:loading,
    delay:3000
});
const Dataadd = Loadable({
    loader:()=>import(/* webpackChunkName: "Dataadd" */ './index.jsx'),
    loading:loading,
    delay:3000
});
const ModelList = Loadable({
    loader:()=>import(/* webpackChunkName: "ModelList" */ './modelList.jsx'),
    loading:loading,
    delay:3000
});
const AddList = Loadable({
    loader:()=>import(/* webpackChunkName: "AddList" */ './newlform.jsx'),
    loading:loading,
    delay:3000
});
const DataAssetListInfo = Loadable({
    loader:()=>import(/* webpackChunkName: "DataAssetListInfo" */ './dataAssetListInfo.jsx'),
    loading:loading,
    delay:3000
});
const AddModule = Loadable({
    loader:()=>import(/* webpackChunkName: "AddModule" */ './addModule.jsx'),
    loading:loading,
    delay:3000
});
const TatalAssets = Loadable({
    loader:()=>import(/* webpackChunkName: "TatalAssets" */ './totalAssets.jsx'),
    loading:loading,
    delay:3000
});
export default class dataAssetRouter extends React.Component{
    render(){
        return (
            <Switch>
                 <Route path="/dataAsset/dataAssetList" component={DataAssetList} />
                 <Route path="/dataAsset/dataAssetLake" component={DataAssetLake} />
                 <Route path="/dataAsset/dataAssetInfo/:dataAsset_id" component={DataAssetInfo} />
                 <Route path="/dataAsset/dataAssetInfonew/:host_id/:dbType/:table_name" component={DataAssetInfonew} />
                 <Route path="/dataAsset/index" component={Dataadd} />
                 <Route path="/dataAsset/Primordial" component={Xy} />
                 <Route path="/dataAsset/modelList" component={ModelList} />
                 <Route path='/dataAsset/newlform/:module_id' component={AddList}/>
                 <Route path='/dataAsset/dataAssetListInfo/:temphost_id/:temptable_name/:tempdbtype_id' component={DataAssetListInfo}/>
                 <Route path='/dataAsset/addmodule' component={AddModule}/>
                 <Route path='/dataAsset/totalAssets' component={TatalAssets}/>
                 {/* <Redirect exact from="/dataAsset" to="/dataAsset/dataAssetList"/>  */}
            </Switch>
        )
    }
}