import React,{useState,useEffect,useRef} from 'react'
import {
    Row,
    Col,
    Avatar ,
    List,
    Statistic,
    Typography,
    Card,
    Tabs
} from 'antd';
import HttpService from '../../util/HttpService.jsx';
import STYLE from './totalAssets.less'
const url=window.getServerUrl();
export default (props)=>{
    const [data,setdata]=useState([])//数据源
    const [bdtype,setBdtype]=useState([])
    const [list,setlist]=useState([])
    useEffect(()=>{
        source()
        DOS('3')
        DOS('2')
    },[])
    const pushs=(data,mClass)=>{
        if(mClass=='sourec'){
            props.history.push('/dataAsset/SystemData/'+data.name+"/"+data.dbtype+'/'+mClass+'/'+data.desc)
            return
        }
        props.history.push('/dataAsset/SystemData/'+data.name+"/"+data.dbtype+'/'+mClass+'/'+data.name)
    }
    const source=()=>{
        HttpService.post('/reportServer/DBConnection/ListAll',{}).then(res=>{
            setdata(res)
        })
    }
    const DOS=(id)=>{
        HttpService.post('/reportServer/FlexValue/getFlexValuesTree',JSON.stringify({FLEX_VALUE_SET_ID:id})).then(res=>{
            if(res.resultCode==="1000"){
                if(id==='3'){
                    setBdtype(res.data)
                }
               if(id==='2'){
                    setlist(res.data)
               }
            }
            // setdata(res)
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
                        title="DOS"
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
                          <List
                                grid={{
                                gutter: 16,
                                xs: 1,
                                sm:1,
                                md:2,
                                lg:3,
                                xl:3
                                }}
                                dataSource={bdtype}
                                renderItem={item => (
                                <List.Item>
                                    <Card 
                                        className={STYLE.odsbackground}
                                        onClick={()=>{
                                            pushs(item,"dbsourec")
                                        }}
                                        headStyle={{
                                            color: '#fff',
                                            fontSize: '14px',
                                            height:"20px",
                                            border:"none"
                                        }}
                                        bodyStyle={{
                                            color: '#fff',
                                            paddingTop:"0px"
                                        }}
                                        hoverable 
                                         title={item.name}>
                                        <Row justify="space-between">
                                            <Col>行数</Col>
                                            <Col>（10）</Col>
                                        </Row>
                                        <Row justify="space-between">
                                            <Col>列数</Col>
                                            <Col>（10）</Col>
                                        </Row>
                                    </Card>
                                </List.Item>
                                )}
                            />
                    </Card>
                </Col>
                <Col 
                    sm={8}
                >   
                        <List
                            size="small"
                            header={<Row justify="space-between">
                                <Col
                                    style={{
                                        color: 'rgb(205, 127, 50)',
                                        fontSize: '14px',
                                    }}
                                >DW</Col>
                                <Col style={{
                                    color:"#1890ff"
                                }}>数量</Col>
                            </Row>}
                            bordered
                            dataSource={list}
                            renderItem={item => (
                                <List.Item    className={[STYLE.row].join('')}>
                                    <Row justify="space-between"
                                        onClick={()=>{
                                            pushs(item,"dbtype")
                                        }}
                                    style={{
                                        width:"100%"
                                    }}
                                        >
                                        <Col className={STYLE.col1}>
                                            {item.name}
                                        </Col>
                                        <Col   className={STYLE.col2}>10</Col>
                                    </Row>
                                </List.Item>
                            )}
                            />
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
                                className={STYLE.source}
                                size="small"
                                onClick={()=>{
                                    pushs(item,'sourec')
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
                                            {/* <Avatar  src={url+"/report/"+item.icon} alt=""/> */}
                                            <Avatar  src={require('./img/tx.jpg')} alt=""/>
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
                                        <Statistic   valueStyle={{ color: '#fff' ,textAlign:"left"}} title={<h3 style={{color:"#fff",textAlign:"left",fontSize:"16px"}}>行数</h3>} value={28}/>
                                    </Col>
                                    <Col span={12}>
                                        <Statistic   valueStyle={{ color: '#fff' ,textAlign:"right"}}  title={<h3 style={{color:"#fff",textAlign:"right",fontSize:"16px"}}>列数</h3>}  value={23} />
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