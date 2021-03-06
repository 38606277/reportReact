
import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'antd/lib/pagination';
import { BarChartOutlined, LineChartOutlined, PieChartOutlined, ProfileOutlined } from '@ant-design/icons';
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
} from 'antd';
const { Option } = Select;
import CubeService from '../../service/CubeService.jsx';
import HttpService from '../../util/HttpService.jsx';
import { forInRight } from 'lodash';

import ERGraphDemo from '../ERGraphDemo/index.tsx';

//
const Star={//红色*样式
    marginRight: '4px',
    color: '#ff4d4f',
    fontSize: '14px',
    fontFamily: 'SimSun, sans-serif',
    lineHeight: '1'
    };
  const Hinput= props=>{
    const {ISname,value,chang}=props
    return (
      <div style={{display:"flex",width:'480px',height:'30px',alignItems:'center'}}>
        <span style={{marginRight:'5px'}}><span style={{...Star}}>*</span>{ISname} <span>： </span></span>
        <Input style={{width:'390px'}} value={value} onChange={e=>chang(e.target.value)}/>
      </div>
    )
  }
  const Hselect=props=>{
    const {ISname,list,fn}=props
    return(
      <div>
         <span style={{marginRight:'1px'}}><span style={{...Star}}>*</span>{ISname} <span>： </span></span>
         <Select style={{width:'130px'}} defaultValue='请选择' onChange={fn}>
           {
             list.map((item,index)=>{
                return (
                  <Option key={"h"+index} value={item.value}>{item.text}</Option>
                )
             })
           }
         </Select>
      </div>
    )
  }
  



const ModData =[
    {
        text:"模型名称",
        value:"人力资源"
    },
    {
        text:"数据来源",
        value:"公司内部"
    },
    {
        text:"数据类型",
        value:"mysql",
    },
    {
        text:"创建时间",
        value:"2021/01/01"
    },
    {
        text:"创 建 人 ",
        value:"XXXX"
    }
]
const _cubeService = new CubeService();
const Search = Input.Search;
const FormItem = Form.Item;
const { TreeNode } = Tree;

const MyModal=(props)=>{
    const {visible,on,go,set}=props
    const [data_Source,setData_Source]=useState('');//数据来源
    const [ModName,setModName]=useState('');//模型名称
    const [data_Class,setData_Class]=useState('');//数据类型
    const formlist=[
        {
            type:"input",
            text:"模型名称",
            value:ModName,
            fn:setModName
        },
        {
            type:"select",
            text:"数据类型",
            list:[
            {
                text:"mysql",
                value:"mysql"
            }
            ],
            value:data_Class,
            fn:setData_Class
        },
        {
            type:"select",
            text:"数据来源",
            list:[
            {
                text:"fn",
                value:"fn"
            }
            ],
            value:data_Source,
            fn:setData_Source
        },
        ];
    return (<Modal 
            title={set!==false?"编辑模型":"新增模型"}
            width='900px'
            cancelText='取消'
            okText='确认'
            visible={visible}
            onOk={()=>go(
                {
                    db_source:data_Source,
                    model_name:ModName,
                    db_type:data_Class,
                    model_id:set?set:null
                }
                )}
            onCancel={()=>on()}
        >
        <div style={{position:"relative"}}>
                {
                formlist.map((item,index)=>{
                    return (
                    <div key={index} style={{margin:"20px 20px",display:item.type==='input'?null:"inline-block"}}>
                        {
                        item.type==='input'?<Hinput value={item.value} chang={item.fn} ISname={item.text}/>:<Hselect list={item.list} chang={item.fn} ISname={item.text}/>
                        }
                    </div>
                    )
                })
                }

                {set!==false?<Button type="primary"  style={{position:"absolute",top:'0px',right:'0px'}} href={"#/dataAsset/newlform/"+set}>新建表格</Button>:null}

            </div>

    </Modal>)
}

function onChange(value) {
    console.log(`selected ${value}`);
}

function onBlur() {
    console.log('blur');
}

function onFocus() {
    console.log('focus');
}

