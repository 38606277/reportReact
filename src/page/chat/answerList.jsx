
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
class AnswerList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list            : [],
            pageNum         : 1,
            perPage         : 10,
            listType        :'list',
            answer:'',
            question_id:this.props.match.params.qId
        };
    }
    componentDidMount(){
        this.loadAnswerList();
    }
    loadAnswerList(){
        let listParam = {};
        listParam.question_id  = this.state.question_id;
        listParam.pageNum  = this.state.pageNum;
        listParam.perPage  = this.state.perPage;
        // 如果是搜索的话，需要传入搜索类型和搜索关键字
        if(this.state.listType === 'search'){
            listParam.answer    = this.state.answer;
        }
        _ques.getAnswerList(this.state.question_id,listParam).then(response => {
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
            this.loadAnswerList();
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
     onSearch(answer){
        let listType = answer === '' ? 'list' : 'search';
        this.setState({
            listType:listType,
            pageNum         : 1,
            answer   : answer
        }, () => {
            this.loadAnswerList();
        });
    }
    deleteAnswer(id){
        if(confirm('确认删除吗？')){
            _ques.deleteAnswer(id).then(response => {
                alert("删除成功");
                this.loadAnswerList();
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
        const dataSource = this.state.list;
          const columns = [{
            title: 'ID',
            dataIndex: 'answer_id',
            key: 'answer_id',
            className:'headerRow',
          },{
            title: '回答',
            dataIndex: 'answer',
            key: 'answer',
            className:'headerRow',
          },,{
            title: '是否默认',
            dataIndex: 'current',
            key: 'current',
            className:'headerRow',
          },{
            title: '操作',
            dataIndex: '操作',
            className:'headerRow',
            render: (text, record) => (
                <span>
                  <Link to={ `/chat/answer/${record.answer_id}/${record.question_id}` }>编辑</Link>
                  <Divider type="vertical" />
                   <a onClick={()=>this.deleteAnswer(`${record.answer_id}`)} href="javascript:;">删除</a>
                  </span>
              ),
          }];
       
        return (
            <div id="page-wrapper">
            <Card title="回答列表"
                extra={ <Button href={"#/chat/QuestionsList"}  type="primary" >返回问题列表</Button>}
            >
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
                     <Button href={"#/chat/answer/null/"+this.state.question_id} style={{ float: "right", marginRight: "30px" }} type="primary">新建问题</Button>

                     </Col> 
                     </Row>    
                <Table dataSource={dataSource} columns={columns}  pagination={false}/>
                 <Pagination current={this.state.pageNum} 
                    total={this.state.total} 
                    onChange={(pageNum) => this.onPageNumChange(pageNum)}/> 
            </Card>
                
            </div>
        )
    }
}

export default AnswerList;