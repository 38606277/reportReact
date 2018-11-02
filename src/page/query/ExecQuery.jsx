import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Divider,DatePicker,Modal, Icon, Form, Input, Tag,Select, Button, Card, Checkbox,Layout,Tooltip,Row,Col,Pagination  } from 'antd';
import queryService from '../../service/QueryService.jsx';
import ExportJsonExcel from "js-export-excel"; 
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
const Option = Select.Option;
const Search = Input.Search;
const FormItem = Form.Item;
const _query =new queryService();
const CheckableTag = Tag.CheckableTag;
const { Header, Footer, Sider, Content } = Layout;

class ExecQuery extends React.Component {

    constructor(props) {
        super(props);
        const okdata=[];
        this.state = { 
          paramv:this.props.match.params.paramv,
          paramv2:this.props.match.params.paramv2,
          paramv3:this.props.match.params.paramv3,
          data:[],formData:{},categoryList:[],
          reportNameList:[],
          category:'',reportName:'',
          inList:[], outlist:[],
          resultList:[],
          visible: false,
          dictionaryList:[],
          pageNumd         : 1,perPaged         : 10, searchDictionary :'',
          startIndex         :1,perPage         :10, searchResult     :'',
          paramValue:'',paramName:'',
          selectedRowKeys:[],
          baoTitle:"数据列表",
          selectedTags: [],
          selectedTagsReport: [],
          newList:[],
          loading: false
        };
      }
      //组件更新时被调用 
        componentWillReceiveProps(nextProps){
            let key = nextProps.match.params.paramv;
            let key2 = nextProps.match.params.paramv2;
            let oldparamv2=this.state.paramv;
            this.setState({
                paramv:key,
                paramv2:key2,
                paramv3:nextProps.match.params.paramv3,
               resultList:[],totalR:0
            },function(){
                if(oldparamv2!=key){
                    this.loadQueryCriteria(this.state.paramv);
                }
            });
        }
      componentDidMount() {
          //获取报表列表
          this.loadQueryCriteria(this.state.paramv);
        
      }
    //下拉事件
    // onSelectChange(name,value,checked){
    //         if(name=="category"){
    //             this.setState({category:value,selectedTags:[],selectedTagsReport:[],resultList:[],data:[],selectedRowKeys:[],formData:[],inlist:[],outlist:[],totalR:0},function(){
    //                 const { selectedTags } = this.state;
    //                 const nextSelectedTags = checked? [...selectedTags, value]: selectedTags.filter(t => t !== value);
    //                 this.setState({ selectedTags: nextSelectedTags });
    //                 this.loadReportNameList(value);
    //             });
    //         }else if(name=="reportName"){
    //             this.setState({reportName:value,selectedTagsReport:[],resultList:[],data:[],selectedRowKeys:[],formData:[],inlist:[],outlist:[],totalR:0},function(){
    //                 const { selectedTagsReport } = this.state;
    //                 const nextSelectedTags = checked? [...selectedTagsReport, value]: selectedTagsReport.filter(t => t !== value);
    //                 this.setState({ selectedTagsReport: nextSelectedTags });
    //                 this.loadQueryCriteria(this.state.category,value);
    //             });
    //         }
    // }
    // //获取报名名称列表
    // loadReportNameList(param){
    //     _query.getReportNameList(param).then(response => {
    //         const children2=[];
    //         let rlist=response.data;
    //         for (let i = 0; i < rlist.length; i++) {
    //             children2.push(rlist[i].name);
    //             //children2.push(<Option key={rlist[i].name}>{rlist[i].name}</Option>);
    //         }
    //         this.setState({reportNameList:children2});
    //     });     
    // }
    //获取查询条件及输出字段
    loadQueryCriteria(selectClassId){
        const inlist=[],outlist=[];
        _query.getQueryCriteria(selectClassId).then(response=>{
           let inColumns=response.data.in;
           let outColumns=response.data.out;
        //    inColumns.map((item,index)=>{
        //         let json={key:item.id,name:item.name,lookup:item.lookup,datatype:item.datatype,mut:item.mut,default:item.default};
        //         inlist.push(json);
        //     });
            var k=Math.ceil(inColumns.length/2);
            var j= 0;
            for(var i=1;i<=k;i++){
                var arr= new Array();
                for(j ; j < i*2; j++){
                    if(undefined!=inColumns[j]){
                        arr.push(inColumns[j]);
                    }
                }
                inlist.push(arr);  
             }
            outColumns.map((item,index)=>{
               
                let json={key:item.out_id.toUpperCase(),title:item.out_name,dataIndex:item.out_id.toUpperCase()};
                outlist.push(json);
            });
            this.setState({outlist:outlist,inList:inlist},function(){
                
            });
        });
    }
    //设置参数条件值
    changeEvent(e) {
         let id = e.target.id;
         let nv={[id]:e.target.value};
         let arrd=this.state.data;
         arrd.forEach(function(item,index){
            for (var key in item) {
                if(id==key){
                    arrd.splice(index,1);     
                }
            }
          });
         this.state.data.push(nv);
      }
     //执行查询 
    execSelect(){
        this.setState({baoTitle:this.state.paramv3},function(){});
        if(null!=this.state.data){
            let param=[{in:this.state.data},{startIndex:this.state.startIndex,perPage:10,searchResult:this.state.searchResult}];
            _query.execSelect(this.state.paramv,this.state.paramv2,param).then(response=>{
                if(response.resultCode!='3000'){
                    this.setState({resultList:response.list,totalR:response.totalSize});
                }
            });
        }
        const tableCon = ReactDOM.findDOMNode(this.refs['resultTable'])//利用reactdom.finddomnode()来获取真实DOM节点
        const table = tableCon.querySelector('table')
        table.setAttribute('id','table-to-xls')
    }
    //打开模式窗口
    openModelClick(name,param){
         this.okdata=[];
         this.setState({ visible: true,
            loading: true,dictionaryList:[],paramValue:param,paramName:name,
            totald:0,selectedRowKeys:[]},function(){
            this.loadModelData(param);
         });
    }
    //调用模式窗口内的数据查询
    loadModelData(param){
        let page = {};
        page.pageNumd  = this.state.pageNumd;
        page.perPaged  = this.state.perPaged;
        page.searchDictionary=this.state.searchDictionary;

        _query.getDictionaryList(param,page).then(response=>{
          this.setState({loading: false,dictionaryList:response.data,totald:response.totald},function(){});
        });
    }
     // 字典页数发生变化的时候
     onPageNumdChange(pageNumd){
        this.setState({
            pageNumd : pageNumd
        }, () => {
            this.loadModelData(this.state.paramValue);
        });
    }
    onPageNumChange(pageNumR){
        this.setState({
            startIndex : pageNumR
        }, () => {
            this.execSelect();
        });
    }
    //模式窗口点击确认
      handleOk = (e) => {
        
            let values=this.okdata.join(",");
            let name = this.state.paramName;
            let nv={[name]:values};
            let arrd=this.state.data;
            arrd.forEach(function(item,index){
                for (var key in item) {
                    if(name==key){
                        arrd.splice(index,1);     
                    }
                }
            });
            this.state.data.push(nv);
            this.props.form.setFieldsValue({[name]:values});
            this.setState({
                 visible: false,
            });

      }
    //模式窗口点击取消
      handleCancel = (e) => {
        this.okdata=[];
        this.setState({
          visible: false,
          selectedRowKeys:[]
        });
      }
      //数据字典选中事件
      onSelectChangeDic = (selectedRowKeys) => {
        this.okdata=selectedRowKeys;
        this.setState({ selectedRowKeys });
      }
      //导出到Excel
      downloadExcel = () => {
        // currentPro 是列表数据
            const  currentPro  = this.state.outlist;
            var option={};
            let dataTable = [],keyList=[];
            if (currentPro) {
              for (let i in currentPro) {
                  dataTable.push(currentPro[i].title);
                  keyList.push(currentPro[i].key);
              }
            }
            option.fileName = this.state.reportName;
            option.datas=[
              {
                sheetData:this.state.resultList,
                sheetName:'sheet',
                sheetFilter:keyList,
                sheetHeader:keyList,
              }
            ];
        
            var toExcel = new ExportJsonExcel(option); //new
            toExcel.saveExcel();
      }
      //执行查询的search
     onResultSearch(searchKeyword){
        this.setState({pageNumR: 1,searchResult:searchKeyword},function(){
            this.execSelect();
        });
     }
     //数据字典的search
     onDictionarySearch(searchKeyword){
        this.setState({ pageNumd : 1, searchDictionary   : searchKeyword
        }, () => {
            this.loadModelData(this.state.paramValue);
        });
     }
     //执行查询的打印
     printResultList(){
        var tableToPrint = document.getElementById('table-to-xls');//将要被打印的表格
        var newWin= window.open("");//新打开一个空窗口
        newWin.document.write(tableToPrint.outerHTML);//将表格添加进新的窗口
        newWin.document.close();//在IE浏览器中使用必须添加这一句
        newWin.focus();//在IE浏览器中使用必须添加这一句
        newWin.print();//打印
        newWin.close();//关闭窗口
     }
        
