import React        from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Table, Button, Modal, Card, Row, Col, Pagination, message } from 'antd';
import LocalStorge  from '../../util/LogcalStorge.jsx';
import CubeService from '../../service/CubeService.jsx';
import QueryService from '../../service/QueryService.jsx';
const _cubeService = new CubeService();
const localStorge = new LocalStorge();
const _query = new QueryService();
const FormItem = Form.Item;
const Search = Input.Search;
class CubeInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            confirmDirty: false,
            cube_id:this.props.match.params.cube_id,
            qry_id:'',
            cube_name:'',
            cube_desc:'',
            visible:false,
            dictionaryList:[],
            qry_name:'',
            cube_sql:'',
            class_id:''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
      
    }
    
 //初始化加载调用方法
    componentDidMount(){
       if(null!=this.state.cube_id && ''!=this.state.cube_id  && 'null'!=this.state.cube_id){
        _cubeService.getCubeInfo(this.state.cube_id).then(response => {
                this.setState(response.data);
                this.props.form.setFieldsValue({
                      cube_name:response.data.cube_name,
                      cube_desc:response.data.cube_desc,
                      qry_id:response.data.qry_id,
                      class_name:response.data.class_name,
                      cube_sql:response.data.cube_sql,
                      class_id:response.data.class_id
                });
            }, errMsg => {
                this.setState({
                });
                localStorge.errorTips(errMsg);
            });
        }
        
    }

    
    //编辑字段对应值
    onValueChange(e){
        let name = e.target.name,
            value = e.target.value.trim();
            this.setState({[name]:value});  
           this.props.form.setFieldsValue({[name]:value});
      
    }
    //编辑字段对应值
    onSelectChange(name,value){
         this.setState({[name]:value});  
         this.props.form.setFieldsValue({[name]:value});
    }
   //提交
  handleSubmit (e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if(null!=this.state.cube_id && ''!=this.state.cube_id  && 'null'!=this.state.cube_id){
          values.cube_id=this.state.cube_id;
        }else{
          values.cube_id='null';
        }
        _cubeService.saveCubeInfo(values).then(response => {
            if(null!=this.state.cube_id && ''!=this.state.cube_id  && 'null'!=this.state.cube_id){
                alert("修改成功");
            }else{
                alert("保存成功");
            }
            window.location.href="#cube/cubeList";
          }, errMsg => {
              this.setState({
              });
              localStorge.errorTips(errMsg);
          });
      }
    });
  }

  openModelClick(){
    this.setState({ visible: true,totald:0,selectedRowKeys:[]},function(){
      this.loadModelData();
    });
  }
  //调用模式窗口内的数据查询
  loadModelData(){
    let page = {};
    page.pageNumd  = this.state.pageNumd;
    page.perPaged  = this.state.perPaged;
    page.qry_name=this.state.qry_name;
    _query.getAllQueryNameList(page).then(response=>{
      this.setState({dictionaryList:response.data.list,totald:response.data.total},function(){});
    }).catch(error=>{
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
    let values='';
    let classid='';
    if(this.state.selectedRowKeys.length>0){
        const arr1=this.state.selectedRowKeys[0];
        const dataArr=arr1.split("&");
        values=dataArr[0];
        let qryname=dataArr[1];
        classid=dataArr[2];
        this.props.form.setFieldsValue({['qry_id']:values,['class_name']:qryname,['class_id']:classid});
        // this.props.form.setFieldsValue({['qry_name']:qryname});
    }
    this.setState({visible: false,pageNumd:1,qry_id:values,class_id:classid});
  }
//模式窗口点击取消
  handleCancel = (e) => {
    this.setState({
      visible: false,
      selectedRowKeys:[]
    });
  }
  //数据字典选中事件
  onSelectChangeDic = (selectedRowKeys) => {
      this.setState({ selectedRowKeys });
  }
   //数据字典的search
   onDictionarySearch(qry_name){
    this.setState({pageNumd:1,qry_name:qry_name}, () => {
        this.loadModelData();
    });
 }
  render() {
    const { getFieldDecorator } = this.props.form;
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
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const { selectedRowKeys } = this.state;
    const rowSelectionDictionary = {
        selectedRowKeys,
        onChange:this.onSelectChangeDic,
        hideDefaultSelections:true,
        type:'radio'
    };
    const  dictionaryColumns = [{
            title: '编码',
            dataIndex: 'qry_id',
            key: 'qry_id',
        },{
            title: '名称',
            dataIndex: 'qry_name',
            key: 'qry_name',
        }];
    if(null!=this.state.dictionaryList){
        this.state.dictionaryList.map((item,index)=>{
          
            item.key=item.qry_id+"&"+item.qry_name+"&"+item.class_id;
            console.log(item.key)
        });
    }
    return (
      <div id="page-wrapper">
      <Card title={this.state.cube_id=='null' ?'新建':'编辑'}>
      <Form onSubmit={this.handleSubmit}>
      <Row>
           <Col xs={24} sm={12}>
                <FormItem {...formItemLayout} label="名称">
                  {getFieldDecorator('cube_name', {
                    rules: [{required: true, message: '请输入名称!'}],
                  })(
                    <Input type='text' name='cube_name'  onChange={(e) => this.onValueChange(e)}/>
                  )}
                </FormItem>
            </Col>
            <Col xs={24} sm={12}>
              <FormItem {...formItemLayout} label="描述">
                  {getFieldDecorator('cube_desc', {
                    rules: [{required: true, message: '请输入描述!'}],
                  })(
                    <Input type='text' name='cube_desc'  onChange={(e) => this.onValueChange(e)}/>
                  )}
                </FormItem>
            </Col>
        </Row> 
        <Row>
        <Col xs={24} sm={12}>
              <FormItem {...formItemLayout} label="Qry_ID">
                  {getFieldDecorator('qry_id', {
                    rules: [{required: true, message: '请输入描述!'}],
                  })(
                    <Input readOnly onChange={e=>this.onValueChange(e)} 
                    addonAfter={<EllipsisOutlined onClick={e=>this.openModelClick()} />} />
                  )}
                </FormItem>

                <FormItem style={{display:"none"}}>
                  {getFieldDecorator('class_id')(
                    <Input id="class_id" name="class_id" />
                  )}
                </FormItem>
            </Col>
            <Col xs={24} sm={12}>
              <FormItem {...formItemLayout} label="class_name">
                  {getFieldDecorator('class_name', {
                   // rules: [{required: true, message: '请输入描述!'}],
                  })(
                    <Input readOnly />
                  )}
                </FormItem>
            </Col>
        </Row> 
        <Row>
          <Col xs={24} sm={12}>
              <FormItem {...formItemLayout} label="SQL">
                  {getFieldDecorator('cube_sql', {
                    rules: [{required: true, message: '请输入SQL!'}],
                  })(
                    <Input  onChange={(e) => this.onValueChange(e)}/>
                  )}
                </FormItem>
            </Col>
        </Row> 
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">保存</Button>
          <Button href="#/cube/cubeList"  type="primary" style={{marginLeft:'30px'}}>返回</Button>
        </FormItem>
    </Form>
    </Card>
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
export default Form.create()(CubeInfo);