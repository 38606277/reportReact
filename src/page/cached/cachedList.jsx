/*
* @Author: Rosen
* @Date:   2018-01-26 16:48:16
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-31 14:34:10
*/
import React from 'react';
import { Link }             from 'react-router-dom';
import Pagination           from 'antd/lib/pagination';
import {Table,Divider,Button,Card, Tooltip,Input, Form,Spin,Row,Col}  from 'antd';
import CubeService from '../../service/CachedService.jsx';
const _cubeService = new CubeService();
const Search = Input.Search;
const FormItem = Form.Item;

export default class CachedList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list            : [],
            pageNum         : 1,
            perPage         : 10,
            listType        :'list',
            cube_name:'',
            loading:false,
        };
    }
    componentDidMount(){
        this.loadCubeList();
    }
    loadCubeList(){
        let listParam = {};
        listParam.pageNum  = this.state.pageNum;
        listParam.perPage  = this.state.perPage;
        // 如果是搜索的话，需要传入搜索类型和搜索关键字
        
        this.setState({loading:true});
        _cubeService.getCubeList(listParam).then(response => {
            this.setState({list:response.data,total:10,loading:false});
        }, errMsg => {
            this.setState({
                list : [],loading:false
            });
            // _mm.errorTips(errMsg);
        });
    }
    // 页数发生变化的时候
    onPageNumChange(pageNum){
        this.setState({
            pageNum : pageNum
        }, () => {
            this.loadCubeList();
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
     onSearch(cube_name){
        let listType = cube_name === '' ? 'list' : 'search';
        this.setState({
            listType:listType,
            pageNum         : 1,
            cube_name   : cube_name
        }, () => {
            this.loadCubeList();
        });
    }
    deleteCube(id){
        if(confirm('确认删除吗？')){
            _cubeService.delCube(id).then(response => {
                alert("删除成功");
                this.loadCubeList();
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
        let self = this;
          const columns = [{
            title: 'ID',
            dataIndex: 'cube_id',
            key: 'cube_id',
            className:'headerRow',
          },{
            title: '名称',
            dataIndex: 'cube_name',
            key: 'cube_name',
            className:'headerRow',
          },{
            title: '描述',
            dataIndex: 'cube_desc',
            key: 'cube_desc',
            className:'headerRow',
          },{
            title: '操作',
            dataIndex: '操作',
            className:'headerRow',
            render: (text, record) => (
                <span>
                  <Link to={ `/cube/cubeInfo/${record.cube_id}` }>编辑</Link>
                  <Divider type="vertical" />
                  <a onClick={()=>this.deleteCube(`${record.cube_id}`)} href="javascript:;">删除</a>
                </span>
              ),
          }];
       
        return (
            <div id="page-wrapper">
            <Spin  spinning={this.state.loading} delay={100}>
            <Card title="多维列表">
                {/* <Tooltip>
                     <Search
                        style={{ width: 300,marginBottom:'10px' }}
                        placeholder="请输入..."
                        enterButton="查询"
                        onSearch={value => this.onSearch(value)}
                        />
                </Tooltip>
                <Tooltip>
                    <Button href="#/cube/cubeInfo/null" style={{ float: "right", marginRight: "30px" }} type="primary">新建</Button>
                </Tooltip> */}
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
                     <Button href="#/cube/cubeInfo/null" style={{ float: "right", marginRight: "30px" }} type="primary">新建</Button>

                     </Col> 
                     </Row>
                <Table dataSource={dataSource} columns={columns}  pagination={false}/>
                 <Pagination current={this.state.pageNum} 
                    total={this.state.total} 
                    onChange={(pageNum) => this.onPageNumChange(pageNum)}/> 
            </Card>
                </Spin>
            </div>
        )
    }
}