    render() {
        const { getFieldDecorator } = this.props.form;
    //   const  inColumns = [{
    //     title: '参数名',
    //     dataIndex: 'key',
    //     key: 'key',
    //   }, {
    //     title: '参数值',
    //     dataIndex: 'in_name',
    //     key: 'in_name',
    //     render: (text, record,index) => {
    //         if(record.datatype=='varchar'){
    //             return (
    //                 <Form>
    //                   <Form.Item style={{ margin: 0 }}>
    //                     {this.props.form.getFieldDecorator(record.name, {
    //                       rules: [{
    //                         required: true,
    //                         message: `参数名是必须的！`,
    //                       }]
                          
    //                     })(
    //                         <Input onChange={e=>this.changeEvent(e)} addonAfter={record.lookup==''?'':<Icon type="ellipsis" theme="outlined"  onClick={e=>this.openModelClick(record.name,record.lookup)}/>} />
    //                     )}
    //                  </Form.Item>
    //             </Form>
    //             );
    //         }else{
    //             return (
    //             <Form>
    //                 <Form.Item style={{ margin: 0 }}>
    //                 {this.props.form.getFieldDecorator(record.name, {
    //                     rules: [{
    //                     required: true,
    //                     message: `参数名是必须的！`,
    //                     }]
    //                 })(
    //                     <DatePicker />
    //                 )}
    //                 </Form.Item>
    //             </Form>
    //            );
    //         }
    //       }
    //   }];
    //   const  outColumns = [{
    //     title: '列名',
    //     dataIndex: 'title',
    //     key: 'title',
    //   }];
    //  const resultColumns=this.state.outlist;
    //   const rowSelection = {
    //     onSelect: (record, selected, selectedRows) => {
    //         this.resultColumns=selectedRows;
    //       this.setState({formData:selectedRows},function(){
            
    //       });
    //     },
    //     onSelectAll: (selected, selectedRows, changeRows) => {
    //         this.resultColumns=selectedRows;
    //         this.setState({formData:selectedRows},function(){
    //         });
    //     },
    //   };
      const { selectedRowKeys } = this.state;
    
      const rowSelectionDictionary = {
        selectedRowKeys,
        onChange:this.onSelectChangeDic,
      };
    const  dictionaryColumns = [{
        title: '编码',
        dataIndex: 'value',
        key: 'value',
    },{
        title: '名称',
        dataIndex: 'name',
        key: 'name',
    }];
    if(null!=this.state.resultList){
        this.state.resultList.map((item,index)=>{
            item.key=index;
        });
    }
    if(null!=this.state.dictionaryList){
        this.state.dictionaryList.map((item,index)=>{
            item.key=item.value;
        });
    }
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
 
  const inColumn=this.state.inList.map((item, index)=>{
    const rc=item.map((record, index)=> {
            if(record.datatype=='varchar'){
                return (
                    <Col span={12} key={record.qry_id+index}>
                    <FormItem style={{ margin: 0 }} {...formItemLayout}  label={record.in_name} >
                        {getFieldDecorator(record.in_id, {
                          rules: [{
                            required: true,
                            message: `参数名是必须的！`,
                          }]
                        })(
                            <Input onChange={e=>this.changeEvent(e)} 
                            addonAfter={record.dict_id==null?'':
                            <Icon type="ellipsis" theme="outlined"  
                            onClick={e=>this.openModelClick(record.in_id,record.dict_id)}/>} />
                        )}
                     </FormItem>
                </Col>
                );
            }else{
                return (
                    <Col span={12} key={record.qry_id+index}>
                 <FormItem style={{ margin: 0 }} {...formItemLayout}  label={record.in_name}>
                    {getFieldDecorator(record.in_id, {
                        rules: [{
                        required: true,
                        message: `参数名是必须的！`,
                        }]
                    })(
                        <DatePicker />
                    )}
                   </FormItem>
                </Col>
               );
            }
        });
        return <Row key={index}>{rc}</Row>;
            
    });
    return (
        <div id="page-wrapper">
        {/* <Search style={{ width: 300,marginBottom:'10px' ,marginRight:'10px'}}
                placeholder="请输入..."
                enterButton="查询"
                onSearch={value => this.onResultSearch(value)}
                /> */}
        <Card bordered={false} title={this.state.paramv3} extra={ <div>
                        <a onClick={()=>this.execSelect()}>查询 </a>
                        <Divider type="vertical" />
                        <a onClick={this.downloadExcel}>保存到excel</a>
                        <Divider type="vertical" />
                        <a onClick={()=>this.printResultList()}>打印</a>
                    </div>}>
                    {inColumn}
        </Card>            
               {/* <Row><Col>
                          <Button type='primary' onClick={()=>this.execSelect()}>执行查询</Button>
                    </Col></Row> 
        
             <Layout>
                <Sider width={100} style={{backgroundColor:'#fff'}}><h6 style={{ marginRight: 8, display: 'inline' ,fontSize:16}}>报表类别:</h6></Sider>
                <Content style={{backgroundColor:'#fff',fontSize:14}}>{this.state.categoryList.map(tag => (
                            <CheckableTag
                                key={tag}
                                checked={selectedTags.indexOf(tag) > -1}
                                onChange={(checked) =>this.onSelectChange('category',tag,checked)}
                            >
                                {tag}
                        </CheckableTag>
                    ))}</Content>
            </Layout>
            <Divider  style={{backgroundColor:'#fff',margin :'1px 0 '}}/>
            <Layout>
            <Sider  width={100} style={{backgroundColor:'#fff',fontSize:14}}><h6 style={{ marginRight: 8, display: 'inline' ,fontSize:16}}>报表类别:</h6></Sider>
                <Content style={{backgroundColor:'#fff'}}> {this.state.reportNameList.map(tag => (
                        <CheckableTag
                            key={tag}
                            checked={selectedTagsReport.indexOf(tag) > -1}
                            onChange={(checked) =>this.onSelectChange('reportName',tag,checked)}
                        >
                            {tag}
                    </CheckableTag>
                    ))}</Content>
            </Layout> 
            
                <Row><Col>
                    <Form>
                        {listss}
                    </Form>
                </Col></Row>

                   <Row><Col>
                     <Table title={() => '输出字段'} rowSelection={rowSelection} dataSource={this.state.outlist} columns={outColumns}  pagination={false} 
                    style={{marginTop:'10px', marginLeft: '-30px', marginRight: '-30px', border: '0'}} size="small"/>
                    </Col></Row>
           
             </Card> */}
            <Card >
                {/* <Button type="primary" onClick={this.downloadExcel} style={{marginRight:'10px'}}>导出</Button>
                <ReactHTMLTableToExcel
                      className="downloadButton"
                      table="table-to-xls"
                      filename={this.state.reportName}
                      sheet={this.state.reportName}
                      buttonText="导出2"
                    style={{marginRight:'10px'}}/> */}
      
                
                        {/* <Button type="primary" onClick={()=>this.printResultList()}>打印</Button> */}
                <Table ref="resultTable" columns={this.state.outlist} dataSource={this.state.resultList} scroll={{ x: '100%' }} size="small" bordered  pagination={false}/>
                <Pagination current={this.state.startIndex} 
                        total={this.state.totalR} 
                        onChange={(startIndex) => this.onPageNumChange(startIndex)}/> 
            </Card>
            <div>
                <Modal
                title="字典查询"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                >
                    <Search
                        style={{ width: 300,marginBottom:'10px' }}
                        placeholder="请输入..."
                        enterButton="查询"
                        onSearch={value => this.onDictionarySearch(value)}
                        />
                        <Table ref="diction" rowSelection={rowSelectionDictionary} columns={dictionaryColumns} 
                        dataSource={this.state.dictionaryList} size="small" bordered  pagination={false}/>
                        <Pagination current={this.state.pageNumd} 
                        total={this.state.totald} 
                        onChange={(pageNumd) => this.onPageNumdChange(pageNumd)}/> 
                </Modal>
            </div>
         </div>
    )}
}

export default Form.create()(ExecQuery);
