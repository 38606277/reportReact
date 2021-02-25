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
                <Col sm={16}>
                    <Card
                        title="数据展示"
                        bordered={false}
                        style={{
                            borderTop:"1px solid #f0f0f0",
                            borderRight:"1px solid #f0f0f0"
                        }}
                        headStyle={{
                            color: 'rgb(205, 127, 50)',
                            fontSize: '14px',
                            height:"20px",
                            border:"none"
                        }}
                        bodyStyle={{
                            paddingTop:"0px"
                        }}
                    >
                        <Row 
                            justify="space-between"
                        >
                           <Col>
                            <Card
                                    hoverable
                                    style={{
                                        marginRight:"10px",
                                        background:"#526ecc"
                                    }}
                                >
                                    <Statistic
                                            title={<div style={{color:"#fff"}}>数据总量</div>}
                                            value={11}
                                            precision={2}
                                            valueStyle={{ color: '#fff' }}
                                            suffix="（条）"
                                    />
                                </Card>
                           </Col>
                            <Col>
                                <Card
                                    hoverable
                                    style={{
                                        marginRight:"10px",
                                        background:"#526ecc"
                                    }}
                                >
                                    <Statistic
                                            title={<div style={{color:"#fff"}}>新增数据</div>}
                                            value={11}
                                            precision={2}
                                            valueStyle={{ color: '#fff' }}
                                            suffix="（条）"
                                    />
                                </Card>
                            </Col>
                            <Col>
                                <Card
                                    hoverable
                                    style={{
                                        background:"#526ecc"
                                    }}
                                >
                                    <Statistic
                                            title={<div style={{color:"#fff"}}>修改数据</div>}
                                            value={11}
                                            precision={2}
                                            valueStyle={{ color: '#fff' }}
                                            suffix="（条）"
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col 
                    sm={8}
                >   
                    <Card 
                    bordered={false}
                    title="资产内容"
                    style={{
                        borderTop:"1px solid #f0f0f0"
                    }}
                    headStyle={{
                        color: 'rgb(205, 127, 50)',
                        fontSize: '14px',
                        height:"20px",
                        border:"none"
                    }}
                    bodyStyle={{
                        paddingTop:"0px"
                    }}
                    bodyStyle={{
                        paddingTop:"0px"
                    }}
                    >
                    <Card
                        hoverable
                        style={{
                            background:"#526ecc"
                        }}
                        >
                            <Statistic
                                title={<div style={{color:"#fff"}}>删除数据</div>}
                                value={11}
                                precision={2}
                                valueStyle={{ color: '#fff' }}
                                suffix="（条）"
                            />
                        </Card>
                    </Card>
                </Col>
                    {/* </Card> */}
            </Row>
            <Card
                title='数据源'
                headStyle={{
                    fontSize:"14px",
                    color:"rgb(205, 127, 50)",
                    height:"20px"
                }} 
                bodyStyle={{
                    paddingTop:"0px"
                }}
            >
                <List
                    style={{
                        marginTop:"20px"
                    }}
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
                            position:"relative",
                        }}>
                            <Card 
                                style={
                                    {
                                        background:'#e9edfa',
                                    }
                                }
                                size="small"
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
                                            <Avatar  src={url+"/report"+item.icon} alt=""/>
                                        </Col>
                                        <Col style={{
                                            marginLeft:"14px"
                                        }}>
                                            <h3
                                                style={{textAlign:"center",margin:"0px",color:'#252b3a'}}
                                            >{item.desc}
                                            </h3>
                                        </Col>
                                </Row>
                                }
                            >
                                <Row style={{
                                    boxSizing:'border-box',
                                    padding:"0px 10px",
                                }} gutter={16} justify="space-between">
                                    <Col span={12}>
                                        <Statistic   valueStyle={{ color: '#fff' ,textAlign:"left"}} title={<h3 style={{color:"#252b3a",textAlign:"left",fontSize:"16px"}}>行数</h3>} value={28}/>
                                    </Col>
                                    <Col span={12}>
                                        <Statistic   valueStyle={{ color: '#fff' ,textAlign:"right"}}  title={<h3 style={{color:"#252b3a",textAlign:"right",fontSize:"16px"}}>列数</h3>}  value={23} />
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