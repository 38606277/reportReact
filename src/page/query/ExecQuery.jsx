import React from 'react'
import { Table, Divider,DatePicker,Modal, Icon, Form, Input, Select, Button, Card, Checkbox,Tooltip,Row,Col,Pagination  } from 'antd';
import queryService from '../../service/QueryService.jsx';
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
          paramValue:'',
          paramName:'',
          selectedRowKeys:[]
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
        let param=[{in:this.state.data},{startIndex:0,perPage:10}];
        _query.execSelect(this.state.category,this.state.reportName,param).then(response=>{
            this.setState({resultList:response.data.list});
        });
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
      onSelectChangeDic = (selectedRowKeys) => {
        this.okdata=selectedRowKeys;
        this.setState({ selectedRowKeys });
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
            
                <Card title="数据列表" style={{float:"left",width:"70%"}}>
                    <Table columns={this.resultColumns} dataSource={this.state.resultList} size="small" bordered  pagination={false}/>
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
                            onSearch={value => this.onSearch(value)}
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
