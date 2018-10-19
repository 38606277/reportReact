import React from 'react'
import ReactDOM from 'react-dom';
import { Table, Divider,DatePicker,Modal, Icon, Form, Input, Select, Button, Card, Checkbox,Tooltip,Row,Col,Pagination  } from 'antd';
import queryService from '../../service/QueryService.jsx';
import ExportJsonExcel from "js-export-excel"; 
import ReactHTMLTableToExcel from 'react-html-table-to-excel'//主要是这个插件！！
const Option = Select.Option;
const Search = Input.Search;
const _query =new queryService();

class ExecQuery extends React.Component {

    constructor(props) {
        super(props);
        const okdata=[];
        this.state = { 
          data:[],
          formData:{},
          categoryList:[],
          reportNameList:[],
          category:'',
          reportName:'',
          inlist:[],
          outlist:[],
          resultList:[],
          visible: false,
          dictionaryList:[],
          pageNumd         : 1,
          perPaged         : 10,
          searchDictionary :'',
          startIndex         :1,
          perPage         :10,
          searchResult     :'',
          paramValue:'',
          paramName:'',
          selectedRowKeys:[],
          baoTitle:"数据列表"
        };
        
      }
      
      componentDidMount() {
          //获取报表列表
        _query.getCategoryList().then(response => {
            const children=[];
            let rlist=response.data;
            for (let i = 0; i < rlist.length; i++) {
              children.push(<Option key={rlist[i].name}>{rlist[i].name}</Option>);
            }
            this.setState({categoryList:children});
        }, errMsg => {
            this.setState({
                categoryList : []
            });
        });
        
      }
    //下拉事件
    onSelectChange(name,value){
            if(name=="category"){
                this.setState({category:value},function(){
                    this.loadReportNameList(value);
                });
            }else if(name=="reportName"){
                this.setState({reportName:value},function(){
                    this.loadQueryCriteria(this.state.category,value);
                });
            }
    }
    //获取报名名称列表
    loadReportNameList(param){
        _query.getReportNameList(param).then(response => {
            const children2=[];
            let rlist=response.data;
            for (let i = 0; i < rlist.length; i++) {
                children2.push(<Option key={rlist[i].name}>{rlist[i].name}</Option>);
            }
            this.setState({reportNameList:children2});
        });     
    }
    //获取查询条件及输出字段
    loadQueryCriteria(selectClassId,selectID){
        const inlist=[],outlist=[];
        _query.getQueryCriteria(selectClassId,selectID).then(response=>{
           let inColumns=response.data.in;
           let outColumns=response.data.out;
           inColumns.map((item,index)=>{
                let json={key:item.id,name:item.name,lookup:item.lookup,datatype:item.datatype,mut:item.mut,default:item.default};
                inlist.push(json);
            });
            outColumns.map((item,index)=>{
                let json={key:item.id.toUpperCase(),title:item.name,dataIndex:item.id.toUpperCase()};
                outlist.push(json);
            });
            this.setState({inlist:inlist,outlist:outlist},function(){});
        });
    }
    changeEvent(e) {
         let id = e.target.id;
         let nv={[id]:e.target.value};
         this.state.data.push(nv);
         //this.state.data[index][field] = e.target.value;
      }
     //执行查询 
    execSelect(){
        this.setState({baoTitle:this.state.reportName},function(){});
        let param=[{in:this.state.data},{startIndex:this.state.startIndex,perPage:10,searchResult:this.state.searchResult}];
        _query.execSelect(this.state.category,this.state.reportName,param).then(response=>{
            if(response.resultCode!='3000'){
                this.setState({resultList:response.data.list,totalR:response.data.totalSize});
            }
        });
        const tableCon = ReactDOM.findDOMNode(this.refs['resultTable'])//利用reactdom.finddomnode()来获取真实DOM节点
        const table = tableCon.querySelector('table')
        table.setAttribute('id','table-to-xls')
    }
    //打开模式窗口
    openModelClick(name,param){
        this.setState({
            visible: true,
          });
          this.okdata=[];
        //  this.refs.diction;
         this.setState({dictionaryList:[],paramValue:param,paramName:name,totald:0,selectedRowKeys:[]},function(){
            this.loadModelData(param);
         });
         
        //console.log("打开"+name);
    }
    //调用模式窗口内的数据查询
    loadModelData(param){
        let page = {};
        page.pageNumd  = this.state.pageNumd;
        page.perPaged  = this.state.perPaged;
        page.searchDictionary=this.state.searchDictionary;
        _query.getDictionaryList(param,page).then(response=>{
          this.setState({dictionaryList:response.data,totald:response.totald},function(){});
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
            this.state.data.push(nv);
            this.props.form.setFieldsValue({[name]:values});
        // document.getElementById(name).value=values;
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
            const  currentPro  = this.state.formData;
            var option={};
            let dataTable = [],keyList=[];
            if (currentPro) {
              for (let i in currentPro) {
                  dataTable.push(currentPro[i].title);
                  keyList.push(currentPro[i].key);
              }
            }
            // const  dataListPro  = this.state.resultList;
            // let dataList = [];
            // if (dataListPro) {
            //   for (let i in dataListPro) {
            //     let obj={};
            //       for(let ii=0;ii<keyList.length;ii++){
            //           let vs=keyList[ii];
            //           obj={
            //             [vs]:dataListPro[i][vs]
            //           }
            //         console.log(dataListPro[i][vs]);
            //         console.log(obj);
            //       }
                 
            //     // let obj = {
            //     //     '项目名称': dataListPro[i].name,
            //     //     '项目地址': dataListPro[i].address,
            //     //     '考勤范围': dataListPro[i].radius,
            //     //   }
            //    // dataList.push(currentPro[i].title);
            //   }
            // }
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
        //  this.refs.diction
        var tableToPrint = document.getElementById('table-to-xls');//将要被打印的表格
        var newWin= window.open("");//新打开一个空窗口
        newWin.document.write(tableToPrint.outerHTML);//将表格添加进新的窗口
        newWin.document.close();//在IE浏览器中使用必须添加这一句
        newWin.focus();//在IE浏览器中使用必须添加这一句
        newWin.print();//打印
        newWin.close();//关闭窗口
     }
    
    render() {
      const  inColumns = [{
        title: '参数名',
        dataIndex: 'key',
        key: 'key',
      }, {
        title: '参数值',
        dataIndex: 'in_name',
        key: 'in_name',
        render: (text, record,index) => {
            if(record.datatype=='varchar'){
                return (
                    <Form>
                      <Form.Item style={{ margin: 0 }}>
                        {this.props.form.getFieldDecorator(record.name, {
                          rules: [{
                            required: true,
                            message: `参数名是必须的！`,
                          }]
                          
                        })(
                            <Input onChange={e=>this.changeEvent(e)} addonAfter={record.lookup==''?'':<Icon type="ellipsis" theme="outlined"  onClick={e=>this.openModelClick(record.key,record.lookup)}/>} />
                        )}
                     </Form.Item>
                </Form>
                );
            }else{
                return (
                <Form>
                    <Form.Item style={{ margin: 0 }}>
                    {this.props.form.getFieldDecorator(record.name, {
                        rules: [{
                        required: true,
                        message: `参数名是必须的！`,
                        }]
                    })(
                        <DatePicker />
                    )}
                    </Form.Item>
                </Form>
               );
            }
          }
      }];
      const  outColumns = [{
        title: '列名',
        dataIndex: 'title',
        key: 'title',
      }];
      const resultColumns=[];
      const rowSelection = {
        onSelect: (record, selected, selectedRows) => {
            this.resultColumns=selectedRows;
          this.setState({formData:selectedRows},function(){
            
          });
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            this.resultColumns=selectedRows;
            this.setState({formData:selectedRows},function(){
            });
        },
      };
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
    this.state.resultList.map((item,index)=>{
        item.key=index;
    });
    this.state.dictionaryList.map((item,index)=>{
        item.key=item.value;
    });
    return (
        <div id="page-wrapper">
                <Card title="查询向导"  style={{float:"left",width:"30%"}}>
                        <Row><Col>
                          <Button type='primary' onClick={()=>this.execSelect()}>执行查询</Button>
                        </Col></Row> 
                        <Row style={{marginTop:'10px'}}><Col>
                                报表类别：
                                <Select  style={{ width: '70%' }} placeholder="请选择"  name='category' 
                                    onChange={(value) =>this.onSelectChange('category',value)}
                                >
                                    {this.state.categoryList}
                                </Select>
                         </Col></Row>
                        <Row><Col>
                            报表名称：
                                <Select  style={{ width: '70%',marginTop:'20px' }} placeholder="请选择"  name='reportName' 
                                    onChange={(value) =>this.onSelectChange('reportName',value)}
                                >
                                    {this.state.reportNameList}
                                </Select>
                        </Col></Row>

                    <Row><Col>
                    <Table title={() => '查询条件'}  ref="table" dataSource={this.state.inlist} columns={inColumns}  pagination={false} 
                    style={{marginLeft: '-30px', marginRight: '-30px', border: '0'}} size="small"/>
                    </Col></Row>

                  <Row><Col>
                     <Table title={() => '输出字段'} rowSelection={rowSelection} dataSource={this.state.outlist} columns={outColumns}  pagination={false} 
                    style={{marginTop:'10px', marginLeft: '-30px', marginRight: '-30px', border: '0'}} size="small"/>
                    </Col></Row>
                </Card>
            
                <Card title={this.state.baoTitle} style={{float:"left",width:"70%"}}>
                    <Button type="primary" onClick={this.downloadExcel} style={{marginRight:'10px'}}>导出</Button>
                    <ReactHTMLTableToExcel
                      className="downloadButton"
                      table="table-to-xls"
                      filename={this.state.reportName}
                      sheet={this.state.reportName}
                      buttonText="导出2"
                        style={{marginRight:'10px'}}/>
      
                    <Search
                            style={{ width: 300,marginBottom:'10px' ,marginRight:'10px'}}
                            placeholder="请输入..."
                            enterButton="查询"
                            onSearch={value => this.onResultSearch(value)}
                         />
                         <Button type="primary" onClick={()=>this.printResultList()}>打印</Button>
                    <Table ref="resultTable" columns={this.resultColumns}  dataSource={this.state.resultList} scroll={{ x: 1300 }} size="small" bordered  pagination={false}/>
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

export default ExecQuery = Form.create()(ExecQuery);
