
import React from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Table, Input, message, Divider, Pagination, Row, Col, Button, Card } from 'antd';
import 'antd/dist/antd.css';
import LocalStorge from '../../util/LogcalStorge.jsx';
const localStorge = new LocalStorge();
import HttpService from '../../util/HttpService.jsx';
import Script from 'react-load-script';

import './css/index.css';
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';
// import 'echarts/map/js/province/hebei.js';



const RingProgress_config = {
    width: 100,
    height: 100,
    percent: 0.8,
    color: ['#30BF78', '#E8EDF3'],
};

function fmoney(s, n) {
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1];
    var t = "";
    for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
}

function numFormat(num) {
    if (num >= 10000) {
        num = fmoney(Math.abs(num / 1000) / 10, 2) + '万';
    } else if (num >= 1000) {
        num = fmoney(Math.abs(num / 100) / 10, 2) + '千';
    } else {
        num = fmoney(num, 2) + '元';
    }

    return num;
}
export default class dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 1,
            perPage: 10,
            dataList: [],
            selectedRows: [],
            selectedRowKeys: [],
            selected: true,
            llongitude: null,
            latitude: null,
            asset_num: 0,
            assetCost: 0,
            baseStationNum: 0,
            assetNumber: 0,
            normal_num: 0,
            abnormal_num: 0,
            gatewayNumber: 0,
            assetAlarmNumber: 0,
            pendAssetAlarmNumber: 0,
            typeName: [],
            typeNum: [],
            alarm_data: [],
            twog: '',
            threeg: '',
            fourg: '',
            assetCJCost: '',
            assetTotal: '',
            assetLocal: '',

        };
    }
    componentDidMount() {

        echarts.registerMap("河北", require('./../../asset/河北省.json'));

        // window.collapsedToggle(true);
        //查询资产总数
        // from='';
        HttpService.post("reportServer/assetquery/getAssetNum", JSON.stringify({}))
            .then(res => {
                if (res.resultCode == "1000") {
                    this.setState({
                        asset_num: res.data.asset_num,
                        normal_num: res.data.normal_num,
                        abnormal_num: res.data.abnormal_num,
                        baseStationNum: res.data.baseStationNum,
                        assetCost: numFormat(res.data.assetCost == null ? 0 : res.data.assetCost),
                        assetNumber: res.data.assetNumber
                    })
                } else {
                    message.error(res.message);
                }

            });

        //    //查询基站总数
        //    HttpService.post("reportServer/assetquery/getBaseStationNum", JSON.stringify({}))
        //    .then(res => {
        //        if (res.resultCode == "1000") {
        //            this.setState({
        //             baseStationNum: res.data,
        //            });
        //        } else {
        //            message.error(res.message);
        //        }


        //    });


        //查询资产上线按城市
        HttpService.post("reportServer/assetquery/getAssetNumByCity", JSON.stringify({}))
            .then(res => {
                if (res.resultCode == "1000") {
                    this.setState({ city_data: res.data })
                } else {
                    message.error(res.message);
                }

            });
        //查询资产预警信息
        HttpService.post("reportServer/assetquery/getAssetAlarm", JSON.stringify({}))
            .then(res => {
                if (res.resultCode == "1000") {
                    this.setState({ alarm_data: res.data })
                } else {
                    message.error(res.message);
                }
            });

        //查询资产异常信息
        HttpService.post("reportServer/assetquery/getAssetAlarmNum", JSON.stringify({}))
            .then(res => {
                if (res.resultCode == "1000") {
                    this.setState({
                        gatewayNumber: res.data.gatewayNumber,
                        assetAlarmNumber: res.data.assetAlarmNumber,
                        pendAssetAlarmNumber: res.data.pendAssetAlarmNumber
                    })
                }
                else
                    message.error(res.message);

            });
        //查询资产异常信息
        HttpService.post("reportServer/assetquery/getAssetTypeNum", JSON.stringify({}))
            .then(res => {
                if (res.resultCode == "1000") {
                    this.setState({
                        typeName: res.data.typeName.split(","),
                        typeNum: res.data.typeNum.split(",")
                    });
                } else {
                    message.error(res.message);
                }
            });

        //查询资产异常信息
        HttpService.post("reportServer/assetquery/getAssetJZType", JSON.stringify({}))
            .then(res => {
                if (res.resultCode == "1000") {
                    this.setState({
                        twog: res.data[0].total,
                        threeg: res.data[1].total,
                        fourg: res.data[2].total
                    });
                } else {
                    message.error(res.message);
                }
            });
        //查询资产分布信息
        HttpService.post("reportServer/assetquery/getAssetFB", JSON.stringify({}))
            .then(res => {
                if (res.resultCode == "1000") {
                    this.setState({
                        assetCJCost: res.data.cost.split(","),
                        assetTotal: res.data.total.split(","),
                        assetLocal: res.data.cj.split(",")
                    });
                } else {
                    message.error(res.message);
                }
            });

    };
    getGugarOption = () => {
        var option = {
            series: [
                {
                    type: 'pie',
                    radius: ['130%', '150%'],  // 放大图形
                    center: ['50%', '80%'],    // 往下移动  套住75%文字
                    label: {
                        show: false,
                    },
                    startAngle: 180,
                    hoverOffset: 0,  // 鼠标经过不变大
                    data: [
                        {
                            value: 100,
                            itemStyle: { // 颜色渐变#00c9e0->#005fc1
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [
                                        { offset: 0, color: '#00c9e0' },
                                        { offset: 1, color: '#005fc1' }
                                    ]
                                }
                            }
                        },
                        { value: 100, itemStyle: { color: '#12274d' } }, // 颜色#12274d

                        { value: 200, itemStyle: { color: 'transparent' } }// 透明隐藏第三块区域
                    ]
                }
            ]
        };
        return option;
    };

    gethbmapOption1 = () => {
        var option = {
            title: {
                text: '',
                subtext: '',
                left: 'center'
            },
            series: [
                {
                    name: 'iphone3',
                    type: 'map',
                    mapType: '河北',
                    roam: false,
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data: []
                }
            ]
        };
        return option;
    }

    getMapOption = () => {
        var option = {
            visualMap: {
                show: false,
                min: 0,
                max: 50,
                left: 'left',
                top: 'bottom',
                // text: ['高', '低'], // 文本，默认为数值文本
                calculable: true,
                inRange: {
                    color: ['#142957']
                }
            },
            series: [{
                type: 'map',
                zoom: 1.2,
                mapType: '河北',
                roam: true,
                label: {
                    normal: {
                        show: true,
                        color: '#A6C84C',
                        areaColor: '#142957',
                        borderColor: '#0692a4',
                        formatter: '{b}\n{c}',
                    },
                    emphasis: {
                        textStyle: {
                            color: '#000'
                        }
                    }
                },
                itemStyle: {

                    normal: {
                        borderColor: '#389BB7',
                        areaColor: 'white',
                        color: '#080A20'
                    },
                    emphasis: {
                        areaColor: '#389BB7',
                        borderWidth: 0
                    }
                },
                animation: true,
                data: this.state.city_data,
                animationDurationUpdate: 1000,
                animationEasingUpdate: 'quinticInOut'
            }],
            // 值域选择，每个图表最多仅有一个值域控件

        };
        return option;
    }


    getOption = () => {
        let option = {

            tooltip: {
                trigger: 'item',
                formatter: '{b} <br/> {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 'right',
                textStyle: {//图例文字的样式
                    color: '#ccc',
                    fontSize: 16
                },
                data: ['2G', '3G', '4G', '5G']
            },
            color: ['#f6da22', '#bbe2e8', '#6cacde'],
            series: [
                {
                    // 图表名称
                    name: '基站',
                    // 图表类型
                    type: 'pie',
                    // 南丁格尔玫瑰图 有两个圆  内圆半径10%  外圆半径70%
                    // 百分比基于  图表DOM容器的半径
                    radius: '50%',
                    // 图表中心位置 left 50%  top 50% 距离图表DOM容器
                    center: ['50%', '50%'],
                    // 半径模式，另外一种是 area 面积模式
                    //roseType: 'radius',
                    // 数据集 value 数据的值 name 数据的名称
                    data: [
                        { value: this.state.twog, name: '2G' },
                        { value: this.state.threeg, name: '3G' },
                        { value: this.state.fourg, name: '4G' }
                    ],
                    //文字调整
                    label: {
                        fontSize: 10
                    },
                    //引导线
                    labelLine: {
                        length: 8,
                        length2: 10
                    }
                }
            ]
        };

        // let option = {
        //     // 控制提示
        //     tooltip: {
        //         // 非轴图形，使用item的意思是放到数据对应图形上触发提示
        //         trigger: 'item',
        //         // 格式化提示内容：
        //         // a 代表图表名称 b 代表数据名称 c 代表数据  d代表  当前数据/总数据的比例
        //         formatter: "{a} <br/>{b} : {c} ({d}%)"
        //     },
        //     // 控制图表
        //     series: [
        //         {
        //             // 图表名称
        //             name: '地区',
        //             // 图表类型
        //             type: 'pie',
        //             // 南丁格尔玫瑰图 有两个圆  内圆半径10%  外圆半径70%
        //             // 百分比基于  图表DOM容器的半径
        //             radius: ['10%', '70%'],
        //             // 图表中心位置 left 50%  top 50% 距离图表DOM容器
        //             center: ['50%', '50%'],
        //             // 半径模式，另外一种是 area 面积模式
        //             roseType: 'radius',
        //             // 数据集 value 数据的值 name 数据的名称
        //             data: this.state.city_data,
        //             //文字调整
        //             label: {
        //                 fontSize: 10
        //             },
        //             //引导线
        //             labelLine: {
        //                 length: 8,
        //                 length2: 10
        //             }
        //         }
        //     ],
        //     color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff']
        // };
        return option;

    };
    // getLineOption = () => {
    //     var option = {
    //         // 给echarts图设置背景色
    //         //backgroundColor: '#FBFBFB',  // -----------> // 给echarts图设置背景色
    //         color: ['#7FFF00'],
    //         tooltip: {
    //             trigger: 'axis'
    //         },

    //         grid: {
    //             x: 40,
    //             y: 30,
    //             x2: 5,
    //             y2: 20

    //         },
    //         calculable: true,


    //         xAxis: [{
    //             type: 'category',
    //             data: ['1月', '2月', '3月', '4月', '5月'],
    //             axisLabel: {
    //                 color: "#7FFF00" //刻度线标签颜色
    //             }
    //         }],
    //         yAxis: [{

    //             type: 'value',
    //             axisLabel: {
    //                 color: "#7FFF00" //刻度线标签颜色
    //             }
    //         }],
    //         series: [{
    //             name: '人次',
    //             type: 'line',
    //             data: [800, 300, 500, 800, 300, 600],

    //         }]
    //     };


    //     return option;
    // }

    getOption2 = () => {
        var item = {
            name: '',
            value: 1200,
            // 柱子颜色
            itemStyle: {
                color: '#254065'
            },
            // 鼠标经过柱子颜色
            emphasis: {
                itemStyle: {
                    color: '#254065'
                }
            },
            // 工具提示隐藏
            tooltip: {
                extraCssText: 'opacity:0'
            }
        };

        let option = {
            // 工具提示
            tooltip: {
                // 触发类型  经过轴触发axis  经过轴触发item
                trigger: 'item',
                // 轴触发提示才有效
                axisPointer: {
                    // 默认为直线，可选为：'line' 线效果 | 'shadow' 阴影效果       
                    type: 'shadow'
                }
            },
            // 图表边界控制
            grid: {
                // 距离 上右下左 的距离
                left: '0',
                right: '3%',
                bottom: '3%',
                top: '5%',
                // 大小是否包含文本【类似于boxsizing】
                containLabel: true,
                //显示边框
                show: true,
                //边框颜色
                borderColor: 'rgba(0, 240, 255, 0.3)'
            },
            // 控制x轴
            xAxis: [
                {
                    // 使用类目，必须有data属性
                    type: 'category',
                    // 使用 data 中的数据设为刻度文字
                    data: this.state.typeName,
                    // 刻度设置
                    axisTick: {
                        // true意思：图形在刻度中间
                        // false意思：图形在刻度之间
                        alignWithLabel: false,
                        show: false
                    },
                    //文字
                    axisLabel: {
                        color: '#4c9bfd',
                        // interval:0,
                        // rotate:50,
                        formatter: function (value) {
                            return value.split("").join("\n")
                        }
                    }
                }
            ],
            // 控制y轴
            yAxis: [
                {
                    // 使用数据的值设为刻度文字
                    type: 'value',
                    axisTick: {
                        // true意思：图形在刻度中间
                        // false意思：图形在刻度之间
                        alignWithLabel: false,
                        show: false
                    },
                    //文字
                    axisLabel: {
                        color: '#4c9bfd'
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(0, 240, 255, 0.3)'
                        }
                    },
                }
            ],
            // 控制x轴
            series: [
                {
                    // series配置
                    // 颜色
                    itemStyle: {
                        // 提供的工具函数生成渐变颜色
                        color: new echarts.graphic.LinearGradient(
                            // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                            0, 0, 0, 1,
                            [
                                { offset: 0, color: '#00fffb' }, // 0 起始颜色
                                { offset: 1, color: '#0061ce' }  // 1 结束颜色
                            ]
                        )
                    },
                    // 图表数据名称
                    name: '用户统计',
                    // 图表类型
                    type: 'bar',
                    // 柱子宽度
                    barWidth: '60%',
                    // 数据
                    data: this.state.typeNum
                }
            ]
        };
        return option;
    }

    getBarOption = () => {
        let option = {
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
            },
            series: [
                {
                    name: '2011年',
                    type: 'bar',
                    data: [18203, 23489, 29034, 104970, 131744, 630230]
                }
            ]
        };
        return option;
    }
    getLineOption = () => {
        var option = {
            //鼠标提示工具
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                // 类目类型                                  
                type: 'category',
                // x轴刻度文字                                  
                data: this.state.assetLocal,
                axisTick: {
                    show: false//去除刻度线
                },
                axisLabel: {
                    color: '#4c9bfd'//文本颜色
                },
                axisLine: {
                    show: false//去除轴线  
                },
                boundaryGap: true//去除轴内间距
            },
            yAxis: {
                // 数据作为刻度文字                                  
                type: 'value',
                axisTick: {
                    show: false//去除刻度线
                },
                axisLabel: {
                    color: '#4c9bfd'//文本颜色
                },
                axisLine: {
                    show: false//去除轴线  
                },
                boundaryGap: true//去除轴内间距
            },
            //图例组件
            legend: {
                textStyle: {
                    color: '#4c9bfd' // 图例文字颜色

                },
                right: '10%'//距离右边10%
            },
            // 设置网格样式
            grid: {
                show: true,// 显示边框
                top: '20%',
                left: '3%',
                right: '4%',
                bottom: '3%',
                borderColor: '#012f4a',// 边框颜色
                containLabel: true // 包含刻度文字在内
            },
            series: [{
                name: '资产原值(万元)',
                // 数据                                  
                data: this.state.assetCJCost,
                // 图表类型                                  
                type: 'line',
                // 圆滑连接                                  
                smooth: true,
                itemStyle: {
                    color: '#00f2f1'  // 线颜色
                }
            },
            {
                name: '资产条数',
                // 数据                                  
                data: this.state.assetTotal,
                // 图表类型                                  
                type: 'bar',
                // 圆滑连接                                  
                // smooth: true,
                barWidth: '20px',
                itemStyle: {
                    color: '#ed3f35'  // 线颜色
                }
            }]
        };
        return option;
    }

    onMapClick = {
        'click': this.clickEchartsPie.bind(this)
    }
    async clickEchartsPie(e) {
        //查询城市的经纬度
        await HttpService.post("reportServer/area/getPostionByCityName", JSON.stringify({ city_name: e.name }))
            .then(res => {
                if (res.resultCode == "1000") {
                    this.setState({ latitude: res.data.latitude, longitude: res.data.longitude })
                }
                else
                    message.error(res.message);

            });
        window.location.href = "#/asset/assetmapGaoDe/" + this.state.longitude + "/" + this.state.latitude;
    }

    render() {
        return (
            <div class="viewport" >
                <Script url="../../../public/carrotsearch.foamtree.js" />
                <div class="column1">
                    <div class="allasset panel">
                        <h3>数据采集管理平台</h3>
                        <div>
                            <div class="content">
                                <div class="item">
                                    <h4> <a href="#/asset/assetInventory">{this.state.baseStationNum}</a></h4>
                                    <span>数据采集量</span>
                                </div>
                                <div class="item">
                                    <h4><a href="#/asset/assetInventory">{this.state.assetCost}</a></h4>
                                    <span>
                                        <i class="icon-dot" style={{ color: '#6acca3' }}></i>
                                        数据采集模板
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="abnormal panel" style={{ marginTop: '20px' }} >
                            <h3>流式数据采集</h3>
                            <div>
                                <div class="content">
                                    <div class="item">
                                        <h4> <a href="#/asset/assetInventory">{this.state.gatewayNumber}</a></h4>
                                        <span>流式数据采集</span>
                                    </div>
                                    <div class="item">
                                        <h4><a href="#/asset/assetInventory">{this.state.assetAlarmNumber}</a></h4>
                                        <span>
                                            <i class="icon-dot" style={{ color: '#6acca3' }}></i>
                                        异常资产条数
                                    </span>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                        <div class="abnormal panel" style={{height:'10rem'}} >
                            <h3>离线数据采集</h3>
                            <div>
                                <div class="content">
                                    <div class="item">
                                        <h4> <a href="#/asset/assetInventory">{this.state.gatewayNumber}</a></h4>
                                        <span>数据采集</span>
                                    </div>
                                    <div class="item">
                                        <h4><a href="#/asset/assetInventory">{this.state.assetAlarmNumber}</a></h4>
                                        <span>
                                            <i class="icon-dot" style={{ color: '#6acca3' }}></i>
                                        异常资产条数
                                    </span>
                                    </div>
                                  
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="column2" style={{ marginTop: '80px' }}>
                    <div class="map">
                        <h3>
                            <span class="icon-cube"></span>
                            资产数据统计
                        </h3>
                        <div class="ods panel" style={{height:'10rem'}} >
                            <h3>离线数据采集</h3>
                            <div>
                                <div class="content">
                                    <div class="item">
                                        <h4> <a href="#/asset/assetInventory">{this.state.gatewayNumber}</a></h4>
                                        <span>数据采集</span>
                                    </div>
                                    <div class="item">
                                        <h4><a href="#/asset/assetInventory">{this.state.assetAlarmNumber}</a></h4>
                                        <span>
                                            <i class="icon-dot" style={{ color: '#6acca3' }}></i>
                                        异常资产条数
                                    </span>
                                    </div>
                                  
                                </div>
                            </div>
                        </div>

                        <div class="dw panel" style={{height:'10rem'}} >
                            <h3>离线数据采集</h3>
                            <div>
                                <div class="content">
                                    <div class="item">
                                        <h4> <a href="#/asset/assetInventory">{this.state.gatewayNumber}</a></h4>
                                        <span>数据采集</span>
                                    </div>
                                    <div class="item">
                                        <h4><a href="#/asset/assetInventory">{this.state.assetAlarmNumber}</a></h4>
                                        <span>
                                            <i class="icon-dot" style={{ color: '#6acca3' }}></i>
                                        异常资产条数
                                    </span>
                                    </div>
                                  
                                </div>
                            </div>
                        </div>

                   

                        <div class="chart">
                            {/* <ReactEcharts
                                style={{ float: 'right', width: '100%', height: '350px' }}
                                option={this.getMapOption()}
                                onEvents={this.onMapClick} />*/}


                        </div>
                    </div>
                    <div class="panel">
                        <div><h3>基站网络类型统计</h3></div>
                        <div class="chart">
                            <ReactEcharts style={{ width: '400px', height: '200px' }} option={this.getOption()} />
                            {/* <div class="data">
                                    <div class="item">
                                        <h4>120,899</h4>
                                        <span>
                                            <i class="icon-dot" style={{ color: '#ed3f35' }}></i>
                                    用户总量
                                </span>
                                    </div>
                                    <div class="item">
                                        <h4>248</h4>
                                        <span>
                                            <i class="icon-dot" style={{ color: '#eacf19' }}></i>
                                    本月新增
                                </span>
                                    </div>
                                </div> */}
                        </div>
                    </div>
                </div>
                <div class="column3">
                    <div class="allasset panel">
                        <h3>数据采集管理平台</h3>
                        <div>
                            <div class="content">
                                <div class="item">
                                    <h4> <a href="#/asset/assetInventory">{this.state.baseStationNum}</a></h4>
                                    <span>数据采集量</span>
                                </div>
                                <div class="item">
                                    <h4><a href="#/asset/assetInventory">{this.state.assetCost}</a></h4>
                                    <span>
                                        <i class="icon-dot" style={{ color: '#6acca3' }}></i>
                                        数据采集模板
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="abnormal panel" style={{ marginTop: '20px' }} >
                            <h3>流式数据采集</h3>
                            <div>
                                <div class="content">
                                    <div class="item">
                                        <h4> <a href="#/asset/assetInventory">{this.state.gatewayNumber}</a></h4>
                                        <span>流式数据采集</span>
                                    </div>
                                    <div class="item">
                                        <h4><a href="#/asset/assetInventory">{this.state.assetAlarmNumber}</a></h4>
                                        <span>
                                            <i class="icon-dot" style={{ color: '#6acca3' }}></i>
                                        异常资产条数
                                    </span>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                        <div class="abnormal panel" style={{height:'10rem'}} >
                            <h3>离线数据采集</h3>
                            <div>
                                <div class="content">
                                    <div class="item">
                                        <h4> <a href="#/asset/assetInventory">{this.state.gatewayNumber}</a></h4>
                                        <span>数据采集</span>
                                    </div>
                                    <div class="item">
                                        <h4><a href="#/asset/assetInventory">{this.state.assetAlarmNumber}</a></h4>
                                        <span>
                                            <i class="icon-dot" style={{ color: '#6acca3' }}></i>
                                        异常资产条数
                                    </span>
                                    </div>
                                  
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                
               </div>


        );
    }
}
