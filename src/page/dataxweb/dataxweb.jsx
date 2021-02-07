import React        from 'react';
import { Drawer } from 'antd';
import {CloseOutlined} from '@ant-design/icons'

export default class invest extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible: true,
        };
    }
    componentDidMount(){
    }
    onClose = () => {
        this.setState({
          visible: false,
        });
        window.location.href="#/dashboard/dataAssetMap"
      };
   
    render() {
        return (
            <Drawer
                width="100%"
                onClose={this.onClose}
                visible={this.state.visible}
                closeIcon={<CloseOutlined style={{color:"#f0f2f5",position:"absolute",top:"2px",right:"-10px"}}/>}
                bodyStyle={{ padding: 0 }}>
                    <div style={{width:"100%",height:"100%"}}>
                    <iframe style={{border:0,width:"100%",height:"100%"}} src='http://192.168.1.102:9527/index.html#/dashboard'/>
                    </div>
            </Drawer>
        );
  }
}

