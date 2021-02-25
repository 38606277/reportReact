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
    Card,
    Tabs
} from 'antd';
const { TabPane } = Tabs;
import { EditOutlined, EllipsisOutlined, VerticalAlignBottomOutlined,BranchesOutlined } from '@ant-design/icons';
import HttpService from '../../util/HttpService.jsx';
const url=window.getServerUrl();
const mycolor=()=>{
    let mycolr1="#",
        m=0
    const clr=[0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f"]
    while(m<6){
        m+=1
        mycolr1+=clr[Math.floor(Math.random()*clr.length)]
    }
    return mycolr1
}

export default (props)=>{
    const [data,setdata]=useState([])//数据源
    const [bdtype,setBdtype]=useState([])
    useEffect(()=>{
        source()
    },[])
    const pushs=(data)=>{
        props.history.push('/dataAnalysis/SystemData/'+data.name+"/"+data.dbtype)
    }
    const source=()=>{
        HttpService.post('/reportServer/DBConnection/ListAll',{}).then(res=>{
            setdata(res)
        })
    }
    return (
        <Card title="数据资产"
            bodyStyle={{
                padding:"0px"
            }}
            >
            <Row
                justify="space-between"
            >
              <Col sm={17}>
                <Card title='本地资源'
                        headStyle={{
                            fontSize:"14px",
                            color:"rgb(205, 127, 50)"
                        }}
                    >
                        <Row>
                            <Col>
                               <Card>
                                    <Statistic
                                            title="数据库总量"
                                            value={11}
                                            precision={2}
                                            valueStyle={{ color: '#3f8600' }}
                                            suffix="（个）"
                                    />
                               </Card>
                            </Col>
                            <Col 
                                style={{
                                    marginLeft:"20px"
                                }}
                            >   
                                 <Card>
                                    <Statistic
                                            title="数据库总量"
                                            value={11}
                                            precision={2}
                                            valueStyle={{ color: '#3f8600' }}
                                            suffix="（个）"
                                    />
                               </Card>
                            </Col>
                        </Row>
                    </Card>
              </Col>
              <Col sm={6}>
                  <Card title='本地资源'
                        headStyle={{
                            fontSize:"14px",
                            color:"rgb(205, 127, 50)"
                        }}>
                        <Card>
                            <Statistic
                                title="数据库总量"
                                value={11}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                suffix="（个）"
                            />
                        </Card>   
                  </Card>
              </Col>
            </Row>
            <Card
                title='我的数据库'
                headStyle={{
                    fontSize:"14px",
                    color:"rgb(205, 127, 50)"
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
        </Card>
    )
}