function onSearch(val) {
    console.log('search:', val);
}

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
            tableData: [],
            tableColumn: [],
            selectedKeys: ['0-0'],//树默认选中第一个
            activeButton: 0,
            //选项卡切换默认
            Hcard: null,
            moduleType:true,
            leftColor:0,
            setModule:false,
            ModData:{}
        };
    }
    componentDidMount() {
        this.loadCubeList();
        this.loadDataList();
    }


    loadCubeList() {
        let param = {
            FLEX_VALUE_SET_ID: 4
        };

        HttpService.post('/reportServer/bdModel/getAllList', null).then(res => {
            //   //报错
            console.log(res.data)
    
            if (res.resultCode == "1000") {
                this.setState({
                    ModData:{...res.data[0]},
                    treeData: res.data,
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
    }
    loadDataList() {
        let param = {
            FLEX_VALUE_SET_ID: 4
        };

        HttpService.post('/reportServer/dataAsset/getDataList', JSON.stringify(param)).then(res => {
            if (res.resultCode == "1000") {
                this.setState({
                    list: res.data,
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
    // 搜索
    onSearch(cube_name) {
        let listType = cube_name === '' ? 'list' : 'search';
        this.setState({
            listType: listType,
            pageNum: 1,
            cube_name: cube_name
        }, () => {
            this.loadCubeList();
        });
    }
    deleteCube(id) {
        if (confirm('确认删除吗？')) {
            _cubeService.delCube(id).then(response => {
                alert("删除成功");
                this.loadCubeList();
            }, errMsg => {
                alert("删除失败");
                // _mm.errorTips(errMsg);
            });
        }
    }

    onExpand = expandedKeys => {
        console.log('onExpand', expandedKeys);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    };

    onCheck = checkedKeys => {
        console.log('onCheck', checkedKeys);
        this.setState({ checkedKeys });
    };

    //左侧点击切换事件
    setLeftMenu=(key,item)=>{
        // reportServer/bdModel/getModelById
        this.setState({leftColor:key})
        HttpService.post('/reportServer/bdModel/getModelById', JSON.stringify({model_id:item.model_id})).then(res => {
            // /reportServer/bdModel/getAllList  //报错
            console.log(res.data)
            if (res.resultCode == "1000") {
                this.setState({
                    ModData: res.data,
                });
            }
            else {
                message.error(res.message);
            }
        })
        HttpService.post('/reportServer/bdModel/getModelById', JSON.stringify({model_id:item.model_id})).then(res => {
            // /reportServer/bdModel/getAllList  //报错
            console.log(res.data)
            if (res.resultCode == "1000") {
                this.setState({
                    ModData: res.data,
                });
            }
            else {
                message.error(res.message);
            }
        })
    }
    //树节点选中时
    onSelect = (selectedKeys, info) => {
        console.log('onSelect', info);
        this.setState({ selectedKeys });
        let param = {};
        let url = "";
        if (this.state.activeButton == 0) {
            param = { catalog_id: info.node.props.dataRef.id };
            url = "/reportServer/dataAsset/getTablesByCatalog";

        } else if (this.state.activeButton == 1) {
            param = { source_id: info.node.props.dataRef.name };
            url = "/reportServer/dataAsset/getTablesBySource";

        } else if (this.state.activeButton == 2) {


            param = { dbtype_id: info.node.props.dataRef.name };
            url = "/reportServer/dataAsset/getTablesByDbType";

        } else if (this.state.activeButton == 3) {
            param = { host_id: info.node.props.dataRef.name };
            url = "/reportServer/dataAsset/getTablesByHost";
        }
        HttpService.post(url, JSON.stringify(param)).then(res => {
            this.setState({ list: res.data });
            // alert(JSON.stringify(this.state.treeData));
            // 设置高亮
            //   this.activeButton(buttontype);
        }, errMsg => {
            this.setState({
                list: []
            });
        });



    };

    onViewClick = async (viewID, buttontype, number) => {
        let obj = {
            0: {
                url: "/reportServer/dataAsset/getTablesByCatalog",
                id: 'catalog_id',
                l: 'id'
            },
            1: {
                url: "/reportServer/dataAsset/getTablesBySource",
                id: 'source_id',
                l: 'name'
            },
            2: {
                url: "/reportServer/dataAsset/getTablesByDbType",
                id: "dbtype_id",
                l: 'name'
            },
            3: {
                url: "/reportServer/dataAsset/getTablesByHost",
                id: 'host_id',
                l: 'name'
            }
        }
        let param = {
            FLEX_VALUE_SET_ID: viewID
        };
        if (buttontype == 3) {
            //数据源
            let param = {};
            let url = "reportServer/DBConnection/ListAll";
            await HttpService.post(url, param).then(response => {
                this.setState({ Hcard: { ...response[0] }, treeData: response })
                // alert(JSON.stringify(this.state.treeData));
                // 设置高亮
                this.activeButton(buttontype);
            }, errMsg => {
                this.setState({
                    list: []
                });
            });

        } else {
            await HttpService.post('/reportServer/FlexValue/getFlexValuesTree', JSON.stringify(param)).then(res => {
                if (res.resultCode == "1000") {
                    this.setState({
                        treeData: res.data,
                        Hcard: { ...res.data[0] },
                        selectedKeys: ["0-0"]
                    });
                    // 设置高亮
                    this.activeButton(buttontype);

                }
                else {
                    message.error(res.message);
                }
            }, errMsg => {
                this.setState({
                    list: [], loading: false, selectedKeys: ["0-0"]
                });
            });

        }
        let url = obj[number].url,
            data = {
                [obj[number].id]: this.state.Hcard[obj[number].l]
            }
        await HttpService.post(url, JSON.stringify(data)).then(res => {//默认点击修改数据
            this.setState({ list: res.data });
            // alert(JSON.stringify(this.state.treeData));
            // 设置高亮
            //   this.activeButton(buttontype);
        }, errMsg => {
            this.setState({
                list: [],
                selectedKeys: ["0-0"]
            });
        });


    }
    viewData(record) {

        let param = { host_id: record.host_id, table_name: record.table_name };
        let url = "/reportServer/dataAsset/getValueByHostAndTable";
        HttpService.post(url, JSON.stringify(param)).then(res => {
            this.setState({ list: res.data });
            // 设置高亮
        }, errMsg => {
            this.setState({
                list: []
            });
        });
    }



    activeButton = i => {

        let aButtonType = [];
        for (var j = 0; j < this.state.buttontype.length; j++) {
            if (i == j) {
                aButtonType[j] = 'primary';

            } else {
                aButtonType[j] = 'default';
            }
        }
        this.setState({ buttontype: aButtonType, activeButton: i });
    }




    renderTreeNodes = data =>
        data.map(item => {
            if (item.children) {
                return (
                    <TreeNode title={item.name} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode title={item.name} key={item.key} dataRef={item} />;
        });

    showModal = (record) => {
        console.log(record)
        this.setState({
            visible: true,
            tableColumn: [],
            tableData: []
        });
        //查询表格数据 
        let param = {
            host_id: record.host_id,
            table_name: record.table_name,
            dbtype_id: record.dbtype_id
        };
        let url = "/reportServer/dataAsset/getValueByHostAndTable";
        HttpService.post(url, JSON.stringify(param)).then(res => {

            //生成列信息
            let cols = [];
            let columns = res.data[0];
            let obj = {
                overflow: 'hidden',
                display: 'block',
                width: '200px',
                height: '40px'
            }
            for (var key in columns) {

                if (key === 'fileDataBlob') {
                    cols.push({
                        title: key,
                        dataIndex: key,
                        render: text => <a style={{ ...obj }}>{text}</a>,
                    })
                } else {
                    cols.push({
                        title: key,
                        dataIndex: key
                    })
                }

            }
            // for (j = 0, len = columns.length; j < len; j++) {
            //     cols.push({
            //         title: columns[j],
            //         dataIndex: columns[j]
            //     })
            // }
            this.setState({ tableColumn: cols, tableData: res.data });

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
    addModule =(data)=>{//添加模型编辑数据
        console.log(data)
        const obj={
            "db_source":"请选择模型来源",
            "model_name":"请输入模型名称",
            "db_type":"模型类型"
        }
        this.setState({visible2:false})
        console.log(1)
    }
    confirmModule =()=>{//删除模型

    }
    render() {
        this.state.list.map((item, index) => {
            item.key = index;
        })
        const dataSource = this.state.list;
        let self = this;
        const columns = [
        {
            title:"表中文名称",
            dataIndex: 'x',
            key: 'x',
            className: 'x',
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
        }, {
            title: '数据目录',
            dataIndex: 'catalog_value',
            key: 'catalog_value',
            className: 'headerRow',
        }, {
            title: '数据类型',
            dataIndex: 'dbtype_id',
            key: 'cube_desc',
            className: 'headerRow',
        },
        {
            title: '数据行',
            dataIndex: 'data_count',
            key: 'data_count',
            className: 'headerRow',
        }, {
            title: '操作',
            dataIndex: '操作',
            className: 'headerRow',
            render: (text, record) => (
                <span>
                    <Link to={`/dataAsset/newlform/${record.table_id}`}>编辑</Link>
                    <Divider type="vertical" />
                    <a onClick={() => this.showModal(record)} href="javascript:;">浏览数据</a>
                </span>
            ),
        }];

    
        return (
            <div id="page-wrapper">
                <Spin spinning={this.state.loading} delay={100}>
                    <Card title="数据模型" bodyStyle={{ backgroundColor: '#fafafa',boxSizing:"border-box" }} extra={<div>
                        <Button 
                        // href={"#/dataAsset/addLists"}
                         style={{ float: "right", marginRight: "10px" }} type="primary" onClick={()=>this.setState({visible2:true,setModule:false})}>新建模型</Button></div>}>
                        <Row>
                            <Col sm={4} style={{backgroundColor:"#fff",boxSizing:"border-box",paddingTop:"2px"}}>
                                <div style={{boxSizing:"border-box",padding:"20px 5px"}}>
                                    {
                                        this.state.treeData.map((item,key)=>{
                                            return (<div key={key} style={{display:"flex",padding:"10px 0"}}>
                                                <div style={{flex:'5',color:this.state.leftColor===key?"#1890ff":"",cursor: "pointer"}} onClick={()=>this.setLeftMenu(key,item)}><span style={{display:"inline-block",width:"20px"}}></span>{item.model_name}</div>
                                                <div style={{flex:'5'}}><Tag color="blue" onClick={()=>this.setState({visible2:true,setModule:item.module_id})}>编辑</Tag>
                                                <Popconfirm 
                                                     title="确定要删除这个模块吗?"
                                                     onConfirm={()=>this.confirmModule(item.module_id)}
                                                     okText="删除"
                                                     cancelText="取消"
                                                ><Tag color="red">删除</Tag>  </Popconfirm>
                                                </div>
                                            </div>)
                                        })
                                    }
                                </div >
                                {/* <Tree
                                    // onExpand={this.onExpand}
                                    // expandedKeys={this.state.expandedKeys}
                                    // autoExpandParent={this.state.autoExpandParent}
                                    // onCheck={this.onCheck}
                                    // checkedKeys={this.state.checkedKeys}
                                    selectedKeys={this.state.selectedKeys}
                                    onSelect={this.onSelect}

                                >
                                    {this.renderTreeNodes(this.state.treeData)}
                                </Tree> */}
                            </Col>
                            <Col sm={20}>
                                <div style={{display:'flow-root',marginLeft:"1px",backgroundColor:"#fff",padding:"20px 0 0 20px"}}>
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
                                        <Input value={null} bordered={false} disabled/>
                                    </Form.Item>
                                    <Form.Item name="note" label="创 建 人" rules={[{ required: true }]}>
                                        <Input value={null} bordered={false} disabled/>
                                    </Form.Item>
                                </Form>
                                    {/* {
                                        ModData.map((item,index)=>{
                                            return(<div key={index} style={{display:"flex",fontSize:"20px",float:"left",marginRight:"100px",marginBottom:"20px"}}>
                                                <div style={{width:'108px'}}>{item.text}<span style={{padding:"0 4px"}}>：</span></div>
                                                <div>{item.value}</div>
                                            </div>)
                                        })
                                    } */}
                                </div>
                                <Card bodyStyle={{ padding: "8px", backgroundColor: '#fafafa' }}>

                                    <Row>
                                        <Col xs={24} sm={24}>
                                            <Radio.Group style={{ float: "right", marginRight: "30px" }}  defaultValue="list" buttonStyle="solid" onChange={(e) => { this.setState({ iView: e.target.value }) }}>
                                                <Radio.Button value="list" onClick={()=>this.setState({moduleType:true})}>列表</Radio.Button>
                                                <Radio.Button value="column" onClick={()=>this.setState({moduleType:false})}>模型</Radio.Button>
                                            </Radio.Group>
                                        </Col>
                                    </Row>

                                </Card>
                                <div style={{height:"500px"}}>
                                    {
                                        this.state.moduleType? <Table dataSource={this.state.list} columns={columns} bordered={true}
                                        />:<ERGraphDemo />
                                    } 
                                </div>
                               
                                {/* <Pagination current={this.state.pageNum}
                                    total={this.state.total}
                                    onChange={(pageNum) => this.onPageNumChange(pageNum)} /> */}
                            </Col>
                        </Row>

                    </Card>
                </Spin>

                <Button type="primary" onClick={this.showModal}>
                    Open Modal
             </Button>
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
                        {/* <Pagination current={this.state.pageNum}
                            total={this.state.total}
                            onChange={(pageNum) => this.onPageNumChange(pageNum)} /> */}
                    </Card>
                </Modal>
                <MyModal visible={this.state.visible2} on={()=>{this.setState({visible2:false})}} go={(data)=>this.addModule(data)} set={this.state.setModule}></MyModal>
            </div>
        );
    }
}
