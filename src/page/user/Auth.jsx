
import React from 'react';
import { Link } from 'react-router-dom';
import User from '../../service/user-service.jsx';
import Pagination from 'antd/lib/pagination';
import { Table, Divider, Button, Card, Tooltip, Input, Row, Col,Tree } from 'antd';
import LocalStorge from '../../util/LogcalStorge.jsx';
const localStorge = new LocalStorge();
const _user = new User();
const Search = Input.Search;
const TreeNode = Tree.TreeNode;

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            pageNum: 1,
            perPage: 10,
            listType: 'list',
            searchKeyword: ''
        };
    }
    componentDidMount() {
        this.loadUserList();
    }
    loadUserList() {
        let listParam = {};
        listParam.pageNum = this.state.pageNum;
        listParam.perPage = this.state.perPage;
        // 如果是搜索的话，需要传入搜索类型和搜索关键字
        if (this.state.listType === 'search') {
            listParam.keyword = this.state.searchKeyword;
        }
        _user.getUserList(listParam).then(response => {
            this.setState(response.data);
        }, errMsg => {
            this.setState({
                list: []
            });
            // _mm.errorTips(errMsg);
        });
    }
    // 页数发生变化的时候
    onPageNumChange(pageNum) {
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadUserList();
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
    onSearch(searchKeyword) {
        let listType = searchKeyword === '' ? 'list' : 'search';
        this.setState({
            listType: listType,
            pageNum: 1,
            searchKeyword: searchKeyword
        }, () => {
            this.loadUserList();
        });
    }
    deleteUser(id) {
        if (confirm('确认删除吗？')) {
            _user.delUser(id).then(response => {
                alert("删除成功");
                this.loadUserList();
            }, errMsg => {
                alert("删除失败");
                // _mm.errorTips(errMsg);
            });
        }
    }
    //展示当前行信息
    showCurRowMessage(record) {
        alert("key:" + record.userId + " name:" + record.userName + " description:" + record.description);
    }

    render() {
        this.state.list.map((item, index) => {
            item.key = index;
        })
        const userinfos = localStorge.getStorage('userInfo');
        const dataSource = this.state.list;
        let self = this;
        const columns = [{
            title: '角色',
            dataIndex: 'isAdminText',
            key: 'isAdminText'
        }];

        return (
            <div id="page-wrapper">
                <Card title="授权管理">


                    <Search
                        style={{ width: 300, marginBottom: '10px' }}
                        placeholder="请输入..."
                        enterButton="查询"
                        onSearch={value => this.onSearch(value)}
                    />
                    <Button href="#/user/userInfo/null" style={{ float: "right", marginRight: "30px" }} type="primary">新建用户</Button>
                    <Row gutter={35}>
                        <Col span={8}>
                            <Table dataSource={dataSource} columns={columns} pagination={false} />
                            <Pagination current={this.state.pageNum}
                                total={this.state.total}
                                onChange={(pageNum) => this.onPageNumChange(pageNum)} />


                        </Col>
                        <Col span={12}>
                            <Card>
                            <Tree
                                checkable
                                defaultExpandedKeys={['0-0-0', '0-0-1']}
                                defaultSelectedKeys={['0-0-0', '0-0-1']}
                                defaultCheckedKeys={['0-0-0', '0-0-1']}
                                onSelect={this.onSelect}
                                onCheck={this.onCheck}
                            >
                                <TreeNode title="函数权限" key="0-0">
                                    <TreeNode title="parent 1-0" key="0-0-0" >
                                        <TreeNode title="leaf" key="0-0-0-0"  />
                                        <TreeNode title="leaf" key="0-0-0-1" />
                                    </TreeNode>
                                    <TreeNode title="parent 1-1" key="0-0-1">
                                        <TreeNode title={<span style={{ color: '#1890ff' }}>sss</span>} key="0-0-1-0" />
                                    </TreeNode>
                                </TreeNode>
                                <TreeNode title="查询权限" key="0-0">
                                    <TreeNode title="parent 1-0" key="0-0-0" >
                                        <TreeNode title="leaf" key="0-0-0-0"  />
                                        <TreeNode title="leaf" key="0-0-0-1" />
                                    </TreeNode>
                                    <TreeNode title="parent 1-1" key="0-0-1">
                                        <TreeNode title={<span style={{ color: '#1890ff' }}>sss</span>} key="0-0-1-0" />
                                    </TreeNode>
                                </TreeNode>
                                <TreeNode title="Excel功能权限" key="0-0">
                                    <TreeNode title="parent 1-0" key="0-0-0" >
                                        <TreeNode title="leaf" key="0-0-0-0"  />
                                        <TreeNode title="leaf" key="0-0-0-1" />
                                    </TreeNode>
                                    <TreeNode title="parent 1-1" key="0-0-1">
                                        <TreeNode title={<span style={{ color: '#1890ff' }}>sss</span>} key="0-0-1-0" />
                                    </TreeNode>
                                </TreeNode>
                                <TreeNode title="WEB功能权限" key="0-0">
                                    <TreeNode title="parent 1-0" key="0-0-0" >
                                        <TreeNode title="leaf" key="0-0-0-0"  />
                                        <TreeNode title="leaf" key="0-0-0-1" />
                                    </TreeNode>
                                    <TreeNode title="parent 1-1" key="0-0-1">
                                        <TreeNode title={<span style={{ color: '#1890ff' }}>sss</span>} key="0-0-1-0" />
                                    </TreeNode>
                                </TreeNode>
                                <TreeNode title="数据权限" key="0-0">
                                    <TreeNode title="公司数据权限" key="0-0-0" >
                                        <TreeNode title="leaf" key="0-0-0-0"  />
                                        <TreeNode title="leaf" key="0-0-0-1" />
                                    </TreeNode>
                                    <TreeNode title="部门数据权限" key="0-0-1">
                                        <TreeNode title={<span style={{ color: '#1890ff' }}>sss</span>} key="0-0-1-0" />
                                    </TreeNode>
                                </TreeNode>
                            </Tree>
                            </Card>


                        </Col>
                    </Row>
                </Card>

            </div>
        )
    }
}

export default Auth;