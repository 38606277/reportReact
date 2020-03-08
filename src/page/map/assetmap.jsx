import React, { Component } from 'react';
import { Card } from 'antd';
import BMap from 'BMap';
// import BMapLib from 'BMapLib';


class assetmap extends Component {
    render() {
        return (
            <div className="address" id="mapContainer" style={{ height: '500px', width: '100%' }}>
                <Card>
                    <div>sdfkj</div>
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <div>共2辆车</div>
                    <div id="mapContainer" style={{ height: 900 }}></div>
                </Card>
            </div>
        )
    }



    componentDidMount() {
        // var map = new BMap.Map("mapContainer"); // 创建Map实例
        // map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
        // map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
        // map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
        // map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放


        var map = new BMap.Map("mapContainer");
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 5);
        map.enableScrollWheelZoom();
    
    
        var MAX = 10;
        var markers = [];
        var pt = null;
        var i = 0;
        for (; i < MAX; i++) {
           pt = new BMap.Point(Math.random() * 40 + 85, Math.random() * 30 + 21);
           markers.push(new BMap.Marker(pt));
        }
        //最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。
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
       
      

        // var data_info = [[116.417854, 39.921988, "地址：北京市东城区王府井大街88号乐天银泰百货八层"],
        // [116.406605, 39.921585, "地址：北京市东城区东华门大街"],
        // [116.412222, 39.912345, "地址：北京市东城区正义路甲5号"],
        // [116.412222, 40.922677, "地址：kjkljkjkj"]
        // ];
        // var opts = {
        //     width: 250,     // 信息窗口宽度
        //     height: 80,     // 信息窗口高度
        //     title: "信息窗口", // 信息窗口标题
        //     enableMessage: true//设置允许信息窗发送短息
        // };
        // for (var i = 0; i < data_info.length; i++) {
        //     var marker = new BMap.Marker(new BMap.Point(data_info[i][0], data_info[i][1]));  // 创建标注
        //     var content = data_info[i][2];
        //     map.addOverlay(marker);               // 将标注添加到地图中
        //     addClickHandler(content, marker);
        // }
        // function addClickHandler(content,marker){
        //     marker.addEventListener("click",function(e){
        //         openInfo(content,e)}
        //     );
        // }
        // function openInfo(content,e){
        //     var p = e.target;
        //     var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
        //     var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象 
        //     map.openInfoWindow(infoWindow,point); //开启信息窗口
        // }


        

    }
}
export default assetmap;