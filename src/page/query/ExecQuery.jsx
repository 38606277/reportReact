import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Table, Divider,DatePicker,Modal, Icon, Form, Input, TimePicker, Tag,Select,message, Button, Card, Checkbox,Layout,Tooltip,Row,Col,Pagination,Spin   } from 'antd';
import queryService from '../../service/QueryService.jsx';
import ExportJsonExcel from "js-export-excel"; 
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import TagSelect from '../../components/TagSelect';
import classNames from 'classnames';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
const Option = Select.Option;
const Search = Input.Search;
const FormItem = Form.Item;
const _query =new queryService();
const CheckableTag = Tag.CheckableTag;

class ExecQuery extends React.Component {

    constructor(props) {
        super(props);
        const okdata=[];
        this.state = { 
          paramv:this.props.match.params.paramv,
          paramv2:this.props.match.params.paramv2,
          paramv3:this.props.match.params.paramv3,
          paramv4:this.props.match.params.paramv4,
          data:[],formData:{},reportName:'',
          inList:[], outlist:[],resultList:[],visible: false,
          pageNumd :1,perPaged : 10, searchDictionary :'',totald:0,
          startIndex:1,perPage :10, searchResult     :'',totalR:0,
          paramValue:'',paramName:'',selectedRowKeys:[],dictionaryList:[],
          baoTitle:"数据列表",loading: false, dictData:{},tagData:{},expand:false
        };
      }
      //组件更新时被调用 
        componentWillReceiveProps(nextProps){
            let key = nextProps.match.params.paramv;
            let key2 = nextProps.match.params.paramv2;
            let oldparamv1=this.state.paramv;
            let oldparamv2=this.state.paramv2;
            //如果qryId发生变化则这个页面全部重新加载
            if(oldparamv1!=key || key2!=oldparamv2){
                this.setState({
                    paramv:key,
                    paramv2:key2,
                    paramv3:nextProps.match.params.paramv3,
                    paramv4:nextProps.match.params.paramv4,
                    totalR:0, data:[],formData:{},reportName:'',
                    inList:[], outlist:[], resultList:[],
                    visible: false, dictionaryList:[],
                    pageNumd: 1,perPaged: 10, searchDictionary :'',
                    startIndex:1,perPage:10, searchResult     :'',
                    paramValue:'',paramName:'',selectedRowKeys:[],totald:0,
                    baoTitle:"数据列表",loading: false,dictData:{},tagData:{}
                },function(){
                    this.loadQueryCriteria(this.state.paramv,this.state.paramv4);
                });
            }
        }
    componentDidMount() {
      //  console.log("参数4",this.state.paramv4);
        //获取报表列表
        this.loadQueryCriteria(this.state.paramv,this.state.paramv4);
    }
   
