import React, { Component } from 'react';
import {
    BankOutlined,
    PushpinOutlined,
    SearchOutlined,
    SettingOutlined,
    TagOutlined,
    ThunderboltOutlined,
} from '@ant-design/icons';
import { Card, Row, Col, Skeleton, Avatar, Input, Button } from 'antd';
import { List, Typography } from 'antd';
import BMap from 'BMap';
// import BMapLib from 'BMapLib';
import './assetmap.css';
import gg from './../../asset/gg.png';
import bikepng from '../../asset/bike.jpg'


const data = [
    '路由器-华为.',
    '电源UPS',
    '电脑',
    '网元',
    '机柜',
];


const url = window.getServerUrl();

class assetmap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            panelDisplay: 'none',
            address: '北京市东城区景山前街4号',
            addressImg: 'report/upload/20190320/165211/jz1.jpg',
            assets: [
                { name: '打印机' },
                { name: '路由器' }
            ],
            collapsed: false,
        }
    }

    componentDidMount() {

        this.init1();


    }

    getAddr = (content, e) => {
        if (this.state.panelDisplay == 'none') {
            this.setState(
                {
                    panelDisplay: 'block',
                }
            )
        }
        var p = e.target;
        // alert(content + p.getPosition().lng + '-' + p.getPosition().lat);
        this.setState({

            address: content.address,
            addressImg: content.addressImg,
            assets: content.assets
        })

    }
    togglePanel = () => {
        if (this.state.panelDisplay != 'none') {
            this.setState(
                {
                    panelDisplay: 'none',
                }
            )
        } else {
            this.setState(
                {
                    panelDisplay: 'block',
                }
            )

        }
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        }, function () {
            this.props.callbackParent(this.state.collapsed);
        });

    }



    render() {
        return (
            <div className="address" style={{ height: '800px', width: '100%' }}>



                <Card bodyStyle={{ padding: '0px' }} style={{ float: "left", width: "100%", padding: '0px' }}>
                    <div id="mapContainer" style={{ height: '650px' }}></div>
                </Card>
                <Card
                    bodyStyle={{ padding: '0px', fontSize: '12px' }}
                    headStyle={{ textAlign: 'center', backgroundColor: '#3385FF', color: '#FFF' }}
                    style={{ fontSize: '12px', position: "absolute", top: "10px", left: "10px", padding: '0px', width: "280px" }}>

                    <Row>
                        <Col span={24}>
                            <Input addonAfter={
                                <span>
                                    <Button  style={{width:'40px',border:'0px', borderRadius:'0px'}}  onClick={this.togglePanel} icon={<ThunderboltOutlined />} />
                                    <Button  type="primary" style={{width:'40px',border:'0px', borderRadius:'0px'}}  icon={<SearchOutlined />} />
                                </span>
                            }></Input>
                        </Col>
                    </Row>
                    <Card style={{ display: this.state.panelDisplay }} bodyStyle={{ padding: '5px', fontSize: '12px' }} >
                        <Row>
                            <Col span={24}><img src={url + this.state.addressImg} style={{ height: '100px', width: '100%' }} /></Col>
                        </Row>
                        <Row style={{ height: '40px', marginTop: '10px', marginLeft: '10px' }}>
                            <Col span={24} ><BankOutlined style={{ marginRight: '8px' }} />{this.state.address}</Col>
                        </Row>
                        <Row style={{ height: '40px', marginLeft: '30px', color: '#0e89f5' }}>
                            <Col span={8}><SettingOutlined style={{ marginRight: '8px' }} />详细</Col>
                            <Col span={8}><TagOutlined style={{ marginRight: '8px' }} />分离</Col>
                            <Col span={8}><PushpinOutlined style={{ marginRight: '8px' }} />新增</Col>
                        </Row>

                        <List

                            bodyStyle={{ padding: '5px', fontSize: '14px' }}
                            style={{ padding: '5px' }}
                            dataSource={this.state.assets}
                            renderItem={item => (
                                <List.Item

                                    actions={[]}
                                >
                                    <List.Item.Meta style={{ fontSize: '12px' }}
                                        avatar={
                                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                        }
                                        title={<a href="">{item.name}</a>}
                                        description="HP激光打印机"
                                    />

                                </List.Item>


                            )}
                        />
                    </Card>
                </Card>

            </div>
        );
    }

    init() {
        //创建一个地图对象 l-map 是你要放地图的div
        var map = new BMap.Map("l-map");//114.025973657,22.5460535462
        //中心地点 和放大的比例   以这个坐标为中心显示一个多大的地图
        var poi = new BMap.Point(114.025973657, 22.5460535462);
        map.centerAndZoom(poi, 16);
        map.enableScrollWheelZoom();
        //显示缩放小控件
        map.addControl(new BMap.NavigationControl());
        map.addControl(new BMap.ScaleControl());
        map.addControl(new BMap.OverviewMapControl());
        map.addControl(new BMap.MapTypeControl());
        map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
        map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
        //定义marker上面弹出的信息窗口
        var opts = {
            width: 500,     // 信息窗口宽度
            height: 300,     // 信息窗口高度
            title: "信息窗口", // 信息窗口标题
            enableMessage: true//设置允许信息窗发送短息
        };
        //定义信息窗口里面要显示的内容
        var content = "<div>"
        content += " <p>深圳市和平饭店</p><p>地址：深南大道</p><p>营业时间：24小时营业</p><br>"
        content += "<p>深圳市和平饭店</p><p>地址：深南大道</p><p>营业时间：24小时营业</p>"
        content += "<p><a href=''>西式</a><a href=''>中式</a><a href=''>特色</a><a href=''>更多</a></p>";
        content += "</div>";
        function markAddress(data_info) {
            var marker = new BMap.Marker(new BMap.Point(data_info[0], data_info[1]));  // 创建标注
            // 将定位的地点在地图上面标注出来
            map.addOverlay(marker);

            //监听marker点击后 弹出信息框
            marker.addEventListener("click", function (e) {
                openInfo(content, data_info[0], data_info[1]);
            });
            //标注后直接弹出信息框
            openInfo(content, data_info[0], data_info[1]);
        }

        function openInfo(content, longitude, latitude) {
            var point = new BMap.Point(longitude, latitude);
            var infoWindow = new BMap.InfoWindow(content, opts);  // 创建信息窗口对象
            map.openInfoWindow(infoWindow, point); //开启信息窗口
        }

    }


    init1 = () => {
        var map = new BMap.Map("mapContainer"); // 创建Map实例
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 15); // 初始化地图,设置中心点坐标和地图级别
        map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
        map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放



        // var map = new BMap.Map("mapContainer");
        // map.centerAndZoom(new BMap.Point(116.404, 39.915), 5);
        // map.enableScrollWheelZoom();


        // var MAX = 10;
        // var markers = [];
        // var pt = null;
        // var i = 0;
        // for (; i < MAX; i++) {
        //     pt = new BMap.Point(Math.random() * 40 + 85, Math.random() * 30 + 21);
        //     markers.push(new BMap.Marker(pt));
        // }
        // //最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。
        // var markerClusterer = new BMapLib.MarkerClusterer(map, {markers:markers});

        // var map = new BMap.Map("mapContainer");
        // var point = new BMap.Point(116.417854, 39.921988);
        // var marker = new BMap.Marker(point);  // 创建标注
        // map.addOverlay(marker);              // 将标注添加到地图中
        // map.centerAndZoom(point, 15);
        // var top_right_control = new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT });
        // var top_right_navigation = new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT });
        // //添加控件和比例尺
        // map.addControl(top_right_control);
        // map.addControl(top_right_navigation);
        // map.enableScrollWheelZoom(true);



        var data_info = [[116.407854, 39.921988, {
            address: '人民大会堂',
            addressImg: 'report/upload/20190320/165211/zj2.jpg',
            assets: [
                { name: '打印机1' },
                { name: '路由器2' },
                { name: '桌子印机1' },
                { name: '床路由器2' },
            ]
        }],
        [116.408854, 39.911988, {
            address: '国家博物馆',
            addressImg: 'report/upload/20190320/165211/jz1.jpg',
            assets: [
                { name: '路由器2' },
                { name: '桌子印机1' },
                { name: '床路由器2' },
            ]
        }],
        [116.417854, 39.901988, {
            address: '故宫博物院',
            addressImg: 'report/upload/20190320/165211/jz3.jpg',
            assets: [
                { name: '桌子印机1' },
                { name: '床路由器2' },
            ]
        }],
        [116.397854, 39.911988, {
            address: '王府井',
            addressImg: 'report/upload/20190320/165211/jz4.jpg',
            assets: [
                { name: '桌子印机1' },
                { name: '床路由器2' },
            ]
        }],
        [116.422666, 39.920414, {
            address: '前门',
            addressImg: 'report/upload/20190320/165211/jz5.jpg',
            assets: [
                { name: '桌子印机1' },
                { name: '床路由器2' },
            ]
        }]
        ];
        var opts = {
            width: 250,     // 信息窗口宽度
            height: 150,     // 信息窗口高度
            title: "信息窗口", // 信息窗口标题
            enableMessage: true//设置允许信息窗发送短息
        };


        // 添加地图中的自行车
        let bikeIcon = new window.BMap.Icon(require("./../../asset/map.png"), new window.BMap.Size(25, 35), {
            imageSize: new window.BMap.Size(25, 35),
            anchor: new window.BMap.Size(18, 35)
        });


        for (var i = 0; i < data_info.length; i++) {
            var marker = new BMap.Marker(new BMap.Point(data_info[i][0], data_info[i][1]), { icon: bikeIcon });  // 创建标注
            var content = data_info[i][2];
            map.addOverlay(marker);               // 将标注添加到地图中
            addClickHandler(this, content, marker);
            //marker.addEventListener("click",addClickHandler);
        }


        function addClickHandler(that, content, marker) {
            marker.addEventListener("click", function (e) {
                that.getAddr(content, e);
            }
            );
        }
        // function openInfo(content, e) {
        //     var p = e.target;
        //     var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
        //     alert(content);
        //     getAddr();
        // var infoBox = new BMapLib.InfoBox(map, "百度地图api", {
        //     boxStyle: { background: "url('tipbox.gif') no-repeat  center top", width: "200px" }, closeIconMargin: "10px 2px 0 0", enableAutoPan: true
        //     , alignBottom: false
        // });
        // var infoWindow = new BMap.InfoWindow(content, opts);  // 创建信息窗口对象 
        // map.openInfoWindow(infoWindow, point); //开启信息窗口
        // }


    }


}
export default assetmap;