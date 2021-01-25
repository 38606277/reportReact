import React        from 'react';
import { Drawer } from 'antd';


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
                title="数据采集"
                width="100%"
                onClose={this.onClose}
                visible={this.state.visible}
                bodyStyle={{ paddingBottom: 0 }}>
                    <iframe style={{border:0,width:"100%",height:630,}} src='http://192.168.1.102:9527/index.html#/dashboard'/>
            </Drawer>
        );
  }
}

