import React from 'react';
//import {Card ,Table,Modal, Icon, Form, Input, TimePicker, Tag,Select,message, Button,Checkbox,Layout,Tooltip,Row,Col,Pagination,Spin} from 'antd';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import Plot from 'react-plotly.js';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
//const Plot = createPlotlyComponent(window.Plotly);
const PlotlyRenderers = createPlotlyRenderers(Plot);
//const data = [];
import ReactDOM from 'react-dom';
import CubeService from '../../service/CubeService.jsx';
const _cubeService =new CubeService();
import { EllipsisOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import {
    Table,
    Divider,
    DatePicker,
    Modal,
    Input,
    TimePicker,
    Tag,
    Select,
    message,
    Button,
    Card,
    Checkbox,
    Layout,
    Tooltip,
    Row,
    Col,
    Pagination,
    Spin,
} from 'antd';
import queryService from '../../service/QueryService.jsx';
import TagSelect from '../../components/TagSelect';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import StandardFormRow from '../../components/StandardFormRow';

const Option = Select.Option;
const Search = Input.Search;
const FormItem = Form.Item;
const _query =new queryService();
//const dataTwo = [['attribute', 'attribute2'], ['value1', 'value2']];
class DataAnalysis extends React.Component {
    constructor(props) {
        super(props);
        const okdata=[];
        this.state = {
              qry_id: this.props.match.params.qry_id,
              class_id:this.props.match.params.class_id,
              cube_name:this.props.match.params.cube_name,
              inList:[], outlist:[],resultList:[],visible: false,
              pageNumd :1,perPaged : 10, searchDictionary :'',totald:0,
              paramValue:'',paramName:'',selectedRowKeys:[],dictionaryList:[],
              baoTitle:"数据列表",loading: false, dictData:{},tagData:{},expand:false,testData:{},
              data:[],colunmlist:[],attt:null
            };
    }
    //组件更新时被调用 
    componentWillReceiveProps(nextProps){
        let key = nextProps.match.params.qry_id;
        let key2 = nextProps.match.params.class_id;
        let oldparamv1=this.state.qry_id;
        let oldparamv2=this.state.class_id;
        //如果qryId发生变化则这个页面全部重新加载
        if(oldparamv1!=key || key2!=oldparamv2){
            this.setState({
                qry_id:key,
                class_id:key2,
                cube_name:nextProps.match.params.cube_name,
                inList:[], outlist:[],resultList:[],visible: false,
                pageNumd :1,perPaged : 10, searchDictionary :'',totald:0,data:[],
                paramValue:'',paramName:'',selectedRowKeys:[],dictionaryList:[],colunmlist:[],
                baoTitle:"数据列表",loading: false, dictData:{},tagData:{},expand:false,testData:{},attt:null
            },function(){
                this.loadDataAnalysis(this.state.qry_id);
            });
        }
    }
    componentDidMount() {
       this.loadDataAnalysis(this.state.qry_id);
    }
    loadDataAnalysis(qry_id){
        const inlist=[],outlist=[];
        _cubeService.getDataAndalysisByqryId(qry_id).then(response=>{
            let inColumns=response.data.in;
            let outColumns=response.data.out;
            //清空选中的值，并重新设置in条件字段
            this.setState({loading:false},function(){
                    for(var l=0;l<inColumns.length;l++){
                        let idkey=inColumns[l].in_id;
                        if("Select"==inColumns[l].render){
                            this.getDiclist(inColumns[l].in_id,inColumns[l].dict_id,"Select");
                        this.state.testData[idkey]='';
                        }else if("TagSelect"==inColumns[l].render){
                            this.getDiclist(inColumns[l].in_id,inColumns[l].dict_id,"TagSelect");
                            this.state.testData[idkey]='';
                        }else if("Checkbox"==inColumns[l].render){
                            this.getDiclist(inColumns[l].in_id,inColumns[l].dict_id,"Checkbox");
                            this.state.testData[idkey]='0';
                        }else{
                            this.state.testData[idkey]='';
                        }
                    }
                })
            //条件列两两一组进行组合，作为一行显示
                var k=Math.ceil(inColumns.length/2);
                var j= 0;
                for(var i=1;i<=k;i++){
                    var arr= new Array();
                    for(j ; j < i*2; j++){
                        if(undefined!=inColumns[j]){
                            if("TagSelect"==inColumns[j].render){
                                k=k+1;
                                if(arr.length>0){
                                    break;
                                }else{
                                    arr.push(inColumns[j]);
                                    j=j+1;
                                    break;
                                }
                            }else{
                                arr.push(inColumns[j]);
                            }
                        }
                    }
                    if(arr.length>0){
                        inlist.push(arr);
                    }
                }
                //输出列进行重新组装显示
                outColumns.map((item,index)=>{
                    outlist.push(item.out_name);
                    this.state.colunmlist.push(item.out_id);
                });

                this.state.resultList.push(outlist);
                this.setState({inList:inlist},function(){});
        });
    }
    //设置参数条件值
    changeEvent(e) {
        let id = e.target.id;
       this.state.testData[id]=e.target.value;
     }
    //执行查询 
   execSelect(){
       this.props.form.validateFieldsAndScroll((error, fieldsValue) => {
           for(var kname in fieldsValue){//遍历json对象的每个key/value对,p为key
               //处理日期类型
               if(fieldsValue[kname] instanceof moment){
                 fieldsValue[kname]=moment(fieldsValue[kname]).format("YYYY-MM-DD");
               } 
               //处理checkbox值为1、0
               if(typeof fieldsValue[kname]== 'boolean'){
                   if(fieldsValue[kname]){
                       fieldsValue[kname]=1;
                   }else{
                       fieldsValue[kname]=0;
                   }
               }
               //将[]转换为join(",") 逗号隔开字符串
               if(fieldsValue[kname] instanceof Array){
                   fieldsValue[kname]=fieldsValue[kname].join(',');
               }
               let value=fieldsValue[kname]==undefined?'':fieldsValue[kname];
               this.state.testData[kname]=value;
            }
       })
            this.setState({loading: true},function(){});
           let param=[{in:this.state.testData},{}];
           _query.execSelect(this.state.qry_id,this.state.class_id,param).then(response=>{
               if(response.resultCode!='3000'){
                   let resList=response.data.list;
                   let d2=[];
                   d2.push(this.state.resultList[0]);
                   if(null==resList || resList.length==0){
                        this.setState({loading:false,data:d2},function(){}); 
                   }else{
                       let colunmlists=this.state.colunmlist;
                       if(null!=colunmlists && colunmlists.length>0){
                            resList.map((item,index)=>{
                                let dataArr=[];
                                for(var c=0;c<colunmlists.length;c++){
                                    for(var key in item){
                                        if(key==colunmlists[c].toUpperCase()){
                                            dataArr.push(item[key]); //json对象的值
                                        }
                                    }
                                }  
                                if(null!=dataArr){
                                    d2.push(dataArr);
                                }
                            });
                        }
                        this.setState({loading:false,data:d2},function(){});                   
                    }
               }else{
                   this.setState({loading:false});
                   message.error(response.message);
               }
           }).catch(error=>{
               this.setState({loading:false});
              message.error(error);
           });
      
   }
   //打开模式窗口
   openModelClick(name,param){
        this.okdata=[];
        this.setState({ visible: true,
           dictionaryList:[],paramValue:param,paramName:name,
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
       this.setState({loading:true});
       _query.getDictionaryList(param,page).then(response=>{
         this.setState({loading: false,dictionaryList:response.data,totald:response.totald},function(){});
       }).catch(error=>{
           this.setState({loading:false});
          message.error(error);
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
           this.state.testData[name]=values;
           this.props.form.setFieldsValue({[name]:values});
           this.setState({visible: false,pageNumd:1});
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
     
    //数据字典的search
    onDictionarySearch(searchKeyword){
       this.setState({pageNumd:1,searchDictionary:searchKeyword}, () => {
           this.loadModelData(this.state.paramValue);
       });
    }
    
    //根据条件列的dict_id进行查询数据字典
    getDiclist(in_id,dictId,type){
       let page = {};
       page.pageNumd  = 1;
       page.perPaged  = 15;
       page.searchDictionary='';
       _query.getDictionaryList(dictId,page).then(response=>{
           let optionlist1=[];
           let rlist=response.data;
           if(undefined!=rlist){
                for (let i = 0; i < rlist.length; i++) {
                    if(type=="Select"){
                        optionlist1.push(<Option key={rlist[i].value_code}>{rlist[i].value_name}</Option>);
                    }else if(type=="TagSelect"){
                        optionlist1.push(<TagSelect.Option value={rlist[i].value_code} key={rlist[i].value_code}>{rlist[i].value_name}</TagSelect.Option>);
                    }
                }
                var objs= this.state.dictData;
                if(type=="TagSelect"){
                    objs[dictId]=optionlist1;
                }else{
                    objs[in_id+dictId]=optionlist1;
                }
                this.setState({dictData:objs});
            }
       });
    }
    //下拉选中事件
    inSelectChange(clumnName,value){
       this.state.testData[clumnName]=value;
    }
    //tag选中事件
    onTagChange(clumnName,value,checked){
       let clumnNames = this.state.tagData[clumnName];
       if(clumnNames==undefined){
           clumnNames=[];
       }
       const nextSelectedTags = checked? [...clumnNames, value]: clumnNames.filter(t => t !== value);
       let Tagd=this.state.tagData;
       Tagd[clumnName]=nextSelectedTags;
       this.setState({ tagData: Tagd },function(){
           this.state.testData[clumnName]=nextSelectedTags;
       });
    }
    //选中日期设置值
    onChangeDate(clumnName,date,dateString){
           this.state.testData[clumnName]=dateString;
           this.props.form.setFieldsValue({[clumnName]:dateString});
    }
    //选中checkbox设置值
    onChangeCheckbox(clumnName,value){
        let v=0;
       if(value.target.checked){
           v=1;
       }
       this.state.testData[clumnName]=v;
       //this.props.form.setFieldsValue({[clumnName]:v});
    }
    handleExpand = () => {
       const { expand } = this.state;
       this.setState({
         expand: !expand,
       });
     };
    
    render() {
        const { getFieldDecorator } = this.props.form;
        const { selectedRowKeys } = this.state;
        const rowSelectionDictionary = {
            selectedRowKeys,
            onChange:this.onSelectChangeDic,
        };
        const  dictionaryColumns = [{
                title: '编码',
                dataIndex: 'value_code',
                key: 'value_code',
            },{
                title: '名称',
                dataIndex: 'value_name',
                key: 'value_name',
            }];
           
        if(null!=this.state.dictionaryList){
            this.state.dictionaryList.map((item,index)=>{
                item.key=item.value_code;
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
        const formItemLayoutTag = {
            labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
            },
            wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 },
            },
        };
        const inColumn=this.state.inList.map((item, index)=>{
            const rc= item.map((record, index)=> {
                if(record.render=='Input'){
                    return (
                        <Col xs={24} sm={12} key={record.qry_id+index}>
                        <FormItem style={{ margin: 0 }} {...formItemLayout}  label={record.in_name} >
                            {getFieldDecorator(record.in_id, {
                                rules: [{required: false,message: `参数名是必须的！`,}]
                            })(
                                <Input onChange={e=>this.changeEvent(e)}  />
                            )}
                            </FormItem>
                    </Col>
                    );
                }else if(record.render=='InputButton'){
                    return (
                        <Col xs={24} sm={12} key={record.qry_id+index}>
                        <FormItem style={{ margin: 0 }} {...formItemLayout}  label={record.in_name} >
                            {getFieldDecorator(record.in_id, {
                                rules: [{required: false,message: `参数名是必须的！`,}]
                            })(
                                <Input onChange={e=>this.changeEvent(e)} 
                                addonAfter={record.dict_id==null?'':
                                <EllipsisOutlined onClick={e=>this.openModelClick(record.in_id,record.dict_id)} />} />
                            )}
                            </FormItem>
                    </Col>
                    );
                }else if(record.render=='Select'){
                    return (
                        <Col xs={24} sm={12} key={record.qry_id+index}>
                        <FormItem {...formItemLayout} label={record.in_name}>
                        {getFieldDecorator(record.in_id, {
                            // rules: [{ required: false, message: '请输入参数!', whitespace: true }],
                            })(
                            <Select allowClear={true} style={{ width: '280px' }}
                                        placeholder="请选择"name={record.in_id}
                                        onChange={(value) =>this.inSelectChange(record.in_id,value)}
                                        mode={record.dict_multiple==null?'':'multiple'}
                                    >
                                        {this.state.dictData[record.in_id+record.dict_id]}
                                </Select>
                        )}
                        </FormItem>
                        </Col> 
                    );
                }else if(record.render=='TagSelect'){
                    return (
                        <Col span={24} key={record.qry_id+index}>
                            <FormItem {...formItemLayoutTag} label={record.in_name}>
                                {getFieldDecorator(record.in_id)( 
                                    <TagSelect expandable hideCheckAll={true} isOnlyCheck={false}>
                                        {this.state.dictData[record.dict_id]==undefined?'':this.state.dictData[record.dict_id]}
                                    </TagSelect> 
                                )}
                            </FormItem>
                        </Col>
                    );      
                }else if(record.render=='Checkbox'){
                    return (
                        <Col xs={24} sm={12} key={record.qry_id+index}>
                        <FormItem style={{ margin: 0 }} {...formItemLayout}  label={record.in_name}>
                        {getFieldDecorator(record.in_id,{
                            initialValue: '0',rules: [{required: false,message: `参数名是必须的！`, }]
                        })(
                            <Checkbox  onChange={(value)=>this.onChangeCheckbox(record.in_id,value)}>是</Checkbox>
                        )}
                        </FormItem>
                    </Col>
                    );
                }else if(record.render=='Datepicker'){
                    return (
                        <Col xs={24} sm={12} key={record.qry_id+index}>
                        <FormItem style={{ margin: 0 }} {...formItemLayout}  label={record.in_name}>
                        {getFieldDecorator(record.in_id, {
                            rules: [{required: false,message: `参数名是必须的！`,}]
                        })(
                            <DatePicker format={'YYYY-MM-DD'} name={record.in_id} style={{width:'280px'}}
                            onChange={(date,dateString) => this.onChangeDate(record.in_id,date,dateString)} locale={locale}/>
                         )}  
                        </FormItem>
                    </Col>
                    );
                }else{
                    return (
                        <Col xs={24} sm={12} key={record.qry_id+index}>
                        <FormItem style={{ margin: 0 }} {...formItemLayout}  label={record.in_name} >
                            {getFieldDecorator(record.in_id, {
                                rules: [{required: false,message: `参数名是必须的！`,}]
                            })(
                                <Input onChange={e=>this.changeEvent(e)} 
                                addonAfter={record.dict_id==null?'':
                                <EllipsisOutlined onClick={e=>this.openModelClick(record.in_id,record.dict_id)} />} />
                            )}
                            </FormItem>
                    </Col>
                    );
                }
            });
            return <StandardFormRow key={'formrow'+index}><Row key={index}>{rc}</Row></StandardFormRow>;
        });
        return (
            <div>
                <Card bordered={false} title={this.state.cube_name} extra={ <div>
                            <a onClick={()=>this.execSelect()}>查询 </a>
                            
                        </div>}>
                        {inColumn}
            </Card>
             <div id="example">
                <PivotTableUI
                    data={this.state.data}
                    renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
                    {...this.state.attt}
                    onChange={s => this.setState({attt:s})}
                    unusedOrientationCutoff={Infinity}
                />
            </div>
            <div>
                <Modal  title="字典查询" visible={this.state.visible}  onOk={this.handleOk} onCancel={this.handleCancel}>
                    <Search
                        style={{ width: 300,marginBottom:'10px' }}
                        placeholder="请输入..." enterButton="查询"
                        onSearch={value => this.onDictionarySearch(value)}
                        />
                        <Table ref="diction" rowSelection={rowSelectionDictionary} columns={dictionaryColumns} 
                        dataSource={this.state.dictionaryList} size="small" bordered  pagination={false}/>
                        <Pagination current={this.state.pageNumd} 
                        total={this.state.totald}  showTotal={total => `共 ${this.state.totald} 条`}
                        onChange={(pageNumd) => this.onPageNumdChange(pageNumd)}/> 
                </Modal>
            </div>
            </div>
        );
    }
}
export default Form.create()(DataAnalysis);