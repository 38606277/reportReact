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
    const [data,setdata]=useState([])
    useEffect(()=>{
        HttpService.post('/reportServer/DBConnection/ListAll',{}).then(res=>{
            setdata(res)
        })
    },[])
    const pushs=(data)=>{
        props.history.push('/dataAnalysis/SystemData/'+data.name+"/"+data.dbtype)
    }
    return (
        <Card title="数据资产"
            >
            <Row justify="space-between">
                <Col>
                    <Row>
                        <Col>
                            <Statistic
                                title="Active"
                                value={11.28}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                suffix="%"
                            />
                        </Col>
                        <Col 
                            style={{
                                marginLeft:"20px"
                            }}
                        >   
                            <Statistic
                                title="Active"
                                value={11.28}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                suffix="%"
                            />
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Card>
                        adwa
                    </Card>
                </Col>
            </Row>
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
                                    background:mycolor(),
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
                                        <Avatar  src={url+"report"+item.icon} alt=""/>
                                    </Col>
                                    <Col style={{
                                        marginLeft:"14px"
                                    }}>
                                        <h3
                                            style={{textAlign:"center",margin:"0px",color:'#fff'}}
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
                                <Statistic   valueStyle={{ color: '#fff' ,textAlign:"left"}} title={<h3 style={{color:"#fff",textAlign:"left"}}>列数</h3>} value={28}/>
                                </Col>
                                <Col span={12}>
                                <Statistic   valueStyle={{ color: '#fff' ,textAlign:"right"}}  title={<h3 style={{color:"#fff",textAlign:"right"}}>行数</h3>}  value={23} />
                                </Col>
                            </Row>
                        </Card>
                    </List.Item>
                    )}
                />
        </Card>
    )
}