
import React                from 'react';
import { Link }             from 'react-router-dom';
import Questions                 from '../../service/QuestionsService.jsx';
import Pagination           from 'antd/lib/pagination';
import {Table,Divider,Button,Card, Tooltip,Input, Form,Row,Col}  from 'antd';
import  LocalStorge         from '../../util/LogcalStorge.jsx';
const FormItem = Form.Item;
const localStorge = new LocalStorge();
const _ques = new Questions();
const Search = Input.Search;
import './questions.scss';
class QuestionsList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list            : [],
            pageNum         : 1,
            perPage         : 10,
            listType        :'list',
            ai_question:''
        };
    }
    componentDidMount(){
        this.loadQestionList();
    }
    loadQestionList(){
        let listParam = {};
        listParam.pageNum  = this.state.pageNum;
        listParam.perPage  = this.state.perPage;
        // 如果是搜索的话，需要传入搜索类型和搜索关键字
        if(this.state.listType === 'search'){
            listParam.ai_question    = this.state.ai_question;
        }
        _ques.getQuestionList(listParam).then(response => {
            this.setState(response);
        }, errMsg => {
            this.setState({
                list : []
            });
            // _mm.errorTips(errMsg);
        });
    }
    // 页数发生变化的时候
    onPageNumChange(pageNum){
        this.setState({
            pageNum : pageNum
        }, () => {
            this.loadQestionList();
        });
    }
    // 数据变化的时候
    onValueChange(e){
        let name    = e.target.name,
            value   = e.target.value.trim();
        this.setState({
            [name] : value
        });
    }
     // 搜索
     onSearch(ai_question){
        let listType = ai_question === '' ? 'list' : 'search';
        this.setState({
            listType:listType,
            pageNum         : 1,
            ai_question   : ai_question
        }, () => {
            this.loadQestionList();
        });
    }
    deleteQuestion(id){
        if(confirm('删除问题时，对应的回答也全部删除。确认删除吗？')){
            _ques.deleteQuestion(id).then(response => {
                alert("删除成功");
                this.loadQestionList();
            }, errMsg => {
                alert("删除失败");
                // _mm.errorTips(errMsg);
            });
        }
    }

    render(){
        this.state.list.map((item,index)=>{
            item.key=index;
        })
        const userinfos=localStorge.getStorage('userInfo');
        const dataSource = this.state.list;
        let self = this;
          const columns = [{
            title: 'ID',
            dataIndex: 'ai_question_id',
            key: 'ai_question_id',
            className:'headerRow',
          },{
            title: '问题',
            dataIndex: 'ai_question',
            key: 'ai_question',
            className:'headerRow',
          },{
            title: '操作',
            dataIndex: '操作',
            className:'headerRow',
            render: (text, record) => (
                <span>
                  <Link to={ `/chat/Questions/${record.ai_question_id}` }>编辑</Link>
                  <Divider type="vertical" />
                   <a onClick={()=>this.deleteQuestion(`${record.ai_question_id}`)} href="javascript:;">删除</a>
                  <Divider type="vertical" />
                  <Link to={ `/chat/AnswerList/${record.ai_question_id}` }>设置回答</Link>
                  </span>
              ),
          }];
       
        return (
            <div id="page-wrapper">
            <Card title="问题列表">
                <Row>
                    <Col xs={24} sm={12}>
                    <Search
                        style={{ maxWidth: 300,marginBottom:'10px' }}
                        placeholder="请输入..."
                        enterButton="查询"
                        onSearch={value => this.onSearch(value)}
                        />
                     </Col>
                     <Col xs={24} sm={12}>
                     <Button href="#/chat/Questions/null" style={{ float: "right", marginRight: "30px" }} type="primary">新建问题</Button>

                     </Col> 
                     </Row>    
                <Table dataSource={dataSource} columns={columns}  pagination={false}/>
                 <Pagination current={this.state.pageNum} 
                    total={this.state.totald} 
                    onChange={(pageNum) => this.onPageNumChange(pageNum)}/> 
            </Card>
                
            </div>
        )
    }
}

export default QuestionsList;