import React        from 'react';
import { Link }     from 'react-router-dom';
import MUtil        from 'util/mm.jsx'
import PageTitle    from 'component/page-title/index.jsx';
import Product      from 'service/product-service.jsx'
const _mm   = new MUtil();
const _product      = new Product();


class TaskInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            taskId:this.props.match.params.taskId,
            taskobj:'',
            '项目经理':''
        };
       
    }
  
   
    componentDidMount(){
        this.loadtaksInfo();
    }
   
    loadtaksInfo(){
        _product.getTaskTemplate(this.state.taskId).then(res => {
          
            this.setState(res);
            
        }, errMsg => {
            this.setState({
                
            });
            _mm.errorTips(errMsg);
        });
    }
    onSubmit(){
        console.log(this.state.项目经理);
    }
    
    render() {
       
        return (
        <div id="page-wrapper">
        <PageTitle title='报表' />
                <div className="form-horizontal">
                    
                   
                    <form id="addtable">
                        <div dangerouslySetInnerHTML={{__html: this.state.taskInfo}} />
                    </form>    


                </div>
                
        </div>
        
        );
  }
}


export default TaskInfo;