
import React from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'antd/lib/pagination';
import { BarChartOutlined, LineChartOutlined, PieChartOutlined, ProfileOutlined, UnorderedListOutlined } from '@ant-design/icons';
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
    Tooltip,
    Modal,
} from 'antd';
import CubeService from '../../service/CubeService.jsx';
import HttpService from '../../util/HttpService.jsx';
const _cubeService = new CubeService();
const Search = Input.Search;
const { TreeNode } = Tree;


export default class dataAssetList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            startIndex: 1,
            perPage: 10,
            listType: 'list',
            cube_name: '',
            loading: false,
            treeData: [],
            buttontype: ['primary', 'default', 'default', 'default', 'default'],
            visible: false,
            oldlist: [],
            tableColumnModel: [],
            tableDataModel: [],
            selectedKeys:['0-0'],//树默认选中第一个
            activeButton:0,
            //选项卡切换默认
            Hcard:null,
            total:0,
            sortedInfo:null
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
        HttpService.post('/reportServer/FlexValue/getFlexValuesTree', JSON.stringify(param)).then(res => {
            if (res.resultCode == "1000") {
                this.setState({
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
    onPageNumChange(startIndex) {
        this.setState({
            startIndex: startIndex
        }, () => {
            this.loadHostTable();
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
        let newList = this.state.oldlist;
        let tableDatas = newList.filter(eval(item => item.table_name.includes(cube_name) ));
        let listType = cube_name === '' ? 'list' : 'search';
        this.setState({
            listType: listType,
            startIndex: 1,
            cube_name: cube_name,
            list:tableDatas
        }, () => {
            //this.loadCubeList();
            
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

    //树节点选中时
    onSelect = (selectedKeys, info) => {
        console.log('onSelect', info);
        this.setState({ selectedKeys });
        let param = {};
        let url = "";
        if (this.state.activeButton == 0) {
            param = { catalog_id: info.node.dataRef.id,dbType:info.node.dataRef.dbtype };
            url = "/reportServer/dataAsset/getTablesByCatalog";
        } else if (this.state.activeButton == 1) {
            param = { source_id: info.node.dataRef.name,dbType:info.node.dataRef.dbtype };
            url = "/reportServer/dataAsset/getTablesBySource";
        } else if (this.state.activeButton == 2) {
            param = { dbtype_id: info.node.dataRef.name,dbType:info.node.dataRef.dbtype };
            url = "/reportServer/dataAsset/getTablesByDbType";
        } else if (this.state.activeButton == 3) {
            param = { host_id: info.node.dataRef.name,dbType:info.node.dataRef.dbtype };
            url = "/reportServer/dataAsset/getTablesByHost";
        } else if (this.state.activeButton == 4) {
            param = { host_id: info.node.dataRef.name,dbType:info.node.dataRef.dbtype };
            url = "/reportServer/dbTableColumn/getTableList";
        }
        this.setState({loading:true});
        HttpService.post(url, JSON.stringify(param)).then(res => {
            this.setState({ list: res.data,oldlist:res.data,loading:false });
        }, errMsg => {
            this.setState({
                list: [],loading:false
            });
        });



    };

    onViewClick =async (viewID, buttontype,number) => {
        let obj={
            0:{
                url:"/reportServer/dataAsset/getTablesByCatalog",
                id:'catalog_id',
                l:'id',
                type:'dbType'
            },
            1:{
                url:"/reportServer/dataAsset/getTablesBySource",
                id:'source_id',
                l:'name',
                type:'dbType'
            },
            2:{
                url:"/reportServer/dataAsset/getTablesByDbType",
                id:"dbtype_id",
                l:'name',
                type:'dbType'
            },
            3:{
                url:"/reportServer/dataAsset/getTablesByHost",
                id:'host_id',
                l:'name',
                type:'dbType'
            },
            4:{
                url:"/reportServer/dbTableColumn/getTableList",
                id:'host_id',
                l:'name',
                type:'dbtype'
            }
        }
        let param = {
            FLEX_VALUE_SET_ID: viewID
        };
        if (buttontype == 3 || buttontype == 4) {
            //数据源
            let param = {};
            let url = "reportServer/DBConnection/ListAll";
            await HttpService.post(url, param).then(response => {
                this.setState({Hcard:{...response[0]},treeData: response })
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
                        Hcard:{...res.data[0]},
                        selectedKeys:["0-0"]
                    });
                    // 设置高亮
                    this.activeButton(buttontype);

                }
                else {
                    message.error(res.message);
                }
            }, errMsg => {
                this.setState({
                    list: [], loading: false, selectedKeys:["0-0"]
                });
            });

        }
        let url =obj[number].url,
            data={
                    [obj[number].id]:this.state.Hcard[obj[number].l],
                    dbType:this.state.Hcard[obj[number].type]
                }
                this.setState({loading:true});
            await HttpService.post(url, JSON.stringify(data)).then(res => {//默认点击修改数据
                this.setState({ list: res.data,oldlist:res.data,loading:false });
                // 设置高亮
                //   this.activeButton(buttontype);
            }, errMsg => {
                this.setState({
                    list: [],
                    loading:false
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
        window.open("#/dataAsset/dataAssetListInfo/"+record.host_id+"/"+record.table_name+"/"+record.dbtype_id);


        // this.setState({
        //     visible: true,
        //     tableColumnModel: [],
        //     tableDataModel: [],
        //     temphost_id:record.host_id,
        //     temptable_name:record.table_name,
        //     tempdbtype_id:record.dbtype_id
        // });
        // //查询表格数据 
        // let param = {
        //     host_id: record.host_id,
        //     table_name: record.table_name,
        //     dbtype_id: record.dbtype_id,
        //     startIndex:this.state.startIndex,
        //     perPage:this.state.perPage
        // };
        // console.log(param)
        // let url = "/reportServer/dataAsset/getValueByHostAndTable";
        // HttpService.post(url, JSON.stringify(param)).then(res => {
            
        //     //生成列信息
        //     let cols = [];
        //     let columns = res.data.list[0];
        //     let obj={
        //         overflow: 'hidden',
        //         display: 'block',
        //         width: '200px',
        //         height:'40px'
        //     }
        //     for (var key in columns) {

        //         if(key==='fileDataBlob'){
        //             cols.push({
        //                 title: key,
        //                 dataIndex: key,
        //                 render: text => <a style={{...obj}}>{text}</a>,
        //             })
        //         }else{
        //             cols.push({
        //                 title: key,
        //                 dataIndex: key
        //             })
        //         }

        //     }
        //     // for (j = 0, len = columns.length; j < len; j++) {
        //     //     cols.push({
        //     //         title: columns[j],
        //     //         dataIndex: columns[j]
        //     //     })
        //     // }
        //     this.setState({ tableColumnModel: cols, tableDataModel: res.data.list ,total:res.data.total});

        //     // 设置高亮
        // }, errMsg => {
        //     this.setState({
        //         list: []
        //     });
        // });
    };

    loadHostTable = () => {
        //查询表格数据 
        let param = {
            host_id:this.state.temphost_id,
            table_name: this.state.temptable_name,
            dbtype_id:this.state.tempdbtype_id,
            startIndex:this.state.startIndex,
            perPage:this.state.perPage
        };
        console.log(param)
        let url = "/reportServer/dataAsset/getValueByHostAndTable";
        HttpService.post(url, JSON.stringify(param)).then(res => {
            
            //生成列信息
            let cols = [];
            let columns = res.data.list[0];
            let obj={
                overflow: 'hidden',
                display: 'block',
                width: '200px',
                height:'40px'
            }
            for (var key in columns) {

                if(key==='fileDataBlob'){
                    cols.push({
                        title: key,
                        dataIndex: key,
                        render: text => <a style={{...obj}}>{text}</a>,
                    })
                }else{
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
            this.setState({ tableColumnModel: cols, tableDataModel: res.data.list ,total:res.data.total});

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

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
          sortedInfo: sorter,
        });
      };
      setTableNameSort = () => {
        this.setState({
          sortedInfo: {
            order: 'descend',
            columnKey: 'table_name',
          },
        });
      };
    render() {
        this.state.list.map((item, index) => {
            item.key = index;
        });
        //console.log(this.state.list);
        let { sortedInfo ,dataSource } = this.state;
        sortedInfo = sortedInfo || {};
        const columns = [{
            title: '数据名称',
            dataIndex: 'table_name',
            key: 'table_name',
            className: 'headerRow',
            sorter: (a, b) => a.table_name - b.table_name,
            sortOrder: sortedInfo.columnKey === 'table_name' && sortedInfo.order,
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
                    <Link to={`/dataAsset/dataAssetInfo/${record.table_id}`}>描述</Link>
                    <Divider type="vertical" />
                    <a onClick={() => this.showModal(record)} href="javascript:;">浏览数据</a>
                    <Divider type="vertical" />
                    <Link to={`/cube/cubeInfo/${record.cube_id}`}>分析</Link>
                    {/* <Divider type="vertical" />
                    <a onClick={() => this.deleteCube(`${record.cube_id}`)} href="javascript:;">删除</a> */}
                </span>
            ),
        }];


        return (
            <div id="page-wrapper">
                <Spin spinning={this.state.loading} delay={100}>
                    <Card title="数据资产目录">
                        <Row>
                            <Col sm={4}>
                                <Card bodyStyle={{ padding: "5px", backgroundColor: '#fafafa' }}>

                                    <Tooltip placement="top" title="目录视图">
                                        <Button type={this.state.buttontype[0]} icon={<ProfileOutlined />} onClick={() => this.onViewClick(4, 0,0)} />
                                    </Tooltip>
                                    <Tooltip placement="top" title="数据来源视图" >
                                        <Button type={this.state.buttontype[1]} icon={<BarChartOutlined />} onClick={() => this.onViewClick(3, 1,1)} />
                                    </Tooltip>
                                    <Tooltip placement="top" title="数据类型视图">
                                        <Button type={this.state.buttontype[2]} icon={<LineChartOutlined />} onClick={() => this.onViewClick(2, 2,2)} />
                                    </Tooltip>
                                    <Tooltip placement="top" title="数据源视图">
                                        <Button type={this.state.buttontype[3]} icon={<PieChartOutlined />} onClick={() => this.onViewClick(3, 3,3)} />
                                    </Tooltip>
                                    <Tooltip placement="top" title="数据源视图">
                                        <Button type={this.state.buttontype[4]} icon={<UnorderedListOutlined />} onClick={() => this.onViewClick(4, 4,4)} />
                                    </Tooltip>


                                </Card>
                                <Tree
                                    // onExpand={this.onExpand}
                                    // expandedKeys={this.state.expandedKeys}
                                    // autoExpandParent={this.state.autoExpandParent}
                                    // onCheck={this.onCheck}
                                    // checkedKeys={this.state.checkedKeys}
                                    selectedKeys={this.state.selectedKeys}
                                    onSelect={this.onSelect}

                                >
                                    {this.renderTreeNodes(this.state.treeData)}
                                </Tree>
                            </Col>
                            <Col sm={20}>
                                {this.state.activeButton!=5?<Card bodyStyle={{ padding: "8px", backgroundColor: '#fafafa' }} >

                                    <Row>
                                        <Col xs={24} sm={12}>
                                            <Search
                                                style={{ maxWidth: 300, marginBottom: '10px' }}
                                                placeholder="请输入..."
                                                enterButton="查询"
                                                onSearch={value => this.onSearch(value)}
                                            />
                                        </Col>
                                        <Col xs={24} sm={12}>
                                            <Button href={"#/dataAsset/modelList"} style={{ float: "right", marginRight: "30px" }} type="primary">新建数据资产</Button>
                                        </Col>
                                    </Row>

                                </Card>:""}
                                <Table dataSource={this.state.list} columns={columns} bordered={true} onChange={this.handleChange}  />
                               
                            </Col>
                        </Row>

                    </Card>
                </Spin>

                {/* <Modal
                    title="数据查看"
                    width='900px'
                    cancelText='取消'
                    okText='确认'
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Card>
                        <Table dataSource={this.state.tableDataModel} columns={this.state.tableColumnModel}
                            scroll={{ x: 1300 }}
                            bordered={true} pagination={false}/>
                        <Pagination current={this.state.startIndex}
                            total={this.state.total}
                            onChange={(startIndex) => this.onPageNumChange(startIndex)} />
                    </Card>
                </Modal> */}
            </div>
        );
    }
}
