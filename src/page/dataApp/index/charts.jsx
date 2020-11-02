
import React from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'antd/lib/pagination';
import { Table, Divider, Button, Card, Tree, Input, Form, Spin, Row, Col, Select, Tooltip } from 'antd';
import CubeService from '../../../service/CubeService.jsx';
import HttpService from '../../../util/HttpService.jsx';
const _cubeService = new CubeService();
const Search = Input.Search;
const FormItem = Form.Item;
const { TreeNode } = Tree;
const { Option } = Select;


const treeData = [
    {
        title: '人力资源',
        key: '0-0',
        children: [
            {
                title: '0-0-0',
                key: '0-0-0',
                children: [
                    { title: '0-0-0-0', key: '0-0-0-0' },
                    { title: '0-0-0-1', key: '0-0-0-1' },
                    { title: '0-0-0-2', key: '0-0-0-2' },
                ],
            },
            {
                title: '0-0-1',
                key: '0-0-1',
                children: [
                    { title: '0-0-1-0', key: '0-0-1-0' },
                    { title: '0-0-1-1', key: '0-0-1-1' },
                    { title: '0-0-1-2', key: '0-0-1-2' },
                ],
            },
            {
                title: '0-0-2',
                key: '0-0-2',
            },
        ],
    },
    {
        title: '财务',
        key: '0-1',
        children: [
            { title: '0-1-0-0', key: '0-1-0-0' },
            { title: '0-1-0-1', key: '0-1-0-1' },
            { title: '0-1-0-2', key: '0-1-0-2' },
        ],
    },
    {
        title: '投资',
        key: '0-2',
    },
];

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

export default class charts extends React.Component {
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
            buttontype: ['primary', 'default', 'default', 'default']
        };
    }
    componentDidMount() {
        this.loadCubeList();
        this.loadDataList();
    }


    loadCubeList() {
        let param = {
            FLEX_VALUE_SET_ID: 6
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

        HttpService.post('/reportServer/index/getIndexValue', JSON.stringify(param)).then(res => {
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

    onSelect = (selectedKeys, info) => {
        console.log('onSelect', info);
        this.setState({ selectedKeys });
    };

    onViewClick = (viewID, buttontype) => {

        let param = {
            FLEX_VALUE_SET_ID: viewID
        };
        if (buttontype == 3) {
            //数据源
            let param = {};
            let url = "reportServer/DBConnection/ListAll";
            HttpService.post(url, param).then(response => {
                this.setState({ treeData: response });
                // alert(JSON.stringify(this.state.treeData));
                // 设置高亮
                this.activeButton(buttontype);
            }, errMsg => {
                this.setState({
                    list: []
                });
            });

        } else {
            HttpService.post('/reportServer/FlexValue/getFlexValuesTree', JSON.stringify(param)).then(res => {
                if (res.resultCode == "1000") {
                    this.setState({
                        treeData: res.data,
                    });
                    // 设置高亮
                    this.activeButton(buttontype);

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
        this.setState({ buttontype: aButtonType });
    }




    renderTreeNodes = data =>
        data.map(item => {
            if (item.children) {
                return (
                    <TreeNode title={item.value} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode title={item.value} key={item.key} dataRef={item} />;
        });


    render() {
        this.state.list.map((item, index) => {
            item.key = index;
        })
        const dataSource = this.state.list;
        let self = this;
        const columns = [{
            title: '年',
            dataIndex: 'year',
            key: 'table_name',
            className: 'headerRow',
        }, {
            title: '月',
            dataIndex: 'month',
            key: 'table_desc',
            className: 'headerRow',
        }, {
            title: '数量',
            dataIndex: 'amount',
            key: 'catalog_value',
            className: 'headerRow',
        }, {
            title: '数据类型',
            dataIndex: 'cube_desc',
            key: 'cube_desc',
            className: 'headerRow',
        }, {
            title: '操作',
            dataIndex: '操作',
            className: 'headerRow',
            render: (text, record) => (
                <span>
                    <Link to={`/dataAsset/dataAssetInfo/${record.cube_id}`}>编辑</Link>
                    <Divider type="vertical" />
                    <Link to={`/cube/cubeInfo/${record.cube_id}`}>浏览</Link>
                    <Divider type="vertical" />
                    <Link to={`/cube/cubeInfo/${record.cube_id}`}>分析</Link>
                    <Divider type="vertical" />
                    <a onClick={() => this.deleteCube(`${record.cube_id}`)} href="javascript:;">删除</a>
                </span>
            ),
        }];


        return (
            <div id="page-wrapper">
                <Spin spinning={this.state.loading} delay={100}>
                    <Card title="统计指标查询">
                        <Row>
                            <Col sm={4}>
                                
                                <Tree
                                    // onExpand={this.onExpand}
                                    // expandedKeys={this.state.expandedKeys}
                                    // autoExpandParent={this.state.autoExpandParent}
                                    // onCheck={this.onCheck}
                                    // checkedKeys={this.state.checkedKeys}
                                    onSelect={this.onSelect}

                                >
                                    {this.renderTreeNodes(this.state.treeData)}
                                </Tree>
                            </Col>
                            <Col sm={20}>
                                <Card bodyStyle={{ padding: "8px", backgroundColor: '#fafafa' }}>
                                    <Button href={"#/dict/DictValueInfo/" + this.state.dictId + "/null"} style={{ float: "right", marginRight: "20px" }} type="primary">列表</Button>
                                    <Button href={"#/dict/DictValueInfo/" + this.state.dictId + "/null"} style={{ float: "right", marginRight: "20px" }} type="default">柱图</Button>
                                    <Button href={"#/dict/DictValueInfo/" + this.state.dictId + "/null"} style={{ float: "right", marginRight: "20px" }} type="default">线图</Button>

                                </Card>
                                <Table dataSource={this.state.list} columns={columns} pagination={false} />
                                <Pagination current={this.state.pageNum}
                                    total={this.state.total}
                                    onChange={(pageNum) => this.onPageNumChange(pageNum)} />
                            </Col>
                        </Row>

                    </Card>
                </Spin>
            </div>
        )
    }
}
