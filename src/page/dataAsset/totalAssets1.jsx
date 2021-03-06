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
    Avatar ,
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
export default (props)=>{
    const [data,setdata]=useState([])
    useEffect(()=>{
        HttpService.post('/reportServer/DBConnection/ListAll',{}).then(res=>{
            setdata(res)
        })
    },[])
    const pushs=(data)=>{
        console.log(data)
        // :host_id/:dbType
        props.history.push('/dataAnalysis/SystemData/'+data.name+"/"+data.dbtype)
    }
    return (
        <Card title="数据资产"
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
                            onClick={()=>{
                                pushs(item)
                            }}
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
                                        <Avatar  src={url+"report"+item.icon} alt=""/>
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
                                <Statistic title="列数" value={1128}/>
                                </Col>
                                <Col span={12}>
                                <Statistic title="行数" value={93} />
                                </Col>
                            </Row>
                        </Card>
                    </List.Item>
                    )}
                />
        </Card>
    )
}