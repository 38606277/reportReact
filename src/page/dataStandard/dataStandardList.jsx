import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import style from './dataStandard.less'
import Pagination from 'antd/lib/pagination';
import Icon, { PlusCircleOutlined, LineChartOutlined, PieChartOutlined, ProfileOutlined ,SearchOutlined ,PlusOutlined,MoreOutlined} from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import {
    Table,
    Divider,
    Button,
    Card,
    Tree,
    Input,
    Spin,
    Row,
    Col,
    Select,
    Tooltip,
    Radio,
    Modal,
    Tag,
    Popconfirm,
    message,
    Popover
} from 'antd';
const { Search } = Input;
import HttpService from '../../util/HttpService.jsx';

import MyModal from './Moduleadd.jsx'// 模型弹窗

const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some(item => item.key === key)) {
          parentKey = node.key;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  };

export default class modelList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedKeys: [],
            searchValue: '',
            autoExpandParent: true,


            list: [],
            pageNum: 1,
            perPage: 10,
            listType: 'list',
            cube_name: '',
            loading: false,
            treeData: [],
            buttontype: ['primary', 'default', 'default', 'default'],
            visible: false,
            visible2:false,//添加模型
            visible3:false,//添加表
            tableData: [],
            tableColumn: [],
            selectedKeys: ['0-0'],//树默认选中第一个
            activeButton: 0,
            //选项卡切换默认
            Hcard: null,
            moduleType:true,
            leftColor:0,
            setModule:false,
            ModData:{},
            model_id:null,
            ModObj:null,
            table_name:"",//模型名称
            table_title:"",//模型中文名称
            Mysrc:"",
            startIndex:1,
            perPage:10,
            total:0,
            // catalog_pid:'',
            // catalog_name:"",
            catalog_id:""
        };
    }
    async componentDidMount() {
        this.localData();
    }

    async localData () {
        await HttpService.post('/reportServer/dataStandard/getCatalogList', JSON.stringify({catalog_pid:'0'})).then(res => {//模型接口
            if (res.resultCode == "1000") {
                this.setState({
                    treeData: res.data,
                });
                window.sessionStorage.H_leftColor=0
            }
            else {
                message.error(res.message);
            }
        }, errMsg => {
            this.setState({
                list: [], loading: false
            });
        });
        await this.getTableList()
    }

    componentDidUpdate(){//执行回调
        
    }
    componentWillUnmount(){
        
    }

    onExpand = expandedKeys => {
        this.setState({
          expandedKeys,
          autoExpandParent: false,
        });
      };
      onTreeSelect = (selectedKeys,e) => {
        let ModObjs={
            catalog_id:e.node.catalog_id,
            catalog_pid:e.node.catalog_pid,
            catalog_name:e.node.title,
        }
        this.setState({catalog_id:selectedKeys[0],ModObj:ModObjs},function(){
            console.log(this.state.ModObj)
            this.getTableList();
        });
        
      }
    
      onChange = e => {
        const { value } = e.target;
        const expandedKeys = this.state.treeData
          .map(item => {
            if (item.title.indexOf(value) > -1) {
              return getParentKey(item.key, this.state.treeData);
            }
            return null;
          })
          .filter((item, i, self) => item && self.indexOf(item) === i);
        this.setState({
          expandedKeys,
          searchValue: value,
          autoExpandParent: true,
        });
      };

   async  getTableList (){//表list获取
        let obj={
            startIndex:this.state.startIndex,
            perPage:this.state.perPage,
            standard_name:"",
            standard_code:"",
            catalog_id:this.state.catalog_id
        }
        console.log(obj)
        HttpService.post('/reportServer/dataStandard/getDataStandardList',JSON.stringify(obj)).then(res => {///列表接口SunShine:    
            console.log(res )
            if (res.resultCode == "1000") {
                this.setState({
                    list:res.data.list,
                    startIndex:1,
                    perPage:10,
                    total:res.data.total
                });
            }
            else {
                message.error(res.message);
            }
        }, errMsg => {
            // this.setState({
            //     list: [], loading: false
            // });
        });
    }
    // 页数发生变化的时候
    onPageNumChange(pageNum) {
        this.setState({
            pageNum: pageNum
        }, () => {
            this.getTableList();
        });
    }
    // 数据变化的时候
    onValueChange(e) {
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name]: value
        });
    }

    addModule =(data)=>{//添加模型编辑数据  未做非空
        console.log(data);
        const {catalog_pid,catalog_name,catalog_id}=data
        if(catalog_name===""){
            return message.error("请填写模型名称")
        }
        if(catalog_pid==="请选择"){
            return message.error("请填选择目录")
        }
        
        HttpService.post('/reportServer/dataStandard/createCatalog', JSON.stringify(data)).then(res => {
            console.log((res))
            if (res.resultCode == "1000") {   
                this.localData();
            }
            else {
                message.error(res.message);
            }
        })
    }
    confirmModule =(catalog_id)=>{//删除模型
        HttpService.post('/reportServer/dataStandard/deleteCatalogById', JSON.stringify({"catalog_id":catalog_id})).then(res => {
            console.log(res)
            if (res.resultCode == "1000") {   
                this.localData();
            }
            else {
                message.error(res.message);
            }
        })
        
    }
    deleteList (id){
        HttpService.post('/reportServer/dataStandard/deleteDataStandardById', JSON.stringify({"standard_id":id})).then(res => {
            if (res.resultCode == "1000") {   
                message.success('删除成功');
                this.getTableList()
            }
            else {
                message.error(res.message);
            }
        })
    }
    
    search=()=>{
        // const {table_title,table_name}=this.state
        // this.getTableList(table_title,table_name)
        // this.setState({table_title:"",table_name:""})
    }
    onShowSizeChange=(current, pageSize)=>{
        this.setState({
            startIndex:1,
            perPage:pageSize
        })
    }
    setpagindex=(page, pageSize)=>{
        this.setState({
            startIndex:page,
            perPage:pageSize
        })
    }

    newStatndLink = () => {
        if(null==this.state.catalog_id || ""==this.state.catalog_id){
            message.warning("请先选择目录再新建");
        }else{
            window.location.href="#/dataStandard/dataStandard/"+this.state.catalog_id+"/null";
        }
    }

    render() {
        this.state.list.map((item, index) => {
            item.key = index;
        })
        
        let self = this;
        const columns = [
        {
            title:"标准名称",
            dataIndex: 'standard_name',
            key: 'standard_name',
            className: 'table_title',
        },
        {
            title: '标准编码',
            dataIndex: 'standard_code',
            key: 'standard_code',
            className: 'headerRow',
        }, {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
            className: 'headerRow',
        },
        {
            title: '创建时间',
            dataIndex: 'create_date',
            key: 'create_date',
            className: 'create_date',
        },
        {
            title: '操作',
            dataIndex: '操作',
            className: 'headerRow',
            render: (text, record) => (
                <span>
                    <a  href={"#/dataStandard/dataStandard/"+record.catalog_id+"/"+record.standard_id}>编辑</a>
                    <Divider type="vertical" />
                    <Popconfirm
                        title="您确定要删除此表吗?"
                        onConfirm={()=>this.deleteList(record.standard_id)}
                        okText="确定"
                        cancelText="取消"
                    ><a>删除</a> 
                    </Popconfirm>
                </span>
            ),
        }];

        return (
            <div id="page-wrapper">
                <Spin spinning={this.state.loading} delay={100}>
                    <Card title="数据标准" bodyStyle={{ backgroundColor: '#fafafa',boxSizing:"border-box" }}>
                        <Row>
                            <Col sm={4} style={{backgroundColor:"#fff",boxSizing:"border-box",paddingTop:"2px"}}>
                                <div className={style.modulelist}>
                                    <Button icon={<PlusCircleOutlined />} style={{ float:'right' }} onClick={()=>this.setState({visible2:true,setModule:false,set:false})}></Button>
                                    <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
                                    <Tree
                                    onExpand={this.onExpand}
                                    expandedKeys={this.state.expandedKeys}
                                    autoExpandParent={this.state.autoExpandParent}
                                    treeData={this.state.treeData}
                                    onSelect={this.onTreeSelect}
                                    />
                                </div >  
                            </Col>
                            <Col sm={20}>
                                <Card bodyStyle={{ padding: "8px", backgroundColor: '#fafafa' }}>

                                    <Row>
                                        <Col xs={24} sm={24}>
                                        <Form
                                            style={{float:"left"}}
                                            name="horizontal_login" layout="inline"
                                        >
                                            <Form.Item name="note" label="标准名称" rules={[{ required: true }]} >
                                                <Input value={this.state.ModData.table_title} onChange={e=>{this.setState({table_title:e.target.value})}} />
                                            </Form.Item>
                                            <Form.Item name="note" label="标准编码" rules={[{ required: true }]}>
                                                <Input value={this.state.ModData.table_name} onChange={e=>{this.setState({table_name:e.target.value})}}/>
                                            </Form.Item>
                                            <Button type="primary" icon={<SearchOutlined />} onClick={()=>{
                                                this.search()
                                            }}>搜索</Button>
                                        </Form>
                                        <Button type="primary"  style={{float:"right",marginRight:"10px"}} onClick={this.newStatndLink} >新建</Button>
                                        </Col>
                                    </Row>
                                </Card>
                                <div style={{position: 'relative',height:'500px'}}>
                                    <Table dataSource={this.state.list} columns={columns} bordered={true}
                                        pagination={false}
                                        footer={()=>{
                                            return (<Pagination style={{float:'right'}} defaultCurrent={this.state.startIndex} total={this.state.total} onChange={this.setpagindex} onShowSizeChange={this.onShowSizeChange}/>)
                                        }}
                                        />
                                </div>
                            </Col>
                        </Row>

                    </Card>
                </Spin>
                <MyModal visible={this.state.visible2} on={()=>{this.setState({visible2:false,ModObj:this.state.set!==false?this.state.ModData:null,set:false})}} go={(data)=>this.addModule(data)}  set={this.state.setModule} ModObj={this.state.ModObj} treeData={this.state.treeData}></MyModal>
            </div>
        );
    }
}