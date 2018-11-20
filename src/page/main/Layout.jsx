import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Layout,Card } from 'antd';
const { Header, Content, Sider } = Layout;
import Loadable from 'react-loadable';
import loading from '../../util/loading.jsx'

const SiderBar = Loadable({
    loader: () => import('./SideBar.jsx'),
    loading: loading,
    delay:3000
});
const TopBar = Loadable({
    loader: () => import('./TopBar.jsx'),
    loading: loading,
    delay:3000
});
export default class MainLoyout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false
        };
    }
    
    onChildChanged=(newState)=>{
        this.setState({
            collapsed: newState
        });
    }
    render() {
        
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Header style={{ background: '#4b9adf', color: '#FFFF', padding: 0, height: "50px", lineHeight: "50px" }} >
                    
                    <TopBar callbackParent={this.onChildChanged}/>
                </Header>

                <Layout>
                    <SiderBar collapsed={this.state.collapsed}/>
                    <Content>
                        <Card bodyStyle={{ padding: "10px", marginLeft: 2, background: '#ececec', minHeight: 900 }}>
                            {this.props.children}
                        </Card>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

