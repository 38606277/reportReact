import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import {  List,Avatar, Icon, Tooltip, Button, Card, Popover } from 'antd';
//import './Layout.scss';
import { Widget, addResponseMessage,toggleWidget,dropMessages,addLinkSnippet, addUserMessage, renderCustomComponent } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import ai from '../../asset/ai.png';
import my from '../../asset/chart.png';
import "babel-polyfill";
import HttpService from '../../util/HttpService.jsx';
import LocalStorge from '../../util/LogcalStorge.jsx';
const localStorge = new LocalStorge();
import logo from '../../asset/logo.png'
const Item=List.Item;
const url=window.getServerUrl();

export default class TopBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
            visible: false,
            ishow: '0',
            userCode: localStorge.getStorage('userInfo') == '' ? '' : localStorge.getStorage('userInfo').userCode,
            userid:localStorge.getStorage('userInfo') == '' ? '' : localStorge.getStorage('userInfo').id,
            to_userId:'0',
            pageNumd: 1, 
            perPaged: 1000,
            userIcon:''
        };

    }
    // 组件加载完成
  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this)) //监听窗口大小改变

    //调用组件内部方法打开窗口，再次调用是关闭；在组件销毁时调用一次关闭，可以保证每次打开都是开启状态
   // toggleWidget();
    dropMessages();
    let userInfo = localStorge.getStorage('userInfo');
    let user_id=null;
    if (undefined != userInfo && null != userInfo && '' != userInfo) {
      user_id=userInfo.id;
      this.setState({ userid:userInfo.id,userIcon:userInfo.icon==undefined?'':url+"/report/"+userInfo.icon});
    }else{
      window.location.href="/Login";
    }
    let mInfo={'from_userId':user_id,'to_userId':this.state.to_userId,
              pageNumd:this.state.pageNumd,perPaged:this.state.perPaged}
    HttpService.post('/reportServer/chat/getChatByuserID', JSON.stringify(mInfo))
    .then(res => {
      let list=res.data;
      for(var i=0;i<list.length;i++){
          if(user_id==list[i].from_userId){
            addUserMessage(list[i].post_message);
          }else{
            if(list[i].message_type=='json'){
              let ress=JSON.parse(list[i].post_message);
              renderCustomComponent(this.FormD, {data: ress.data.list, out: ress.data.out }); 
            }else{
              addResponseMessage(list[i].post_message);
            }
          }
      }
    })
  }

  //组件即将销毁
  componentWillUnmount() {
    //调用组件内部方法打开窗口，再次调用是关闭；在组件销毁时调用一次关闭，可以保证每次打开都是开启状态
    //toggleWidget();
    //一定要最后移除监听器，以防多个组件之间导致this的指向紊乱
    window.removeEventListener('resize', this.handleResize.bind(this))
  }

  FormD = ({ data, out }) => {
    return <Card style={{backgroundColor:'#f4f7f9'}}>
      <List>
        {data.map(val => (
          <Item
            multipleLine
            onClick={() => this.onClassClick(val.class_id)}
          >
             {/* {JSON.stringify(this.state.out)} */}
             {out.map((item) => {
               return <div  style={{fontSize:'14px',fontFamily:'微软雅黑',backgroundColor:'#F4F7F9'}}>
                {item.out_name}:{val[item.out_id.toUpperCase()]}
              </div> 
            }
            )} 
          </Item>
        ))}
      </List>
    </Card>
  }

  //发送消息
  async sendMessage(newMessage){ 
    var ist=true; 
    //先保存发送信息
    let userInfo={'from_userId':this.state.userid,
                  'to_userId':this.state.to_userId,
                  'post_message':newMessage,
                  'message_type':'0',
                  'message_state':'0'
                }
    await HttpService.post('/reportServer/chat/createChat', JSON.stringify(userInfo))
    .then(res => {
      if (res.resultCode != "1000") {
        ist=false;
      }
    })
    if(ist){
      //首先进行函数查询
      await HttpService.post('/reportServer/nlp/getResult/' + newMessage, null)
        .then(res => {
          if (res.resultCode == "1000") {
            // this.setState({ data: res.data.list, out: res.data.out })
            //数据保存到数据库
            let responseInfo={'from_userId':this.state.to_userId,
                  'to_userId':this.state.userid,
                  'post_message':res,
                  'message_type':'json',
                  'message_state':'0'
                }
           HttpService.post('/reportServer/chat/createChat', JSON.stringify(responseInfo))
            .then(res => {
              if (res.resultCode != "1000") {
               // console.log(res);
              }
            })
            return renderCustomComponent(this.FormD, {data: res.data.list, out: res.data.out }); 
          } else {

          }
        })
        .catch((error) => {
          // Toast.fail(error);
        });
  
    
      var that = this
      fetch('http://www.tuling123.com/openapi/api?key=f0d11b6cae4647b2bd810a6a3df2136f&info=' + newMessage, {
        method: 'POST',
        type: 'cors'
      }).then(function (response) {
        return response.json();
      }).then(function (detail) {
        if (detail.code === 100000) {
          let responseInfo={'from_userId':that.state.to_userId,
                  'to_userId':that.state.userid,
                  'post_message':detail.text,
                  'message_type':'0',
                  'message_state':'0'
                }
          HttpService.post('/reportServer/chat/createChat', JSON.stringify(responseInfo))
            .then(res => {
              if (res.resultCode != "1000") {
               // console.log(res);
              }
            })
          return addResponseMessage(detail.text);
        } else {
        }
      })

    }
  }


  
    //监听浏览器窗口大小 
    handleResize = e => {
        if(e.target.innerWidth<=561){
            this.setState({
                collapsed: true,
            },function(){
                this.props.callbackParent(this.state.collapsed);
            });
        }else{
            this.setState({
                collapsed: false,
            },function(){
                this.props.callbackParent(this.state.collapsed);
            });
        }
    }
    hide = () => {
        this.setState({
            visible: false,
        });
    }
    handleVisibleChange = (visible) => {
        this.setState({ visible });
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        },function(){
            this.props.callbackParent(this.state.collapsed);
        });
        
    }
    onCollapse(collapsed) {
        this.setState({ collapsed });
    }
    onselect(e) {
        this.setState({ ishow: e });
    }
    openChat() {
        this.setState({ ishow: 0 });
        toggleWidget();
    }
    // 退出登录
    onLogout() {
        localStorge.removeStorage('userInfo');
        localStorge.removeStorage('lasurl');
        this.setState({ redirect: true });
    }

    linkUserInfo(){
        this.props.history.push("/user/userView/"+this.state.userid);
    }
    render() {
        if (this.state.redirect) {
            return <Redirect push to="/login" />; //or <Redirect push to="/sample?a=xxx&b=yyy" /> 传递更多参数
        }
        // const menu = (
        //     <Menu>
        //         <Menu.Item>
        //             <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">个人资料</a>
        //         </Menu.Item>
        //         <Menu.Item>
        //             <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">退出</a>
        //         </Menu.Item>
        //     </Menu>
        // );

        const ss = this.state.ishow;
        console.log(ss);
        let contsss = null;
        let showwei = 'bottom';
        if (ss == '1') {
            contsss = <ul className="nav navbar-nav navbar-right pull-right"><li className="dropdown">
                <ul className="dropdown-menu">
                    <li ><a href=""><i className="md md-file-download">插件下载</i></a></li>
                </ul>
            </li></ul>;
            showwei = 'bottomLeft';
        } else if (ss == '2') {
            contsss = <ul className="nav navbar-nav navbar-right pull-right"><li className="dropdown hidden-xs">
                <ul className="dropdown-menu dropdown-menu-lg">
                    <li className="text-center notifi-title" style={{paddingLeft:'10px'}}>通知</li>
                    <li className="list-group">

                        <a className="list-group-item" href="javascript:void(0)" style={{ cursor: 'pointer' }}>
                            <div className="media">
                                <div className="pull-left">
                                    <Icon type='user-add' style={{ fontSize: '30px', color: '#29b6f6' }} />
                                </div>
                                <div className="media-body clearfix">
                                    <div className="media-heading">新用户注册</div>
                                    <p className="m-0">
                                        <small >你有10条未读的消息</small>
                                    </p>
                                </div>
                            </div>
                        </a>

                        <a className="list-group-item" href="javascript:void(0)" style={{ cursor: 'pointer' }}>
                            <div className="media">
                                <div className="pull-left">
                                    <Icon type="mail" theme="outlined" style={{ fontSize: '30px', color: '#1e88e5' }} />
                                </div>
                                <div className="media-body clearfix">
                                    <div className="media-heading">新闻设置</div>
                                    <p className="m-0">
                                        <small >有新的更新可用</small>
                                    </p>
                                </div>
                            </div>
                        </a>

                        <a className="list-group-item" href="javascript:void(0)" style={{ cursor: 'pointer' }}>
                            <div className="media">
                                <div className="pull-left">
                                    <Icon type="bell" style={{ fontSize: '30px', color: '#ef5350' }} />
                                </div>
                                <div className="media-body clearfix">
                                    <div className="media-heading">更新</div>
                                    <p className="m-0">
                                        <small >有
                                                        <span className="text-primary">2</span> 条新的更新可用</small>
                                    </p>
                                </div>
                            </div>
                        </a>

                        <a className="list-group-item" href="javascript:void(0)" style={{ cursor: 'pointer' }}>
                            <small >看所有的通知</small>
                        </a>
                    </li>
                </ul>
            </li>
            </ul>;
            showwei = 'bottom';
        } else if (ss == '3') {
            contsss =<ul className="nav navbar-nav navbar-right pull-right"> <li className="hidden-xs">
                {/* <a className="waves-effect waves-light" href="javascript:void(0)" id="btn-fullscreen"><i className="md md-crop-free"></i></a> */}
            </li>
            </ul>;
        } else if (ss == '4') {
            contsss =<ul className="nav navbar-nav navbar-right pull-right"><li className="dropdown">
                <ul className="dropdown-menu">
                    <li style={{ margin: '10px' }}>
                        <Link to={"/user/userView/"+this.state.userid}>
                            <Icon type="user" theme="outlined" style={{ fontSize: '18px', color: '#0a0a0a' }} /> 
                            <span style={{ fontSize: '16px', marginLeft: '5px', color: '#0a0a0a' }}>个人信息</span>
                         </Link>
                    </li>
                    <li style={{ margin: '10px' }}><Link to={"/user/UpdatePwd/"+this.state.userid}>
                        <Icon type="key" theme="outlined" style={{ fontSize: '18px', color: '#0a0a0a' }} /> 
                        <span style={{ fontSize: '16px', marginLeft: '5px', color: '#0a0a0a' }}>密码修改</span></Link>
                    </li>
                    <li style={{ margin: '10px' }} ><a href="javascript:void(0)"><Icon type="setting" theme="outlined" style={{ fontSize: '18px', color: '#0a0a0a' }} />
                        <span style={{ fontSize: '16px', marginLeft: '5px', color: '#0a0a0a' }}>设置</span></a>
                    </li>
                    <li style={{ margin: '10px' }} ><a onClick={() => { this.onLogout() }}><Icon type="logout" theme="outlined" style={{ fontSize: '18px', color: '#0a0a0a' }} />
                        <span style={{ fontSize: '16px', marginLeft: '5px', color: '#0a0a0a' }}>退出</span> </a>
                    </li>
                </ul>
            </li>
            </ul>;
            showwei = 'bottomRight';
        }
       // const contenttwo = ({contsss});

        return (
            <div className="top-navbar" style={{lineHeight:'50px',background:'#2f96e2'}}>
                <div style={{float:'left',background:'#2f96e2'}} >

                        <a href="javascript:;">
                            <img alt="logo" style={{ width: '30px', height: '30px' }} src={logo} />
                            <span  className="logodiv">财务报表平台</span>
                        </a>
                        {/* <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16, marginLeft: 20 }}>
                            <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                        </Button>  */}
                        <Tooltip title='缩回'>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            />
                        </Tooltip>
                        {/* <Tooltip>
                            <input type='text' className='search-bar' placeholder='查找...' />
                            <button className="btn-search" type="submit"><i className="fa fa-search"></i></button>
                        </Tooltip> */}
                    </div>
                <div style={{float:'right',background:'#2f96e2'}} >
                        {
                            this.state.userCode
                                ? <span style={{color: 'white'}}>欢迎，{this.state.userCode}</span>
                                : <span style={{color: 'white'}}>请登录</span>
                        }
                        <Tooltip>
                            <Popover
                                placement={showwei}
                                content={contsss}
                                trigger="click"
                                visible={this.state.visible}
                                onVisibleChange={this.handleVisibleChange}
                            >
                                <Button type="primary" style={{ color: '#ffffff', background: 'transparent', borderColor: 'transparent' }} onClick={() => this.onselect('1')}>
                                    <Icon type="setting" style={{ fontSize: '18px', color: '#ffffff', background: 'transparent', borderColor: 'transparent' }} />
                                </Button>
                                <Button type="primary" style={{ background: 'transparent', borderColor: 'transparent' }} onClick={() => this.onselect('2')}>
                                    <Icon type="bell" style={{ fontSize: '18px', color: '#ffffff', background: 'transparent' }} />
                                </Button>
                                {/* <Button type="primary" style={{ background: 'transparent', borderColor: 'transparent' }} onClick={() => this.openChat()}>
                                    <Icon type="bell" style={{ fontSize: '18px', color: '#ffffff', background: 'transparent' }} />
                                </Button>                        */}
                                <Button type="primary" onClick={() => this.onselect('4')} style={{ background: 'transparent', borderColor: 'transparent' }}>
                                    <Avatar size="{32}" icon="user" />
                                </Button>
                            </Popover>
                            <Widget
                                    handleNewUserMessage={newMessage=>this.sendMessage(newMessage)}
                                    senderPlaceHolder="输入想要做什么"
                                    profileAvatar={ai}
                                    titleAvatar={this.state.userIcon==''?my:this.state.userIcon}
                                    ShowCloseButton={true} 
                                    title="智能机器人"
                                    subtitle=""
                                    fullScreenMode={false}
                                />  
                        </Tooltip>
                        
                    </div> 
            </div>   
        );
    }
}

