import React        from 'react';
import {Card}   from 'antd';
import Task     from '../../service/task-service.jsx'
import './../../App.css';
import  LocalStorge  from '../../util/LogcalStorge.jsx';
import Script from 'react-load-script';
const localStorge = new LocalStorge();
const _product      = new Task();
const showHeader = false;

class TaskInfoView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            taskId:this.props.match.params.taskId,
            taskInfo:'',
            dataList:[],
            fieldList:[],
            showHeader:true,
            userId:localStorge.getStorage('userInfo').userId
        };
    }
   
    componentDidMount(){
        this.loadtaksInfo();
    }
   
    loadtaksInfo(){
        _product.viewTaskTemplate(this.state.taskId).then(response => {
            this.setState(response.data);
        }, errMsg => {
            this.setState({
                
            });
            localStorge.errorTips(errMsg);
        });
    }
   

    render() {
       
        return (
        <div id="page-wrapper">
           <Script url="../../src/js/common.js"/> 
         <Script url="../../src/js/jquery.min.js"/>

         <Card title='报表' >
                <div className="form-horizontal">
                    <div dangerouslySetInnerHTML={{__html: this.state.taskInfo}} />
                   
                </div>
         </Card>       
        </div>
        
        )
  }
}
export default TaskInfoView;