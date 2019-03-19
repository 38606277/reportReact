
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';
import Loadable from 'react-loadable';
import loading from '../../util/loading.jsx';
// 页面


const UploadList = Loadable({
    loader: () => import('./UploadList.jsx'),
    loading: loading,
    delay:3000
});



const UploadInfo = Loadable({
    loader: () => import('./UploadInfo.jsx'),
    loading: loading,
    delay:3000
});


export default class UploadRouter extends React.Component{
    render(){
        return (
            <Switch>
                 <Route path="/upload/UploadList" component={UploadList} />
                 <Route path="/upload/UploadInfo/:id" component={UploadInfo} />
                <Redirect exact from="/upload" to="/upload/UploadList"/> 
            </Switch>
        )
    }
}