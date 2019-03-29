
import React                from 'react';
import { Link }             from 'react-router-dom';
import HttpService from '../../util/HttpService.jsx';
import Pagination           from 'antd/lib/pagination';
import {Table,Divider,Button,Card, Tooltip,Input, Form,Row,Col}  from 'antd';
import  LocalStorge         from '../../util/LogcalStorge.jsx';
const FormItem = Form.Item;
const localStorge = new LocalStorge();
const Search = Input.Search;
class NlpList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list            : [],
            pageNum         : 1,
            perPage         : 10,
            listType        :'list',
            dbname:''
        };
    }
    componentDidMount(){
        this.loadUserList();
    }
    loadUserList(){
        let listParam = {};
        listParam.pageNum  = this.state.pageNum;
        listParam.perPage  = this.state.perPage;
        // 如果是搜索的话，需要传入搜索类型和搜索关键字
        if(this.state.listType === 'search'){
            listParam.dbname    = this.state.dbname;
        }
        HttpService.post("reportServer/nlp/getAll", JSON.stringify(listParam))
            .then(res => {
                if (res.resultCode == "1000") {
                    this.setState(res.data);
                }
                else
                    message.error(res.message);
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
     onSearch(dbname){
        let listType = dbname === '' ? 'list' : 'search';
        this.setState({
            listType:listType,
            pageNum         : 1,
            dbname   : dbname
        }, () => {
            this.loadUserList();
        });
    }
    deleteRole(id){
        if(confirm('确认删除吗？')){
            let p={tid:id}
            HttpService.post("reportServer/nlp/deleteTC", JSON.stringify(p))
            .then(res => {
                if (res.resultCode == "1000") {
                    alert("删除成功");
                    this.loadUserList();
                }
                else
                    message.error(res.message);
            });
         }
    }

    render(){
        this.state.list.map((item,index)=>{
            item.key=index;
        })
        const dataSource = this.state.list;
        let self = this;
          const columns = [{
            title: '数据库名',
            dataIndex: 'table_db',
            key: 'table_db',
            className:'headerRow',
          }, {
            title: '表名',
            dataIndex: 'table_name',
            key: 'table_name',
            className:'headerRow',
          },{
            title: '自然语言一',
            dataIndex: 'table_nlp1',
            key: 'table_nlp1',
            className:'headerRow',
        },{
            title: '自然语言二',
            dataIndex: 'table_nlp2',
            key: 'table_nlp2',
            className:'headerRow',
        },{
            title: '自然语言三',
            dataIndex: 'table_nlp3',
            key: 'table_nlp3',
            className:'headerRow',
        },{
            title: '自然语言四',
            dataIndex: 'table_nlp4',
            key: 'table_nlp4',
            className:'headerRow',
          },{
            title: '操作',
            dataIndex: '操作',
            className:'headerRow',
            render: (text, record) => (
                <span>
                  <Link to={ `/query/nlpCreator/${record.table_id}` }>编辑</Link>
                  <Divider type="vertical" />
                   <a onClick={()=>this.deleteRole(`${record.table_id}`)} href="javascript:;">删除</a>
                </span>
              ),
          }];
       
        return (
            <div id="page-wrapper">
            <Card title="列表">
                <Row>
                    <Col xs={24} sm={12}>
                    <Search
                        style={{ maxWidth: 300,marginBottom:'10px' }}
                        placeholder="请输入表名"
                        enterButton="查询"
                        onSearch={value => this.onSearch(value)}
                        />
                     </Col>
                     <Col xs={24} sm={12}>
                        <Button href="#/query/nlpCreator/null" style={{ float: "right", marginRight: "30px" }} type="primary">新建</Button>

                     </Col> 
                     </Row>    
                <Table dataSource={dataSource} columns={columns}  pagination={false}/>
                 <Pagination current={this.state.pageNum} 
                    total={this.state.total} 
                    onChange={(pageNum) => this.onPageNumChange(pageNum)}/> 
            </Card>
                
            </div>
        )
    }
}

export default NlpList;