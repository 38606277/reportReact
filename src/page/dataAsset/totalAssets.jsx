import React,{useState,useEffect,useRef} from 'react'
import {
    Form,
    Divider,
    Button,
    Checkbox,
    Radio,
    Space,
    Input,
    Row,
    Col,
    Select,
    Tooltip,
    List,
    Empty,
    Drawer,
    Tree,
    Dropdown,
    Statistic,
    Card
} from 'antd';
import { EditOutlined, EllipsisOutlined, VerticalAlignBottomOutlined,BranchesOutlined } from '@ant-design/icons';
import HttpService from '../../util/HttpService.jsx';
const url=window.getServerUrl();
export default ()=>{
    const [data,setdata]=useState([])
    useEffect(()=>{
        console.log(1)
        HttpService.post('/reportServer/DBConnection/ListAll',{}).then(res=>{
            console.log(2)
            console.log(res)
            setdata(res)
        })
    },[])
    return (
        <Card title="数据资产"
        bodyStyle={{
            background:"#ececec"
        }}
            >
             <List
                    grid={{
                    gutter:14,
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 4,
                    xl: 5,
                    xxl: 3,
                    }}
                    dataSource={data}
                    renderItem={item => (
                    <List.Item style={{
                        position:"relative"
                    }}>
                        <Card 
                            headStyle={{
                                height:"20px",
                                border:"none",
                                paddingLeft:'10px'
                            }}
                            bodyStyle={{
                                paddingTop:"10px",
                                paddingBottom:"10px"
                            }}
                            hoverable
                            title={
                                <Row align="middle">
                                    <Col>
                                        <img style={{height:"15px"}} src={url+"/report"+item.icon} alt=""/>
                                    </Col>
                                    <Col style={{
                                        marginLeft:"14px"
                                    }}>
                                        <h3
                                            style={{textAlign:"center",margin:"0px"}}
                                        >{item.desc}
                                        </h3>
                                    </Col>
                            </Row>
                            }
                        actions={
                            [
                                
                                <Tooltip placement="top" title={<span>下载</span>}>
                                    <VerticalAlignBottomOutlined />
                                </Tooltip>,
                                <Tooltip placement="top" title={<span>编辑</span>}>
                                    <EditOutlined key="edit" />
                                </Tooltip>,
                                 <Tooltip placement="top" title={<span>分享</span>}>
                                    <BranchesOutlined />
                                </Tooltip> ,
                                <Tooltip placement="top" title={<span>更多</span>}>
                                    <EllipsisOutlined key="ellipsis" />
                                </Tooltip> 
                            ]
                        }
                        >
                          
                          <Row style={{
                              boxSizing:'border-box',
                              padding:"0px 10px"
                          }} gutter={16} justify="space-between">
                                <Col span={12}>
                                <Statistic title="Feedback" value={1128}/>
                                </Col>
                                <Col span={12}>
                                <Statistic title="Unmerged" value={93} />
                                </Col>
                            </Row>
                        </Card>
                    </List.Item>
                    )}
                />
        </Card>
    )
}