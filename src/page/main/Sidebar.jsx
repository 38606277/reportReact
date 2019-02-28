import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Layout, Menu, Icon,Spin} from 'antd';
import queryService from '../../service/QueryService.jsx';
import  LocalStorge         from '../../util/LogcalStorge.jsx';
const localStorge = new LocalStorge();
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
const _query =new queryService();




export default class SiderBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categoryList:[],
            loading: false,
            userId:0,
            categoryList2:[],
        };

    }
    componentDidMount() {
        //获取报表列表
       let param=''
        if(undefined!=localStorge.getStorage('userInfo') && ''!=localStorge.getStorage('userInfo')){
            param= localStorge.getStorage('userInfo').id;
            this.setState({userId:param});
        }
        _query.getQueryClassTree(param).then(response => {
            this.setState({categoryList:response.data});
        }, errMsg => {
            this.setState({
                categoryList : []
            });
        });
    }
     //数据图标分析透视导航分解   
    dashboardformSubmenusChild(obj,index){
        return (<SubMenu key={obj.func_name+obj.func_id} 
                onTitleClick={this.dashBoardClickMuen.bind(this,obj)} 
                id='divtitle'
                title={<span><Icon type={obj.func_icon} />
                <span>{obj.func_name}</span></span>}>
                {
                     obj.dashboardList==null?'':obj.dashboardList.map(obj2=>(
                        <Menu.Item key={obj2.dashboard_name+obj2.dashboard_id} >
                        <Link to={'#'}>
                        <Icon type={obj2.icon==undefined?'table':obj2.icon} /><span>{obj2.dashboard_name}</span>
                        </Link></Menu.Item>
                    ))
                }
            </SubMenu>);
        }
     //数据透视导航分解   
    cubeformSubmenusChild(obj,index){
        return (<SubMenu key={obj.func_name+obj.func_id} 
                onTitleClick={this.cubeClickMuen.bind(this,obj)} 
                id='divtitle'
                title={<span ><Icon type={obj.func_icon} />
                <span>{obj.func_name}</span></span>}>
                {
                    obj.cubeList==null?'':obj.cubeList.map(obj2=>(
                        <Menu.Item key={obj2.cube_name+obj2.cube_id} >
                        <Link to={'/dashboard/DataAnalysis/'+obj2.qry_id+'/'+obj2.class_id+'/'+obj2.cube_name}>
                        <Icon type={obj2.icon==undefined?'table':obj2.icon} /><span>{obj2.cube_name}</span>
                        </Link></Menu.Item>
                    ))
                }
            </SubMenu>);
        }
    //数据查询获取导航2    
    fourformSubmenusChild(obj,index){
        return (<SubMenu key={obj.func_name+obj.func_id} 
            onTitleClick={this.clickMuen.bind(this,obj,index)} 
            id='divtitle'
            title={<span><Icon type={obj.func_icon} />
            <span>{obj.func_name}</span></span>}>
            {
                obj.shujuList==null?'':obj.shujuList.map(obj2=>(
                    <SubMenu key={obj2.class_name+obj2.class_id+obj2.auth_type} 
                        onTitleClick={this.clickQryName.bind(this,obj2)} 
                        title={<span><Icon type={'folder'} /><span>
                        {obj2.class_name}</span></span>}>
                        {
                            obj2.shuJuChildren==null?'':obj2.shuJuChildren.map(citem=>(
                                <Menu.Item key={citem.qry_name+citem.qry_id} >
                                <Link to={'/query/ExecQuery/'+citem.qry_id+'/'+obj2.class_id+'/'+citem.qry_name+'/null'}>
                                <Icon type={'table'} /><span>{citem.qry_name}</span>
                                </Link></Menu.Item>
                            ))
                        }
                    </SubMenu>
                ))
            }
        </SubMenu>);
    }
    //固定循环设置导航
    formSubmenusChild(obj){
        let cHtml=<div></div>;
        let childArray=obj.children;
        if("undefined"!=typeof(childArray)&&childArray.length>0) {
          cHtml = childArray.map((item, index) => {
                return this.formSubmenusChild(item);
            });
            return <SubMenu key={obj.func_name}  id='divtitle' title={<span><Icon type={obj.func_icon} /><span>{obj.func_name}</span></span>}>{cHtml}</SubMenu>
        }else{
            return <Menu.Item key={obj.func_name} ><Link to={obj.func_url}  id='divtitle'><Icon type={obj.func_icon} /><span>{obj.func_name}</span></Link></Menu.Item>
        }
    }
    //数据查询
    clickMuen=(obj,index)=>{
        if(undefined==obj.shujuList){
            this.setState({loading:true});
            _query.getQueryClassTreetwo(this.state.userId).then(response=>{
                this.setState({loading:false});
               obj['shujuList']=response.data;
               this.setState({categoryList:this.state.categoryList});
                // const { categoryList } = this.state;
                // const newData = categoryList.map(item => ({ ...item }));
                // newData[index]['shujuList'] = response.data;
                // this.setState({ categoryList: newData });
                
            });
        }
    }
    //数据查询获取数据
    clickQryName=(obj)=>{
        if(undefined==obj.shuJuChildren){
            this.setState({loading:true});
            _query.getQryNameByClassId(obj).then(response=>{
                this.setState({loading:false});
                obj['shuJuChildren']=response.data;
                this.setState({categoryList:this.state.categoryList});
            });
        }
    }
    //点击数据映射获取数据导航
    cubeClickMuen=(obj)=>{
        if(undefined==obj.cubeList){
            this.setState({loading:true});
            _query.getCubeListInAuth(this.state.userId).then(response=>{
                this.setState({loading:false});
               obj['cubeList']=response.data;
               this.setState({categoryList:this.state.categoryList});
            });
        }
    }
    //点击数据图标分析获取数据导航
    dashBoardClickMuen=(obj)=>{
        if(undefined==obj.dashboardList){
            this.setState({loading:true});
            _query.getDashboardListInAuth(this.state.userId).then(response=>{
                this.setState({loading:false});
               obj['dashboardList']=response.data;
               this.setState({categoryList:this.state.categoryList});
             });
        }
    }
    //点击我的报表获取后台数据
    clickMuenBao=(obj)=>{
        if(undefined==obj.baobiaoList){
            _query.getMyReports().then(response => {
                obj['baobiaoList']=response;
              this.setState({categoryList2:response});
          }, errMsg => {
             
          });
        }
    }
    //我的报表导航
    baoBiaoSubmenus(obj,index){
        return (<SubMenu key={obj.func_name+obj.func_id} 
            onTitleClick={this.clickMuenBao.bind(this,obj,index)} 
            id='divtitle'
            title={<span><Icon type={obj.func_icon} />
            <span>{obj.func_name}</span></span>}>
            {
                obj.baobiaoList==null?'':obj.baobiaoList.map(obj2=>(
                 this.baoBiaoSubmenusChild(obj2)
                ))
                
            }
        </SubMenu>);
    }
    //我的报表详细导航
    baoBiaoSubmenusChild(obj){
        let cHtml=<div></div>;
        let childArray=obj.children;
        if("undefined"!=typeof(childArray)&&childArray.length>0) {
          cHtml = childArray.map((item, index) => {
                return this.baoBiaoSubmenusChild(item);
            });
            return <SubMenu key={obj.name}  id='' title={<span><Icon type={"table"} /><span>{obj.name}</span></span>}>{cHtml}</SubMenu>
        }else{
            return <Menu.Item key={obj.name} ><Link to={"/query/web/"+obj.path}  id='divtitle'><Icon type={"table"} /><span>{obj.name}</span></Link></Menu.Item>
        }
    }
    render() {
        let html=this.state.categoryList.map((obj,index)=> {
            if ("undefined"!=typeof(obj.children)) {
                if(obj.func_id=='1001'){
                   return this.fourformSubmenusChild(obj,index);
                }else if(obj.func_id=='1006'){
                    return this.cubeformSubmenusChild(obj,index);
                }else if(obj.func_id=='1007'){
                    return this.dashboardformSubmenusChild(obj,index);
                }else if(obj.func_id=='1008'){
                    return this.baoBiaoSubmenus(obj,index);
                }else{
                    if("undefined"!=typeof(obj.children) &&obj.children.length>0){
                        return this.formSubmenusChild(obj);
                    }else{
                        return <Menu.Item key={"sub"+index} id="atitle"><Link to={obj.func_url}><Icon type={obj.func_icon} /><span>{obj.func_name}</span></Link></Menu.Item>
                    }
                }
            } else {
                //这里的routeurl是路由地址，是自定义的一个属性
                return <Menu.Item key={"sub"+index} id="atitle"><Link to={obj.func_url}><Icon type={obj.func_icon} /><span>{obj.func_name}</span></Link></Menu.Item>
            }
        });
        const collapsed=this.props.collapsed;
        return (
            <div className="navbar-side">
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                theme="light"
                width='250px'
                collapsedWidth='60'
                style={{ overflow: 'auto', height: '100vh', left: 0 }}
            >
             <Spin spinning={this.state.loading} delay={100}>
                <Menu theme="light" defaultSelectedKeys={['1']} mode="inline"  >
                         {html}
                         <Menu.Item> <Link to="/cached"><Icon type="table" /> 缓存</Link>  </Menu.Item>
                </Menu>
                </Spin>
            </Sider>
            </div>
        )
    }
}