import React                from 'react';
import { Link }             from 'react-router-dom';
import DictService                 from '../../service/DictService.jsx';
import Pagination           from 'antd/lib/pagination';
import {Table,Divider,Button,Card, Tooltip,Input, Form,Row,Col}  from 'antd';
import  LocalStorge         from '../../util/LogcalStorge.jsx';
const FormItem = Form.Item;
const localStorge = new LocalStorge();
const _dict = new DictService();
const Search = Input.Search;
import './../dict/Dict.scss';
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
        //this.loadUserList();
    }
    loadUserList(){
        let listParam = {};
        listParam.pageNum  = this.state.pageNum;
        listParam.perPage  = this.state.perPage;
        listParam.dictId   = this.state.dictId;
        // 如果是搜索的话，需要传入搜索类型和搜索关键字
        if(this.state.listType === 'search'){
            listParam.value_name    = this.state.value_name;
        }
        _dict.getDictList(listParam).then(response => {
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
    deleteDIctV(id,code){
        if(confirm('确认删除吗？')){
            let p={"dict_id":id,"value_code":code};
            _dict.deleteDict(p).then(response => {
                alert("删除成功");
                this.loadUserList();
            }, errMsg => {
                alert("删除失败");
                // _mm.errorTips(errMsg);
            });
        }
    }

    render(){
        this.state.list.map((item,index)=>{
            item.key=index;
        })
        const dataSource = this.state.list;
          const columns = [{
            title: '编码',
            dataIndex: 'value_code',
            key: 'value_code',
            className:'headerRow',
          },{
            title: '名称',
            dataIndex: 'value_name',
            key: 'value_name',
            className:'headerRow',
          },{
            title: '操作',
            dataIndex: '操作',
            className:'headerRow',
            
          }];
       
        return (
            <div id="page-wrapper">
            <Card title="图片列表">
               
                <Row>
                    
                     <Button href={"#/upload/uploadInfo/null"} style={{ float: "right", marginRight: "30px" }} type="primary">Upload</Button>
                    </Row>
                {/* <Table dataSource={dataSource} columns={columns}  pagination={false}/>
                 <Pagination current={this.state.pageNum} 
                    total={this.state.total} 
                    onChange={(pageNum) => this.onPageNumChange(pageNum)}/>  */}
            </Card>
                
            </div>
        )
    }
}

export default UploadList;