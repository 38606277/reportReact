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
const data = [
    {
      title: 'form',
    },
    {
      title: 'bb',
    },
    {
      title: 'hive',
    },
    {
      title: 'hbase',
    },
    {
      title: 'jlerp',
    },
    {
      title: 'saaa',
    },
    {
        title: 'lee',
      },
  ];
export default ()=>{
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
                                height:"30px",
                                border:"none"
                            }}
                            hoverable
                            title={
                                <Row align="middle">
                                    <Col>
                                        <img style={{height:"20px"}} src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1681145256,1460339721&fm=26&gp=0.jpg" alt=""/>
                                    </Col>
                                    <Col style={{
                                        marginLeft:"14px"
                                    }}>
                                        <h2
                                            style={{textAlign:"center",margin:"0px"}}
                                        >{item.title}
                                        </h2>
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
                          
                          <Row gutter={16}>
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