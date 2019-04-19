import React        from 'react';
import Questionserver                 from '../../service/QuestionsService.jsx';
import { Form, Input, Select,Button, DatePicker,Card,Row, Col } from 'antd';
import HttpService from '../../util/HttpService.jsx';
import LocalStorge  from '../../util/LogcalStorge.jsx';
const localStorge = new LocalStorge();
let recorder;
let audio_context;
import { Recorder } from './index.js';
const FormItem = Form.Item;
const _ques = new Questionserver();
const Option = Select.Option;

function playaudio(url) {
  var audio = document.querySelector('audio');
  audio.autoplay=true;
  audio.src =url;  
}
window.onload =function init() {
  try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
      window.URL = window.URL || window.webkitURL;
      audio_context = new AudioContext;
  } catch (e) {
      alert('No web audio support in this browser!');
  }   
}
class AnswerInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            confirmDirty: false,
            answer_id:this.props.match.params.aId,
            question_id:this.props.match.params.qId,
            current:'',
            answer:'',
            //fileDataBlob:null,
            creat_by:localStorge.getStorage('userInfo').userId
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleConfirmBlur  = this.handleConfirmBlur.bind(this);
      
    }
    
 //初始化加载调用方法
    componentDidMount(){
       if(null!=this.state.answer_id && ''!=this.state.answer_id  && 'null'!=this.state.answer_id){
            _ques.getAnswerId(this.state.answer_id).then(response => {
                this.setState(response.data);
                this.props.form.setFieldsValue({
                    answer_id:response.data.answer_id,
                    question_id:response.data.question_id,
                    current:response.data.current,
                    answer:response.data.answer,
                    creat_by:response.data.creat_by,
                    //fileDataBlob:response.data.fileDataBlob,
                    confirm:''
                });
            }, errMsg => {
                this.setState({
                });
                localStorge.errorTips(errMsg);
            });
            this.getAudioBlob();
        }
        
        let getUserMedia_1 = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia)
        getUserMedia_1.call(navigator,{audio: true}, this.startUserMedia, function(e) {
            console.log('No live audio input: ' + e)
        });
        document.getElementById("stop").disabled=true;
    }
    getAudioBlob(){
      fetch(window.getServerUrl()+'reportServer/questions/getAnswerAduioBlob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'credentials': JSON.stringify(localStorge.getStorage('userInfo') || '')
        },
        body:this.state.answer_id
      }).then(function (response) {
        if (response.ok) {
          response.blob().then((blob) => {
            if(blob.size>0){
              const downUrl = window.URL.createObjectURL(blob);// 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)
              playaudio(downUrl);
            }else{
              console.log("文件已丢失，请重新导出下载！");
            }
          });
        }
      });
    }
    // 初始化录音功能
    startUserMedia = (stream) => {
        audio_context = new AudioContext;
        var input = audio_context.createMediaStreamSource(stream);
        recorder = new Recorder(input);
    }
    // 开始录音
    startRecording = () => {
        recorder && recorder.record();
        document.getElementById("stop").disabled=false;
    }
    // 停止录音
    stopRecording = () => {
        recorder && recorder.stop();

        this.createDownloadLink();
        recorder.clear(); // 清楚录音，如果不清除，可以继续录音
        document.getElementById("stop").disabled=true;
    }
    // 生成文件
    createDownloadLink = () => {
        recorder && recorder.exportWAV((blob) => {
            console.log(1,blob);
            // var newblob=blob.slice(0,1);
            // var reader = new FileReader();
            // reader.readAsBinaryString(newblob);
            // console.log(reader);
            let formData = new FormData();
            formData.append("file", blob);
            // this.setState({
            //     fileDataBlob: formData
            // });
            HttpService.post("reportServer/questions/saveAnswerAudio/"+this.state.answer_id+"/"+this.state.question_id,
              formData).then(response=>{
                if(response.resultCode=="1000"){
                  console.log(response.data);
                  this.setState({
                    answer_id: response.data
                  });
                 // window.location.href="#chat/answer/"+response.data+"/"+this.state.question_id;

                }
              });
            if(!blob){
                console.log('无录音文件');
                return false;
            }else{
                var url = URL.createObjectURL(blob); // 生成的录音文件路径，可直接播放
                playaudio(url);
               
            }
        });
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
          _ques.saveAnswerInfo(this.state).then(response => {
            if(null!=this.state.answer_id && ''!=this.state.answer_id  && 'null'!=this.state.answer_id){
                alert("修改成功");
            }else{
                alert("保存成功");
            }
            window.location.href="#chat/answerList/"+this.state.question_id;
          }, errMsg => {
              this.setState({
              });
              localStorge.errorTips(errMsg);
          });
      }
    });
  }

  handleConfirmBlur(e) {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
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
   
    return (
        <div id="page-wrapper">
        <Card title={this.state._id=='null' ?'新建回答':'编辑回答'}>
        <Form onSubmit={this.handleSubmit}>
        <Row>
             <Col xs={24} sm={12}>
                  <FormItem {...formItemLayout} label="回答">
                    {getFieldDecorator('answer', {
                      rules: [{required: true, message: '请输入回答!'}],
                    })(
                      <Input type='text' name='answer'  onChange={(e) => this.onValueChange(e)}/>
                    )}
                  </FormItem>
              </Col>
              <Col xs={24} sm={12}>
              <FormItem {...formItemLayout} label='是否默认' >
                    <Select  name='current' value={this.state.current.toString()}  style={{ width: 120 }} onChange={(value) =>this.onSelectChange('current',value)}>
                        <Option value='1' >是</Option>
                        <Option value='0' >否</Option>
                        
                      </Select>
                  
                  </FormItem>
              </Col>
          </Row>
          <Row>
             <Col xs={24} sm={12}> 
                <audio controls autoplay></audio>
                <Button type="primary" onClick={this.startRecording} inline size="small">开始录音</Button>
                <Button type="primary" onClick={this.stopRecording} id="stop" style={{marginLeft:'5px'}} size="small">停止录音并保存</Button>

              </Col>

          </Row>    
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">保存</Button>
            <Button href={"#/chat/answerList/"+this.state.question_id}  type="primary" style={{marginLeft:'30px'}}>返回</Button>
          </FormItem>
      </Form>
      </Card>
      </div>
    );
  }
}
export default Form.create()(AnswerInfo);