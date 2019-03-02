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
import './Dict.scss';
class DictValueList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dictId:this.props.match.params.dictId,
            list            : [],
            pageNum         : 1,
            perPage         : 10,
            listType        :'list',
            value_name:''
        };
    }
    componentDidMount(){
        this.loadUserList();
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
          }, {
            title: '简称1',
            dataIndex: 'abbr_name1',
            key: 'abbr_name1',
            className:'headerRow',
          },{
            title: '简称2',
            dataIndex: 'abbr_name2',
            key: 'abbr_name2',
            className:'headerRow',
          },{
            title: '操作',
            dataIndex: '操作',
            className:'headerRow',
            render: (text, record) => (
                <span>
                  <Link to={ `/dict/DictValueInfo/${record.dict_id}/${record.value_code}` }>编辑</Link>
                  <Divider type="vertical" />
                   <a onClick={()=>this.deleteDIctV(`${record.dict_id}`,`${record.value_code}`)} href="javascript:;">删除</a>
                </span>
              ),
          }];
       
        return (
            <div id="page-wrapper">
            <Card title="字典列表">
               
                <Row>
                    <Col xs={24} sm={12}>
                    <Search
                        style={{ maxWidth: 300,marginBottom:'10px' }}
                        placeholder="请输入..."
                        enterButton="查询"
                        onSearch={value => this.onSearch(value)}
                        />
                     </Col>
                     <Col xs={24} sm={12}>
                     <Button href={"#/dict/DictValueInfo/"+this.state.dictId+"/null"} style={{ float: "right", marginRight: "30px" }} type="primary">新建字典</Button>

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

export default DictValueList;