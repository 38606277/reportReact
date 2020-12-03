import React        from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Table, Button, Modal, Card, Row, Col, Pagination, message } from 'antd';
import LocalStorge  from '../../util/LogcalStorge.jsx';
import CubeService from '../../service/CachedService.jsx';
const _cubeService = new CubeService();
const localStorge = new LocalStorge();
const FormItem = Form.Item;
const Search = Input.Search;
class CachedInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            confirmDirty: false,
            cached_id:this.props.match.params.cached_id,
            cachedContent:null,
        };
        
      
    }
    
 //初始化加载调用方法
    componentDidMount(){
       if(null!=this.state.cached_id && ''!=this.state.cached_id  && 'null'!=this.state.cached_id){
        _cubeService.getCubeInfo(this.state.cached_id).then(response => {
                this.setState({cachedContent:response.data});
                
            }, errMsg => {
                this.setState({
                });
                localStorge.errorTips(errMsg);
            });
        }
        
    }


  render() {
    
   
    return (
        <div id="page-wrapper">
        <Card title='详情'>
        
        <Row>
             <Col xs={24} sm={12}>
                  {this.state.cachedContent}
              </Col>
              
        </Row> 
          
          
      </Card>
      
      </div>
    );
  }
}
export default CachedInfo;