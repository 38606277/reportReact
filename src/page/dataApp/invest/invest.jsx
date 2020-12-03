import React        from 'react';
import QueryService     from '../../../service/QueryService.jsx';
import  LocalStorge  from '../../../util/LogcalStorge.jsx';
const localStorge = new LocalStorge();
const _query      = new QueryService();


export default class invest extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            path:this.props.match.params.path,
            userId:localStorge.getStorage('userInfo').userId,
            localPath:""
        };
    }
    componentDidMount(){
        // this.loadHtml();
    }
   //组件更新时被调用 
   componentWillReceiveProps(nextProps){
    // let newpath = nextProps.match.params.path;
    // let oldpath=this.state.path;
    // //如果qryId发生变化则这个页面全部重新加载
    // if(oldpath!=newpath){
    //     this.setState({
    //         path:newpath,localPath:""
    //     },function(){
    //         this.loadHtml();
    //     });
    // }
   }
    loadHtml(){
        _query.MyReportUrl().then(response => {
           this.setState({localPath: window.getServerUrl()+"report/static/"+decodeURIComponent(decodeURIComponent(this.state.path)).replace(response.webPath,"")});
        }, errMsg => {
            localStorge.errorTips(errMsg);
        });
    }
    render() {
        return (
            <div id="page-wrapper">
                <iframe style={{border:0,width:"100%",height:630,}} src='http://192.168.1.102:3000/public/dashboard/45e78c58-1650-4102-b792-ba049f5ca6a6'/>
            </div>
        );
  }
}

