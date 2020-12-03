import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Layout, Menu, Spin } from 'antd';
import queryService from '../../service/QueryService.jsx';
import  LocalStorge         from '../../util/LogcalStorge.jsx';
const localStorge = new LocalStorge();
const { Header, Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const _query =new queryService();




export default class SiderBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categoryList:[],
            loading: false,
            userId:0
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
    fourformSubmenusChild(obj,index){
    return (
        <SubMenu key={obj.func_name+obj.func_id} 
                onTitleClick={this.clickMuen.bind(this,obj,index)} 
                title={<span><LegacyIcon type={obj.func_icon} />
                <span>{obj.func_name}</span></span>}>
                {
                    obj.shujuList==null?'':obj.shujuList.map(obj2=>(
                        <SubMenu key={obj2.class_name+obj2.class_id+obj2.auth_type} 
                            onTitleClick={this.clickQryName.bind(this,obj2)} 
                            title={<span><LegacyIcon type={'folder'} /><span>
                            {obj2.class_name}</span></span>}>
                            {
                                obj2.shuJuChildren==null?'':obj2.shuJuChildren.map(citem=>(
                                    <Menu.Item key={citem.qry_name+citem.qry_id} >
                                    <Link to={'/query/ExecQuery/'+citem.qry_id+'/'+obj2.class_id+'/'+citem.qry_name+'/null'}>
                                    <LegacyIcon type={'table'} /><span>{citem.qry_name}</span>
                                    </Link></Menu.Item>
                                ))
                            }
                        </SubMenu>
                    ))
                }
            </SubMenu>
    );
    }
    // threeformSubmenusChild(obj,index,indexs){
    //     let cHtml=<div></div>;
    //     let childArray=obj.children;
    //     if("undefined"!=typeof(childArray)&&childArray.length>0) {
    //         cHtml = childArray.map((item, index) => {
    //             return this.threeformSubmenusChild(item,obj.value,index);
    //         });
    //         return <SubMenu key={obj.name==undefined?obj.func_name+(indexs):obj.name+(indexs)} title={<span><Icon type={obj.func_icon!=undefined?obj.func_icon:'folder'} /><span>{obj.name==undefined?obj.func_name:obj.name}</span></span>}>{cHtml}</SubMenu>
    //     }else{
    //         return <Menu.Item key={obj.name+index} ><Link to={'/query/ExecQuery/'+obj.value+'/'+index+'/'+obj.name+'/null'}><Icon type={childArray==undefined?'table':'folder'} /><span>{obj.name==undefined?obj.func_name:obj.name}</span></Link></Menu.Item>
    //     }
    // }
    formSubmenusChild(obj){
        let cHtml=<div></div>;
        let childArray=obj.children;
        if("undefined"!=typeof(childArray)&&childArray.length>0) {
          cHtml = childArray.map((item, index) => {
                return this.formSubmenusChild(item);
            });
            return <SubMenu key={obj.func_name} title={<span><LegacyIcon type={obj.func_icon} /><span>{obj.func_name}</span></span>}>{cHtml}</SubMenu>;
        }else{
            return <Menu.Item key={obj.func_name} ><Link to={obj.func_url}><LegacyIcon type={obj.func_icon} /><span>{obj.func_name}</span></Link></Menu.Item>;
        }
    }
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
    render() {
        let html=this.state.categoryList.map((obj,index)=> {
            if ("undefined"!=typeof(obj.children)) {
                if(obj.func_id=='1001'){
                   return this.fourformSubmenusChild(obj,index);
                }else{
                    if("undefined"!=typeof(obj.children) &&obj.children.length>0){
                        return this.formSubmenusChild(obj);
                    }else{
                        return <Menu.Item key={"sub"+index} ><Link to={obj.func_url}><LegacyIcon type={obj.func_icon} /><span>{obj.func_name}</span></Link></Menu.Item>;
                    }
                }
            } else {
                //这里的routeurl是路由地址，是自定义的一个属性
                return <Menu.Item key={"sub"+index} ><Link to={obj.func_url}><LegacyIcon type={obj.func_icon} /><span>{obj.func_name}</span></Link></Menu.Item>;
            }
        });
         const collapsed=this.props.collapsed;
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                theme="light"
                width='250px'
                style={{ overflow: 'auto', height: '100vh', left: 0 }}
            >
             <Spin spinning={this.state.loading} delay={100}>
                <Menu theme="light" defaultSelectedKeys={['1']} mode="inline"  >
                         {html}
                </Menu>
                </Spin>
            </Sider>
        )
    }
}


