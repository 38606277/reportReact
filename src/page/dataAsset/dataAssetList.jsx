
import React from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'antd/lib/pagination';
import { Table, Divider, Button, Card, Tree, Input, Form, Spin, Row, Col,Select } from 'antd';
import CubeService from '../../service/CubeService.jsx';
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

export default class dataAssetList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            pageNum: 1,
            perPage: 10,
            listType: 'list',
            cube_name: '',
            loading: false,
        };
    }
    componentDidMount() {
        this.loadCubeList();
    }
    loadCubeList() {
        let listParam = {};
        listParam.pageNum = this.state.pageNum;
        listParam.perPage = this.state.perPage;
        // 如果是搜索的话，需要传入搜索类型和搜索关键字
        if (this.state.listType === 'search') {
            listParam.cube_name = this.state.cube_name;
        }
        this.setState({ loading: true });
        _cubeService.getCubeList(listParam).then(response => {
            this.setState({ list: response.data.list, total: response.data.total, loading: false });
        }, errMsg => {
            this.setState({
                list: [], loading: false
            });
            // _mm.errorTips(errMsg);
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

   


    renderTreeNodes = data =>
        data.map(item => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.key} {...item} />;
        });


    render() {
        this.state.list.map((item, index) => {
            item.key = index;
        })
        const dataSource = this.state.list;
        let self = this;
        const columns = [{
            title: 'ID',
            dataIndex: 'cube_id',
            key: 'cube_id',
            className: 'headerRow',
        }, {
            title: '数据ID',
            dataIndex: 'cube_name',
            key: 'cube_name',
            className: 'headerRow',
        }, {
            title: '数据描述',
            dataIndex: 'cube_name',
            key: 'cube_name',
            className: 'headerRow',
        }, {
            title: '数据来源',
            dataIndex: 'cube_name',
            key: 'cube_name',
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
                    <Link to={`/cube/cubeInfo/${record.cube_id}`}>编辑</Link>
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
                    <Card title="数据资产目录">
                       
                        <Row > 
                        <Col xs={24} sm={12}>
                                <Button href="#/cube/cubeInfo/null" style={{ float: "left", marginRight: "30px" }} type="primary">新建</Button>

                            </Col>
                            <Col xs={24} sm={12}>
                                <Search
                                    style={{ float: "right", maxWidth: 300, marginBottom: '10px' }}
                                    placeholder="请输入..."
                                    enterButton="查询"
                                    onSearch={value => this.onSearch(value)}
                                />
                            </Col>
                           
                        </Row>
                        <Row>
                            <Card>

                        
                            <Col sm={4}>
                                <Select
                                    showSearch
                                    style={{ width: 150 }}
                                    placeholder="Select a person"
                                    optionFilterProp="children"
                                    onChange={onChange}
                                    onFocus={onFocus}
                                    onBlur={onBlur}
                                    onSearch={onSearch}
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    defaultValue="jack" 
                                >
                                    <Option value="jack">目录视图</Option>
                                    <Option value="lucy">主机视图</Option>
                                    <Option value="tom">存储类型视图</Option>
                                </Select>,
                                <Tree
                                    onExpand={this.onExpand}
                                    expandedKeys={this.state.expandedKeys}
                                    autoExpandParent={this.state.autoExpandParent}
                                    onCheck={this.onCheck}
                                    checkedKeys={this.state.checkedKeys}
                                    onSelect={this.onSelect}
                                    selectedKeys={this.state.selectedKeys}
                                    
                                >
                                    {this.renderTreeNodes(treeData)}
                                </Tree>
                            </Col>
                            <Col sm={20}>
                                <Table dataSource={dataSource} columns={columns} pagination={false} />
                                <Pagination current={this.state.pageNum}
                                    total={this.state.total}
                                    onChange={(pageNum) => this.onPageNumChange(pageNum)} />
                            </Col>
                            </Card>
                        </Row>
                       
                    </Card>
                </Spin>
            </div>
        )
    }
}
