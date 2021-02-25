
import React from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'antd/lib/pagination';
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
            startIndex: 1,
            perPage: 10,
            total:0,
            listType: 'list',
            cube_name: '',
            loading: false,
            tableColumnModel: [],
            tableDataModel: [],
            tempdbtype_id:this.props.match.params.tempdbtype_id,
            temptable_name:this.props.match.params.temptable_name,
            temphost_id:this.props.match.params.temphost_id
        };
    }
    componentDidMount() {
        this.loadHostTable();
    }

    // 页数发生变化的时候
    onPageNumChange(startIndex) {
        this.setState({
            startIndex: startIndex
        }, () => {
            this.loadHostTable();
        });
    }
  
    // 搜索
    onSearch(cube_name) {
        
    }

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
            this.setState({ tableColumnModel: cols, tableDataModel: res.data.list ,total:res.data.total});

        }, errMsg => {
            
        });
    };


    showTotal  = (total) =>  {
        return `共 ${total} 条`;
      }
    
    render() {
        return (
            <div id="page-wrapper">
                <Spin spinning={this.state.loading} delay={100}>
                    <Card title="数据资产目录">
                    <Table dataSource={this.state.tableDataModel} columns={this.state.tableColumnModel}
                            scroll={{ x: 1300 }}
                            bordered={true} pagination={false}/>
                        <Pagination current={this.state.startIndex}
                            total={this.state.total}
                            showTotal={this.showTotal}
                            size="small"
                            onChange={(startIndex) => this.onPageNumChange(startIndex)} />
                    </Card>
                </Spin>
            </div>
        );
    }
}
