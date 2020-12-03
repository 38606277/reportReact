
import React from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';
import Loadable from 'react-loadable';
import loading from '../../util/loading.jsx';


export default class DashboardTemplate extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
           template:{
               templateId:'',
               compponent:[
                   {
                       componentInstance:"",
                       componentClassName:"",
                       componentProps:[
                           {propName:'title',propValue:''},
                           {propName:'index',propValue:''},
                           {propName:'minichart',propValue:''},
                           {propName:'foottitle',propValue:''},
                           {propName:'footvalue',propValue:''},
                       ]
                   }
               ],
               layout:[]
           },
        };
        this.handleSubmit = this.handleSubmit.bind(this);
      
    }

    he(){
        this.state.template
    }

   
    render() {
        return (
           <div></div>
        )
    }
}