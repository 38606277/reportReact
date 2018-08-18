/*
* @Author: Rosen
* @Date:   2018-01-31 13:10:47
* @Last Modified by:   Rosen
* @Last Modified time: 2018-02-01 16:30:04
*/
import React        from 'react';
import { Link }     from 'react-router-dom';
import MUtil        from 'util/mm.jsx'
import Product      from 'service/product-service.jsx'

import PageTitle    from 'component/page-title/index.jsx';
import ListSearch   from './index-list-search.jsx';
import TableList    from 'util/table-list/index.jsx';
import Pagination   from 'util/pagination/index.jsx';
import Table        from 'antd/lib/table';

import './index.scss';

const _mm           = new MUtil();
const _product      = new Product();

class ProductList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list            : [],
            pageNum         : 1           
        };
    }
    
    componentDidMount(){
        this.loadProductList();
    }
    // 加载商品列表
    loadProductList(){
        let listParam = {};
        listParam.userId = _mm.getStorage('userInfo').userId;
        listParam.pageNum  = this.state.pageNum;
        // 如果是搜索的话，需要传入搜索类型和搜索关键字
        if(this.state.listType === 'search'){
            listParam.keyword    = this.state.searchKeyword;
        }
        // 请求接口
        _product.getProductList(listParam).then(res => {
                this.setState(res);
        }, errMsg => {
            this.setState({
                list : []
            });
            _mm.errorTips(errMsg);
        });
    }
    // 搜索
    onSearch(searchKeyword){
       
        this.setState({
            pageNum         : 1,
            searchKeyword   : searchKeyword
        }, () => {
            this.loadProductList();
        });
    }
    // 页数发生变化的时候
    onPageNumChange(pageNum){
        this.setState({
            pageNum : pageNum
        }, () => {
            this.loadProductList();
        });
    }
    
    render(){
        const dataSource = this.state.list;
          
          const columns = [{
            title: '填报名称',
            dataIndex: 'taskname',
            key: 'taskname',
            render: function(text, record, index) {
                return <Link to={ `/product/taskInfo/${record.taskid}` }>{text}</Link>;
              } 
          }, {
            title: '填报开始时间',
            dataIndex: 'startdate',
            key: 'startdate',
          }, {
            title: '填报结束时间',
            dataIndex: 'enddate',
            key: 'enddate',
          }];
        return (
            <div id="page-wrapper">
                <PageTitle title="代办任务列表">
                    {/* <div className="page-header-right">
                        <Link to="/product/save" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>添加商品</span>
                        </Link>
                    </div> */}
                </PageTitle>
                <ListSearch onSearch={(searchKeyword) => {this.onSearch(searchKeyword)}}/>
                <Table dataSource={dataSource} columns={columns} />
                
                <Pagination current={this.state.pageNum} 
                    total={this.state.total} 
                    onChange={(pageNum) => this.onPageNumChange(pageNum)}/>
            </div>
        );
    }
}

export default ProductList;