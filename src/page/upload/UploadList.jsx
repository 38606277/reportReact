import React                from 'react';
import { Link }             from 'react-router-dom';
import DictService                 from '../../service/DictService.jsx';
import Pagination           from 'antd/lib/pagination';
import {Avatar,Divider,Button,Card, List,Input, Form,Row,Col,Icon}  from 'antd';
import  LocalStorge         from '../../util/LogcalStorge.jsx';
import HttpService from '../../util/HttpService.jsx';
const Item = List.Item;
const localStorge = new LocalStorge();
const _dict = new DictService();
const Search = Input.Search;
import './../dict/Dict.scss';

const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );
  const url=window.getServerUrl();
class UploadList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list            : [],
            pageNum         : 1,
            perPage         : 10
            
        };
    }
    componentDidMount(){
        this.loadUserList();
    }
    loadUserList(){
        let listParam = {};
        listParam.pageNum  = this.state.pageNum;
        listParam.perPage  = this.state.perPage;
        
        HttpService.post("/reportServer/uploadFile/getAll",JSON.stringify(listParam)).then(response => {
            this.setState({list:response.data.list,total:response.data.total});
        }, errMsg => {
            this.setState({
                list : []
            });
            // _mm.errorTips(errMsg);
        });
    }
    // 页数发生变化的时候
    onPageNumChange(pageNum){
        this.setState({
            pageNum : pageNum
        }, () => {
            this.loadUserList();
        });
    }
    // 数据变化的时候
    onValueChange(e){
        let name    = e.target.name,
            value   = e.target.value.trim();
        this.setState({
            [name] : value
        });
    }
     // 搜索
     onSearch(value_name){
        let listType = value_name === '' ? 'list' : 'search';
        this.setState({
            listType:listType,
            pageNum         : 1,
            value_name   : value_name
        }, () => {
            this.loadUserList();
        });
    }
    deleteUpload(id){
        if(confirm('确认删除吗？')){
            let p={"id":id};
            HttpService.post("/reportServer/uploadFile/deleteUpload",JSON.stringify(p))
            .then(response => {
                    this.loadUserList();
                }, errMsg => {
                this.setState({
                    list : []
                });
                // _mm.errorTips(errMsg);
            }).catch((error)=>{
                
            });
           
        }
    }

    render(){
        this.state.list.map((item,index)=>{
            item.key=index;
        })
        const dataSource = this.state.list;
        
        return (
            <div id="page-wrapper">
            <Card title="图片列表">
                <Row>
                    <Button href={"#/upload/uploadInfo/null"} style={{ float: "right", marginRight: "30px" }} type="primary">Upload</Button>
                </Row>
                <List
                    itemLayout="horizontal"
                    size="large"
                    // pagination={{
                    // onChange: (page) => {
                    //     console.log(page);
                    // },
                    // pageSize: 10,
                    // }}
                    dataSource={dataSource}
                    renderItem={item => (
                        <List.Item actions={[<Button onClick={()=>this.deleteUpload(item.id)}>delete</Button>]}>
                            <List.Item.Meta
                                avatar={<Avatar src={url+"/report/"+item.usefilepath} />}
                                title={item.fileoriginname}
                                description={item.filepath}
                            />
                            <div>{item.filename}</div>
                        </List.Item>
                        )}
                    />
                    
                
                {/* <Table dataSource={dataSource} columns={columns}  pagination={false}/> */}
                 <Pagination current={this.state.pageNum} 
                    total={this.state.total} 
                    onChange={(pageNum) => this.onPageNumChange(pageNum)}/> 
            </Card>
                
            </div>
        )
    }
}

export default UploadList;