import React        from 'react';
import Task     from '../../service/task-service.jsx';
import  LocalStorge  from '../../util/LogcalStorge.jsx';
import {Card}   from 'antd';
const localStorge = new LocalStorge();
const _product      = new Task();
 import Script from 'react-load-script';
import "babel-polyfill";

class TaskInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            taskId:this.props.match.params.taskId,
            taskInfo:'',
            userId:localStorge.getStorage('userInfo').userId
        };
        
    }
  
   
    componentDidMount(){
        this.loadtaksInfo();
    }
   
    loadtaksInfo(){
        
        _product.getTaskTemplate(this.state.taskId).then(response=>{
           
            this.setState(response.data);
            
            },errMsg => {
             console.log(errMsg);
            
            }).catch(response=>{
                console.log(response);
            // this.setState(response.data);
            });
    }
    onSubmit(){
        console.log(this.state.项目经理);
    }
    
    render() {
       
        return (
        <div id="page-wrapper">
         <Script url="../../src/js/common.js"/> 
         <Script url="../../src/js/jquery.min.js"/>
        <Card title='报表' >
                <div className="form-horizontal">
                    
                   
                    <form id="addtable">
                    <input type='hidden'  id='delId'/>
                    <input type='hidden' value={this.state.taskId} id='taskId'/>
                    <input type='hidden' value={this.state.userId} id='userId'/>
                        <div dangerouslySetInnerHTML={{__html: this.state.taskInfo}} />
                    </form>    


                </div>
           </Card>     
        </div>
        
        );
  }
}


export default TaskInfo;