    //获取查询条件及输出字段
    loadQueryCriteria(selectClassId,paramStrValue){
        const inlist=[],outlist=[];
        let paramInIdValue=[];
        this.setState({loading:true});
        if(undefined!=paramStrValue && null!=paramStrValue && 'null'!=paramStrValue){
            paramInIdValue=paramStrValue.split("&");
        }
        _query.getQueryCriteria(selectClassId).then(response=>{
           let inColumns=response.data.in;
           let outColumns=response.data.out;
           //清空选中的值，并重新设置in条件字段
           this.setState({data:[],loading:false},function(){
                for(var l=0;l<inColumns.length;l++){
                    let idkey=inColumns[l].in_id;
                    let nv={[idkey]:''};
                    if("Select"==inColumns[l].render){
                        this.getDiclist(inColumns[l].in_id,inColumns[l].dict_id,"Select");
                        this.state.data.push(nv);
                    }else if("TagSelect"==inColumns[l].render){
                        this.getDiclist(inColumns[l].in_id,inColumns[l].dict_id,"TagSelect");
                        
                    }else if("Checkbox"==inColumns[l].render){
                        this.getDiclist(inColumns[l].in_id,inColumns[l].dict_id,"Checkbox");
                        nv={[idkey]:0};
                        this.state.data.push(nv);
                    }else{
                        this.state.data.push(nv);
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
                        arr.push(inColumns[j]);
                    }
                }
                inlist.push(arr);  
             }
             //输出列进行重新组装显示
            outColumns.map((item,index)=>{
                if(null!=item.link&&item.link!=''){
                    let json={key:item.out_id.toUpperCase(),title:item.out_name,dataIndex:item.out_id.toUpperCase(),
                        link:item.link,qry_id:item.qry_id,width:item.width,
                        render: (text, record, index)=> {
                            return (<a onClick={()=>this.linkToOnClick(record,item.qry_id,item.out_id)} >{text}</a>)
                        } 
                    };
                   outlist.push(json);
               }else{
                    let json={key:item.out_id.toUpperCase(),title:item.out_name,dataIndex:item.out_id.toUpperCase(),
                        link:item.link,qry_id:item.qry_id,width:item.width
                    };
                   
                    outlist.push(json);
                }
            });
            
            this.setState({outlist:outlist,inList:inlist},function(){
                //参数4不为空的情况下进行值设置
                if(null!=paramInIdValue && paramInIdValue.length>0){
                    for(var j=0;j<paramInIdValue.length;j++){
                        let indexkey=paramInIdValue[j].indexOf("=");
                        let inkey=paramInIdValue[j].substring(0,indexkey);
                        let invalue=paramInIdValue[j].substring(indexkey+1,paramInIdValue[j].length);
                        let nv={[inkey]:invalue};
                        this.state.data.push(nv);
                        if(null!=invalue && ''!=invalue){
                            this.props.form.setFieldsValue({[inkey]:invalue});

                            // console.log(document.getElementById("'"+inkey+"'"));
                            // document.getElementById("'"+inkey+"'").value="'"+invalue+"'";
                        }
                    }
                }
                if(undefined!=paramStrValue && null!=paramStrValue && 'null'!=paramStrValue){
                  this.execSelect('1');
                }
            });
        }).catch(error=>{
            this.setState({loading:false});
           message.error(error);
        });
    }
    linkToOnClick(objValue,qryId,outId){
        this.setState({loading:true});
        _query.selectLinkValue(qryId,outId).then(response=>{
            this.setState({loading:false});
            let linkQryId=null,linkClassId=null,theme=null,paramStr='';
            if(response.resultCode=='1000'){
                response.data.map((item,index)=>{
                    linkQryId   = item.link_qry_id;
                    linkClassId = item.class_id;
                    theme       = item.qry_name;
                    let vl=null;
                    if(item.link_in_id_value_type=="out"){
                        let inId=item.link_in_id.toUpperCase();
                        vl=objValue[inId];
                    }else{
                        vl=item.link_in_id_value;
                    }
                    paramStr=paramStr+"&"+item.link_in_id+'='+vl;
                })
                paramStr=paramStr.substring(1,paramStr.length);
                let to='#/query/ExecQuery/'+linkQryId+'/'+linkClassId+'/'+theme+'/'+paramStr;
                window.location.href=to;
                
                // this.setState({
                //     paramv:linkQryId,
                //     paramv2:linkClassId,
                //     paramv3:theme,
                //     paramv4:paramStr,
                //     totalR:0, data:[],formData:{},reportName:'',
                //     inList:[], outlist:[], resultList:[],
                //     visible: false, dictionaryList:[],
                //     pageNumd: 1,perPaged: 10, searchDictionary :'',
                //     startIndex:1,perPage:10, searchResult     :'',
                //     paramValue:'',paramName:'',selectedRowKeys:[],totald:0,
                //     baoTitle:theme,loading: false,dictData:{},tagData:{}
                // },function(){
                //     this.loadQueryCriteria(linkQryId,paramStr);
                // });
               // console.log(to);
            }else{
                message.error("查询失败");
            }
        }).catch(error=>{
            this.setState({loading:false});
            message.error(error);
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
    execSelect(startIn){
        this.props.form.validateFieldsAndScroll((error, fieldsValue) => {
            let arrd=this.state.data;
           // console.log(fieldsValue);
            for(var kname in fieldsValue){//遍历json对象的每个key/value对,p为key
                if(fieldsValue[kname] instanceof moment){
                  
                  fieldsValue[kname]=moment(fieldsValue[kname]).format("YYYY-MM-DD");
                } 
                //console.log(typeof fieldsValue[kname]);
                // if(fieldsValue[kname] instanceof boolean){
                //     if(fieldsValue[kname]){
                //         fieldsValue[kname]=1;
                //     }else{
                //         fieldsValue[kname]=0;
                //     }
                // } 
                //console.log(fieldsValue[kname] instanceof boolean)
                arrd.forEach(function(item,index){
                    for (var key in item) {
                        if(kname==key){
                            arrd.splice(index,1);     
                        }
                    }
                });
                let value=fieldsValue[kname]==undefined?'':fieldsValue[kname];
                let nv={[kname]:value};
                this.state.data.push(nv);
             }
            console.log(this.state.data);
            console.log(fieldsValue);
        })
       this.setState({baoTitle:this.state.paramv3,loading: true},function(){});
        if(null!=this.state.data){
           if(startIn=='1'){
            startIn=1;
           }else{
            startIn=this.state.startIndex;
           }
            let param=[{in:this.state.data},{startIndex:startIn,perPage:10,searchResult:this.state.searchResult}];
            _query.execSelect(this.state.paramv,this.state.paramv2,param).then(response=>{
                if(response.resultCode!='3000'){
                    this.setState({loading:false,resultList:response.data.list,totalR:response.data.totalSize});
                }else{
                    this.setState({loading:false});
                    message.error(response.message);
                }
            }).catch(error=>{
                this.setState({loading:false});
               message.error(error);
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
    onPageNumChange(pageNumR){
        this.setState({
            startIndex : pageNumR
        }, () => {
            this.execSelect('2');
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
                 visible: false,pageNumd:1
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
            this.execSelect('1');
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
     //根据条件列的dict_id进行查询数据字典
     getDiclist(in_id,dictId,type){
        let page = {};
        page.pageNumd  = 1;
        page.perPaged  = 15;
        page.searchDictionary='';
        _query.getDictionaryList(dictId,page).then(response=>{
            let optionlist1=[];
            let rlist=response.data;
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
        });
     }
     //下拉选中事件
     inSelectChange(clumnName,value){
        let nv={[clumnName]:value};
        let arrd=this.state.data;
        arrd.forEach(function(item,index){
            for (var key in item) {
                if(clumnName==key){
                    arrd.splice(index,1);     
                }
            }
        });
        this.state.data.push(nv);
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
            let nv={[clumnName]:nextSelectedTags};
            let arrd=this.state.data;
            arrd.forEach(function(item,index){
                for (var key in item) {
                    if(clumnName==key){
                        arrd.splice(index,1);     
                    }
                }
            });
            this.state.data.push(nv);
        });
     }
     //选中日期设置值
     onChangeDate(clumnName,date,dateString){
            let nv={[clumnName]:dateString};
            let arrd=this.state.data;
            arrd.forEach(function(item,index){
                for (var key in item) {
                    if(clumnName==key){
                        arrd.splice(index,1);     
                    }
                }
            });
            this.state.data.push(nv);
            this.props.form.setFieldsValue({[clumnName]:dateString});
     }
     //选中checkbox设置值
     onChangeCheckbox(clumnName,value){
         let v=0;
        if(value.target.checked){
            v=1;
        }
        let nv={[clumnName]:v};
        let arrd=this.state.data;
        arrd.forEach(function(item,index){
            for (var key in item) {
                if(clumnName==key){
                    arrd.splice(index,1);     
                }
            }
        });
        this.state.data.push(nv);
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
            if(null!=this.state.resultList){
                this.state.resultList.map((item,index)=>{
                    item.key=index;
                });
            }
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
 
    const inColumn=this.state.inList.map((item, index)=>{
        const rc= item.map((record, index)=> {
            // let defaultValues=null;
            // const inValueList=this.state.data;
            // console.log(inValueList);
            // let clid=record.in_id;
            // for(var h=0;inValueList.length>0;h++){
            //     const jsons= inValueList[h];
            //     for (var key in jsons){
            //         if(key==clid){
            //             defaultValues=jsons[key];
            //         }
            //         console.log(key); 	//Type, Height
            //         console.log(defaultValues);	//Coding, 100
            //     }
            //     // defaultValues=inValueList[h][clid];
            //     // console.log(defaultValues);
            // }
                if(record.render=='Input'){
                    return (
                        <Col span={12} key={record.qry_id+index}>
                        <FormItem style={{ margin: 0 }} {...formItemLayout}  label={record.in_name} >
                            {getFieldDecorator(record.in_id, {
                                rules: [{
                                required: false,
                                message: `参数名是必须的！`,
                                }]
                            })(
                                <Input onChange={e=>this.changeEvent(e)}  />
                            )}
                            </FormItem>
                    </Col>
                    );
                }else if(record.render=='InputButton'){
                    return (
                        <Col span={12} key={record.qry_id+index}>
                        <FormItem style={{ margin: 0 }} {...formItemLayout}  label={record.in_name} >
                            {getFieldDecorator(record.in_id, {
                                rules: [{
                                required: false,
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
                }else if(record.render=='Select'){
                    return (
                        <Col span={12} key={record.qry_id+index}>
                        <FormItem {...formItemLayout} label={record.in_name}>
                        {getFieldDecorator(record.in_id, {
                            rules: [{ required: false, message: '请输入参数!', whitespace: true }],
                            })(
                            <Select allowClear={true} style={{ width: '180px' }}
                                        placeholder="请选择"
                                        name={record.in_id}
                                        onChange={(value) =>this.inSelectChange(record.in_id,value)}
                                    >
                                        {this.state.dictData[record.in_id+record.dict_id]}
                                </Select>
                        )}
                        </FormItem>
                        </Col> 
                    );
                }else if(record.render=='TagSelect'){
                    // const { className,expandable } = this.props;
                    // const { expand } = this.state;
                    // const cls = classNames('tagSelect', className, {
                    //     ['hasExpandTag']: true,
                    //     ['expanded']: expand,
                    //   });
                    return (
                        <Col span={12} key={record.qry_id+index}>
                        {/* <div className={cls}>
                            <h6 style={{ marginLeft:5, display: 'inline' ,fontSize:14}}>{record.in_name}:</h6>
                            {this.state.dictData[record.dict_id]==undefined?'':
                                    this.state.dictData[record.dict_id].map(tag => (
                                            <CheckableTag
                                                    key={tag}
                                                    checked={this.state.tagData[record.in_id]==undefined ?'':this.state.tagData[record.in_id].indexOf(tag) > -1}
                                                    onChange={(checked) =>this.onTagChange(record.in_id,tag,checked)}
                                            >
                                                    {tag}
                                            </CheckableTag>
                                    ))
                            }
                            {(
                                <a className='trigger' onClick={this.handleExpand}>
                                    {expand ? '收起' : '展开'} <Icon type={expand ? 'up' : 'down'} />
                                </a>
                            )}
                        </div> */}

                        <FormItem {...formItemLayout} label={record.in_name}>
                            {getFieldDecorator(record.in_id)( 
                                <TagSelect expandable >
                                    {this.state.dictData[record.dict_id]==undefined?'':this.state.dictData[record.dict_id]}
                                </TagSelect> 
                            )}
                        </FormItem>
                        </Col> 
                    );
                                
                }else if(record.render=='Checkbox'){
                    return (
                        <Col span={12} key={record.qry_id+index}>
                        <FormItem style={{ margin: 0 }} {...formItemLayout}  label={record.in_name}>
                        {/* {getFieldDecorator(record.in_id,{
                            initialValue: '0' ,
                            rules: [{
                            required: false,
                            message: `参数名是必须的！`,
                            }]
                        })( */}
                            <Checkbox  onChange={(value)=>this.onChangeCheckbox(record.in_id,value)}>是</Checkbox>
                        {/* )} */}
                        </FormItem>
                    </Col>
                    );
                }else if(record.render=='Datepicker'){
                    // const endTime = moment().format('YYYY-MM-DD');
                    return (
                        <Col span={12} key={record.qry_id+index}>
                        <FormItem style={{ margin: 0 }} {...formItemLayout}  label={record.in_name}>
                        {getFieldDecorator(record.in_id, {
                        
                            rules: [{
                            required: false,
                            message: `参数名是必须的！`,
                            }]
                        })(
                            <DatePicker format={'YYYY-MM-DD'} name={record.in_id} onChange={(date,dateString) => this.onChangeDate(record.in_id,date,dateString)} locale={locale}/>
                         )}  
                        </FormItem>
                    </Col>
                    );
                }else{
                    return (
                        <Col span={12} key={record.qry_id+index}>
                        <FormItem style={{ margin: 0 }} {...formItemLayout}  label={record.in_name} >
                            {getFieldDecorator(record.in_id, {
                                rules: [{
                                required: false,
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
                }
            });
            return <Row key={index}>{rc}</Row>;
        });
    return (
        <div id="page-wrapper">
                <Spin spinning={this.state.loading} delay={500}>

        {/* <Search style={{ width: 300,marginBottom:'10px' ,marginRight:'10px'}}
                placeholder="请输入..."
                enterButton="查询"
                onSearch={value => this.onResultSearch(value)}
                /> */}
        <Card bordered={false} title={this.state.paramv3} extra={ <div>
                        <a onClick={()=>this.execSelect('1')}>查询 </a>
                        <Divider type="vertical" />
                        <a onClick={this.downloadExcel}>保存到excel</a>
                        <Divider type="vertical" />
                        <a onClick={()=>this.printResultList()}>打印</a>
                    </div>}>
                    {inColumn}
        </Card>      
            <Card >
                {/* 
                <ReactHTMLTableToExcel className="downloadButton" table="table-to-xls" filename={this.state.reportName}
                      sheet={this.state.reportName}  buttonText="导出2"  style={{marginRight:'10px'}}/> */}
                
                <Table ref="resultTable" columns={this.state.outlist} dataSource={this.state.resultList} scroll={{ x: '100%' }} size="small" bordered  pagination={false}/>
                <Pagination current={this.state.startIndex} 
                        total={this.state.totalR} 
                        showTotal={total => `共 ${this.state.totalR} 条`}
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
                        total={this.state.totald}  showTotal={total => `共 ${this.state.totald} 条`}
                        onChange={(pageNumd) => this.onPageNumdChange(pageNumd)}/> 
                </Modal>
            </div>
            </Spin>
         </div>
    )}
}

export default Form.create()(ExecQuery);
