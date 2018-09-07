/*
* @Author: Rosen
* @Date:   2018-01-23 20:00:02
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-26 13:43:14
*/
import React                from 'react';
import { Link }    from 'react-router-dom';
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class NavSide extends React.Component{
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
    }
    
    handleClick(e){
        console.log('click ', e);
    }
    
    render(){
        return (
            <div className="navbar-default navbar-side">
                 <div className="sidebar-collapse">
            <Menu
                mode="inline"
                theme='light'
                style={{ width: 256 }}
                defaultSelectedKeys={['sub']}
               // defaultOpenKeys={['sub']}
               //onClick={this.handleClick}            
            >
                <Menu.Item key="sub"><Link to='/'>首页</Link></Menu.Item>
                <SubMenu key="sub1" title={<span><Icon type="appstore" /><span>我的任务</span></span>}>
                    <Menu.Item key="/product/index"><Link to='/product/index'>代办任务</Link></Menu.Item>
                    <Menu.Item key="/product/taskList"><Link to='/product/taskList'>已办任务</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub4" title={<span><Icon type="setting" /><span>系统管理</span></span>}>
                    <Menu.Item key="/user/index"><Link to='/user/index'>用户管理</Link></Menu.Item>
                    <Menu.Item key="10">权限管理</Menu.Item>
                    <Menu.Item key="11">连接管理</Menu.Item>
                    <Menu.Item key="12">权限类型管理</Menu.Item>
                </SubMenu>
                {/* <SubMenu key="sub2" title={<span><Icon type="mail" /><span>我的任务</span></span>}>
                        <MenuItemGroup key="g1" title="Item 1">
                            <Menu.Item key="1">代办任务</Menu.Item>
                            <Menu.Item key="2">已办任务</Menu.Item>
                        </MenuItemGroup>
                        <MenuItemGroup key="g2" title="Item 2">
                            <Menu.Item key="3">Option 3</Menu.Item>
                            <Menu.Item key="4">Option 4</Menu.Item>
                        </MenuItemGroup>
                </SubMenu> */}
            </Menu>
            </div>
      </div>
    );
  }
}

export default NavSide;