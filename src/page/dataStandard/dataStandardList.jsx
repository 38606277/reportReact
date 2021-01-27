import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import style from './dataStandard.less'
import Pagination from 'antd/lib/pagination';
import Icon, { PlusCircleOutlined, EditOutlined , MinusCircleOutlined, ProfileOutlined ,SearchOutlined ,PlusOutlined,MoreOutlined} from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import {Table, Divider, Button, Card, Tree, Input, Spin, Row, Col, Popconfirm, message } from 'antd';
const { Search } = Input;

const { TreeNode } = Tree;

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
            NodeTreeItem:null,
            list: [],
            pageNum: 1,
            perPage: 10,
            loading: false,
            treeData: [],
            visible: false,
            visible2:false,//添加模型
            setModule:false,
            ModObj:null,
            isNewCatalog:false,
            catalog_code:"",//模型名称
            Mysrc:"",
            startIndex:1,
            perPage:10,
            total:0,
            // catalog_pid:'',
            catalog_name:"",
            catalog_id:props.match.params.catalog_id
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
          if(null!=selectedKeys && selectedKeys.length>0){
            let ModObjs={
                catalog_id:e.node.catalog_id,
                catalog_pid:e.node.catalog_pid,
                catalog_name:e.node.title,
            }
            this.setState({catalog_id:selectedKeys[0],ModObj:ModObjs},function(){
                this.getTableList();
            });
        }
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
        HttpService.post('/reportServer/dataStandard/getDataStandardList',JSON.stringify(obj)).then(res => {///列表接口SunShine:    
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
        const {catalog_pid,catalog_name,catalog_id}=data
        if(catalog_name===""){
            return message.error("请填写模型名称")
        }
        if(catalog_pid==="请选择"){
            return message.error("请填选择目录")
        }
        this.setState({visible2:false});
        HttpService.post('/reportServer/dataStandard/createCatalog', JSON.stringify(data)).then(res => {
            if (res.resultCode == "1000") {   
                this.localData();
            }
            else {
                message.error(res.message);
            }
        })
    }
    delCatalog =(catalog_id)=>{//删除模型
        HttpService.post('/reportServer/dataStandard/deleteCatalogById', JSON.stringify({"catalog_id":catalog_id})).then(res => {
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
        // const {catalog_name,catalog_name}=this.state
        // this.getTableList(catalog_name,catalog_name)
        // this.setState({catalog_name:"",catalog_name:""})
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
        if(null==this.state.catalog_id || ""==this.state.catalog_id || "0"==this.state.catalog_id  || 'undefined' ==this.state.catalog_id){
            message.warning("请先选择目录再新建");
        }else{
            window.location.href="#/dataStandard/dataStandard/"+this.state.catalog_id+"/null";
        }
    }

    onRightClick = ({event,node}) => {
        var x = event.currentTarget.offsetLeft + event.currentTarget.clientWidth;
        var y = event.currentTarget.offsetTop+84 ;
        // this.setState({
        //     NodeTreeItem: {
        //         pageX: x,
        //         pageY: y,
        //         catalog_id:node.props.eventKey,
        //         catalog_pid:node.props.catalog_pid,
        //         key: node.props.eventKey,
        //         title: node.props.title
        //     }
        // });
        let ModObjs={
            catalog_id:node.props.eventKey,
            catalog_pid:node.props.catalog_pid,
            catalog_name:node.props.title
        }
        this.setState({catalog_id:node.props.eventKey,ModObj:ModObjs,
            NodeTreeItem: {
                pageX: x,
                pageY: y,
                catalog_id:node.props.eventKey,
                catalog_pid:node.props.catalog_pid,
                key: node.props.eventKey,
                title: node.props.title
            }},function(){
            this.getTableList();
        });

      }
      getNodeTreeMenu() {
        const {pageX, pageY} = {...this.state.NodeTreeItem};
        const tmpStyle = {
          position: 'absolute',
          maxHeight: 40,
          textAlign: 'center',
          left: `${pageX + 10}px`,
          top: `${pageY}px`,
          display: 'flex',
          flexDirection: 'row',
        };
        const menu = (
          <div
            style={tmpStyle}
          >
              {this.state.NodeTreeItem.catalog_id == 0?'':(
            <div style={{alignSelf: 'center', marginLeft: 10}} onClick={()=>this.setState({visible2:true,catalog_id:this.state.NodeTreeItem.catalog_id,setModule:false,isNewCatalog:false})}>
                <PlusCircleOutlined />
            </div>
             )}
            {this.state.NodeTreeItem.catalog_id == 0?'':(
            <div style={{alignSelf: 'center', marginLeft: 10}} onClick={this.handleEditSub}>
                <EditOutlined />
            </div>
             )}
            {this.state.NodeTreeItem.catalog_id == 0?'':(
            //     <Popconfirm
            //     title="您确定要删除吗?"
            //     onConfirm={this.handleDeleteSub}
            //     okText="确定"
            //     cancelText="取消"
            // ><MinusCircleOutlined />
            // </Popconfirm>
              <div style={{alignSelf: 'center', marginLeft: 10}} onClick={this.handleDeleteSub}>
                <MinusCircleOutlined />
            </div>
            )}
          </div>
        );
        return (this.state.NodeTreeItem == null) ? '' : menu;
      }
     clearMenu = () => {
        this.setState({
          NodeTreeItem: null
        })
      }
    
      handleEditSub = (e) => {
       console.log("click edit  id :", this.state.NodeTreeItem.catalog_id)

        this.setState({visible2:true,setModule:this.state.NodeTreeItem.catalog_id,isNewCatalog:true},function(){
            console.log(this.state.isNewCatalog)
        });
      }
    
      handleDeleteSub = (e) => {
       this.delCatalog(this.state.NodeTreeItem.catalog_id);
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
                            <Col sm={4} style={{backgroundColor:"#fff",boxSizing:"border-box",paddingTop:"2px",overflow:'auto'}}>
                                <div className={style.modulelist}>
                                    <Button icon={<PlusCircleOutlined />} style={{ float:'right' }} onClick={()=>this.setState({visible2:true,setModule:false,isNewCatalog:false})}></Button>
                                    <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
                                    <div onClick={this.clearMenu}>
                                        <Tree
                                            defaultExpandAll
                                            onExpand={this.onExpand}
                                            expandedKeys={this.state.expandedKeys}
                                            autoExpandParent={this.state.autoExpandParent}
                                            treeData={this.state.treeData}
                                            onSelect={this.onTreeSelect}
                                            onRightClick={this.onRightClick}
                                        >
                                        </Tree>
                                        {this.state.NodeTreeItem != null ? this.getNodeTreeMenu() : ""}
                                        </div>
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
                                                <Input value={this.state.catalog_name} onChange={e=>{this.setState({catalog_name:e.target.value})}} />
                                            </Form.Item>
                                            <Form.Item name="note" label="标准编码" rules={[{ required: true }]}>
                                                <Input value={this.state.catalog_code} onChange={e=>{this.setState({catalog_code:e.target.value})}}/>
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
                <MyModal visible={this.state.visible2} on={()=>{this.setState({visible2:false,ModObj:this.state.isNewCatalog!==false?this.state.ModObj:null,isNewCatalog:false})}} go={(data)=>this.addModule(data)}  isNewCatalog={this.state.isNewCatalog} ModObj={this.state.ModObj} treeData={this.state.treeData}></MyModal>
            </div>
        );
    }
}