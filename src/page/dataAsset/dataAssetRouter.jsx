
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
// 页面
import dataAssetLake from './dataAssetLake.jsx';
import dataAssetList from './dataAssetList.jsx';
import dataAssetInfo from './dataAssetInfo.jsx';
import dataAssetInfonold from './dataAssetInfonold.jsx';
import dataadd from './index.jsx';//新建
import Xy from './Primordial.jsx';
import ModelList from './modelList.jsx';
import addList from './newlform.jsx';
import addModule from './addModule.jsx';
import dataAssetListInfo from './dataAssetListInfo.jsx';
import TatalAssets from './totalAssets.jsx'
import dataAssetInfonew from './dataAssetInfonew.jsx';

export default class dataAssetRouter extends React.Component{
    render(){
        return (
            <Switch>
                 <Route path="/dataAsset/dataAssetList" component={dataAssetList} />
                 <Route path="/dataAsset/dataAssetLake" component={dataAssetLake} />
                 <Route path="/dataAsset/dataAssetInfo/:dataAsset_id" component={dataAssetInfo} />
                 <Route path="/dataAsset/dataAssetInfonew/:host_id/:dbType/:table_name" component={dataAssetInfonew} />
                 <Route path="/dataAsset/index" component={dataadd} />
                 <Route path="/dataAsset/Primordial" component={Xy} />
                 <Route path="/dataAsset/modelList" component={ModelList} />
                 <Route path='/dataAsset/newlform/:module_id' component={addList}/>
                 <Route path='/dataAsset/dataAssetListInfo/:temphost_id/:temptable_name/:tempdbtype_id' component={dataAssetListInfo}/>
                 <Route path='/dataAsset/addmodule' component={addModule}/>
                 <Route path='/dataAsset/totalAssets' component={TatalAssets}/>
                 {/* <Redirect exact from="/dataAsset" to="/dataAsset/dataAssetList"/>  */}
            </Switch>
        )
    }
}