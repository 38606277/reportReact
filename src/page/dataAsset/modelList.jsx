
import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import style from './modelList.less'
import Pagination from 'antd/lib/pagination';
import { BarChartOutlined, LineChartOutlined, PieChartOutlined, ProfileOutlined ,SearchOutlined ,PlusOutlined} from '@ant-design/icons';
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
const { Option } = Select;
import CubeService from '../../service/CubeService.jsx';
import HttpService from '../../util/HttpService.jsx';
import { forInRight } from 'lodash';

import ERGraphDemo from '../ERGraphDemo/index.tsx';
import { isTemplateSpan } from 'typescript';
import MyModal from './Moduleadd.jsx'// 模型弹窗
import NewForm from './newlform.jsx'//建表弹窗

export default class modelList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            Mysrc:""
        };
    }
    async componentDidMount() {
        console.log(this.props.location)
        await HttpService.post('/reportServer/bdModel/getAllList', null).then(res => {//模型接口
            if (res.resultCode == "1000") {
                this.setState({
                    ModData:{...res.data[0]},
                    treeData: res.data,
                    module_id:res.data[0].model_id,
                    ModObj:{...res.data[0]}
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

   async loadCubeList() {//页面初始化请求
        let param = {
            FLEX_VALUE_SET_ID: 4
        };

       await HttpService.post('/reportServer/bdModel/getAllList', null).then(res => {//模型接口
            console.log(res.data)
    
            if (res.resultCode == "1000") {
                this.setState({
                    ModData:{...res.data[0]},
                    treeData: res.data,
                    module_id:res.data[0].model_id
                });
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
    getTableList (){//表list获取
        let obj={
            startIndex:1,
            perPage:10,
            table_name:"",
            table_title:"",
            model_id:this.state.module_id
        }
        console.log(obj)
        HttpService.post('/reportServer/bdModelTableColumn/table/getTableList',JSON.stringify(obj)).then(res => {///列表接口SunShine:    
            console.log(res)
            if (res.resultCode == "1000") {
                this.setState({
                    list:res.data.list
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
            this.loadCubeList();
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

    //左侧点击切换事件
     setLeftMenu= (key,item)=>{
        window.sessionStorage.H_leftColor=key
       this.setState({module_id:item.model_id,ModObj:item})
        HttpService.post('/reportServer/bdModel/getModelById', JSON.stringify({model_id:item.model_id})).then(res => {
            if (res.resultCode == "1000") {
                this.setState({
                    ModData: res.data,
                });
                this.getTableList()
            }
            else {
                message.error(res.message);
            }
        })
       
    }
    showModal = (record) => {
        console.log(record)
        this.setState({
            visible: true,
            tableColumn: [],
            tableData: []
        });
        //查询表格数据 
        let param = {
            table_id: record.table_id
        };
        let url = "/reportServer/bdModelTableColumn/table/getModelTableById";
        HttpService.post(url, JSON.stringify(param)).then(res => {
            console.log(res)
            //生成列信息
            // let cols = [];
            // let columns = res.data[0];
            // let obj = {
            //     overflow: 'hidden',
            //     display: 'block',
            //     width: '200px',
            //     height: '40px'
            // }
            // for (var key in columns) {

            //     if (key === 'fileDataBlob') {
            //         cols.push({
            //             title: key,
            //             dataIndex: key,
            //             render: text => <a style={{ ...obj }}>{text}</a>,
            //         })
            //     } else {
            //         cols.push({
            //             title: key,
            //             dataIndex: key
            //         })
            //     }

            // }
            // for (j = 0, len = columns.length; j < len; j++) {
            //     cols.push({
            //         title: columns[j],
            //         dataIndex: columns[j]
            //     })
            // }
            // this.setState({ tableColumn: cols, tableData: res.data });

            // 设置高亮
        }, errMsg => {
            this.setState({
                list: []
            });
        });

    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    addModule =(data)=>{//添加模型编辑数据  未做非空
        ///
        console.log(data)
        const obj={
            "db_source":"请选择模型来源",
            "model_name":"请输入模型名称",
            "db_type":"模型类型"
        }
        HttpService.post('/reportServer/bdModel/createModel', JSON.stringify(data)).then(res => {
            console.log((res))
            if (res.resultCode == "1000") {   
                HttpService.post('/reportServer/bdModel/getAllList', null).then(res => {
            
                    if (res.resultCode == "1000") {
                        this.setState({
                            ModData:{...res.data[0]},
                            treeData: res.data,
                            module_id:res.data[0].model_id
                        });
                        this.loadCubeList()
                        this.setState({visible2:false})
                    }
                    else {
                        message.error(res.message);
                    }
                })
            }
            else {
                message.error(res.message);
            }
        })
    }
    confirmModule =(module_id)=>{//删除模型
        HttpService.post('/reportServer/bdModel/deleteModelById', JSON.stringify({"model_id":module_id})).then(res => {
            console.log(res)
            if (res.resultCode == "1000") {   
                HttpService.post('/reportServer/bdModel/getAllList', null).then(res => {
                    if (res.resultCode == "1000") {
                        this.loadCubeList()
                        this.getTableList()
                    }
                    else {
                        message.error(res.message);
                    }
                })
            }
            else {
                message.error(res.message);
            }
        })
        
    }
    deleteList (id){
        HttpService.post('/reportServer/bdModelTableColumn/table/deleteTableId', JSON.stringify({"table_id":id})).then(res => {
            if (res.resultCode == "1000") {   
                message.success('删除成功');
                this.getTableList()
            }
            else {
                message.error(res.message);
            }
        })
    }
    novisible3=(e)=>{
        console.log(e)
        // this.setState(({visible3:false}))
    }
    render() {
        this.state.list.map((item, index) => {
            item.key = index;
        })
        const dataSource = this.state.list;
        let self = this;
        const columns = [
        {
            title:"数据文名称",
            dataIndex: 'table_title',
            key: 'table_title',
            className: 'table_title',
        },
        {
            title: '数据名称',
            dataIndex: 'table_name',
            key: 'table_name',
            className: 'headerRow',
        }, {
            title: '数据描述',
            dataIndex: 'table_desc',
            key: 'table_desc',
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
                    <a  onClick={()=>this.setState({visible3:true,Mysrc:"L"+record.table_id+"&"+this.state.module_id})}>编辑</a>
                    <Divider type="vertical" />
                    <a onClick={() => this.showModal(record)} href="javascript:;">浏览数据</a>
                    <Divider type="vertical" />
                    <Popconfirm
                        title="您确定要删除此表吗?"
                        onConfirm={()=>this.deleteList(record.table_id)}
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
                    <Card title="数据模型" bodyStyle={{ backgroundColor: '#fafafa',boxSizing:"border-box" }}>
                        <Row>
                            <Col sm={4} style={{backgroundColor:"#fff",boxSizing:"border-box",paddingTop:"2px"}}>
                                <div className={style.modulelist}>
                                    <div  className={style.modulelist_title}>
                                        <div className={style.modulelist_title_left}>模型列表</div>
                                        <Popover
                                            className={style.modulelist_title_right}
                                            content={()=>{
                                                return(
                                                    <div>
                                                        <Tag onClick={()=>this.setState({visible2:true,setModule:false,ModObj:null})}>新建</Tag>
                                                        <Tag onClick={()=>this.setState({visible2:true,setModule:this.state.module_id,ModObj:this.state.ModObj})}>编辑</Tag>
                                                        <Popconfirm 
                                                             title="确定要删除这个模块吗?"
                                                             onConfirm={()=>this.confirmModule(this.state.module_id)}
                                                             okText="删除"
                                                             cancelText="取消"
                                                        >
                                                            <Tag>删除</Tag>
                                                        </Popconfirm>
                                                    </div>
                                                )
                                            }}
                                        >
                                            <Tag  icon={<PlusOutlined />}>更多</Tag>
                                        </Popover >
                                    </div>
                                    {   
                                        this.state.treeData.map((item,key)=>{
                                            return (<div key={key} style={{display:"flex",margin:"10px 0",padding:"1px 0",background:window.sessionStorage.H_leftColor*1===key?"#ccc":"",color:window.sessionStorage.H_leftColor*1===key?"#fff":""}}>
                                                <div style={{flex:'5',cursor: "pointer"}} onClick={()=>this.setLeftMenu(key,item)}><span style={{display:"inline-block",width:"20px"}}></span>{item.model_name}</div>
                                            </div>)
                                        })
                                    }
                                </div >  
                            </Col>
                            <Col sm={20}>
                                <Card style={{display:'flow-root',marginLeft:"1px",backgroundColor:"#fff",padding:"20px 0 0 20px"}}>
                                <Form 
                                      name="horizontal_login" layout="inline"
                                >
                                    <Form.Item name="note" label="模型名称" rules={[{ required: true }]}>
                                        <Input value={this.state.ModData.model_name} bordered={false} disabled/>
                                    </Form.Item>
                                    <Form.Item name="note" label="数据类型" rules={[{ required: true }]}>
                                        <Input value={this.state.ModData.db_type} bordered={false} disabled/>
                                    </Form.Item>
                                    <Form.Item name="note" label="数据来源" rules={[{ required: true }]}>
                                        <Input value={this.state.ModData.db_source} bordered={false} disabled/>
                                    </Form.Item>
                                    <Form.Item name="note" label="创建时间" rules={[{ required: true }]}>
                                        <Input value={this.state.ModData.update_date} bordered={false} disabled/>
                                    </Form.Item>
                                    <Form.Item name="note" label="创 建 人" rules={[{ required: true }]}>
                                        <Input value={this.state.ModData.update_by} bordered={false} disabled/>
                                    </Form.Item>
                                </Form>
                                </Card>
                                <Card bodyStyle={{ padding: "8px", backgroundColor: '#fafafa' }}>

                                    <Row>
                                        <Col xs={24} sm={24}>
                                        <Form
                                            style={{float:"left"}}
                                            name="horizontal_login" layout="inline"
                                        >
                                            <Form.Item name="note" label="表中文名称" rules={[{ required: true }]} >
                                                <Input value={this.state.ModData.table_title} onChange={e=>{this.setState({table_title:e.target.value})}} />
                                            </Form.Item>
                                            <Form.Item name="note" label="表名英文" rules={[{ required: true }]}>
                                                <Input value={this.state.ModData.table_name} onChange={e=>{this.setState({table_name:e.target.value})}}/>
                                            </Form.Item>
                                            <Button type="primary" icon={<SearchOutlined />}>搜索</Button>
                                        </Form>
                                            <Radio.Group style={{ float: "right", marginRight: "30px" }}  defaultValue="list" buttonStyle="solid" onChange={(e) => { this.setState({ iView: e.target.value }) }}>
                                                <Radio.Button value="list" onClick={()=>this.setState({moduleType:true})}>列表</Radio.Button>
                                                <Radio.Button value="column" onClick={()=>this.setState({moduleType:false})}>模型</Radio.Button>
                                            </Radio.Group>
                                            {/* <Button type="primary"  
                                                style={{float:"right",marginRight:"10px"}} 
                                                onClick={()=>this.setState({visible3:true,Mysrc:"X"+this.state.module_id})}
                                                >新建表格</Button> */}
                                                 <Button type="primary"  style={{float:"right",marginRight:"10px"}} href={"#/dataAsset/newlform/"+"X"+this.state.module_id}>新建表格</Button>
                                        </Col>
                                    </Row>

                                </Card>
                                <div style={{position: 'relative',height:'500px'}}>
                                    {
                                        this.state.moduleType? <Table dataSource={this.state.list} columns={columns} bordered={true}
                                        />:<ERGraphDemo  model_id={this.state.module_id}/>
                                    } 
                                </div>
                            </Col>
                        </Row>

                    </Card>
                </Spin>
                <Modal
                    title="表详情"
                    width='900px'
                    cancelText='取消'
                    okText='确认'
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Card>
                        <Table dataSource={this.state.tableData} columns={this.state.tableColumn}
                            scroll={{ x: 1300 }}
                            bordered={true} />
                    </Card>
                </Modal>
                <MyModal visible={this.state.visible2} on={()=>{this.setState({visible2:false,ModObj:null})}} go={(data)=>this.addModule(data)}  set={this.state.setModule} ModObj={this.state.ModObj}></MyModal>
                <Modal title="新建表格" visible={this.state.visible3} onOk={this.novisible3} onCancel={()=>this.setState({visible3:false})} >
                        <NewForm visible={this.state.visible3} module_id={this.state.Mysrc} go={(e)=>{
                            this.novisible3(e)
                        }}></NewForm>
                </Modal>
            </div>
        );
    }
}
