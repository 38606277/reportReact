
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
// 页面
import dataAssetList from './dataAssetList.jsx';
import dataAssetInfo from './dataAssetInfo.jsx';

export default class dataAssetRouter extends React.Component{
    render(){
        return (
            <Switch>
                 <Route path="/dataAsset/dataAssetList" component={dataAssetList} />
                 <Route path="/dataAsset/dataAssetInfo/:dataAsset_id" component={dataAssetInfo} />
                 {/* <Redirect exact from="/dataAsset" to="/dataAsset/dataAssetList"/>  */}
            </Switch>
        )
    }
}