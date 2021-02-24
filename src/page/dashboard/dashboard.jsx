
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

export default ()=> {
        return (
            <div class="viewport" >
                {/* 左侧部分 */}
                <div class="column1">
                    <div class="allasset panel">
                        <h3 style={{color:"#CD7F32"}}>数据采集管理平台</h3>
                        <div>
                            <div class="content">
                                <div class="item">
                                    <h4> <a href="#/asset/assetInventory">{0}</a></h4>
                                    <span>数据采集量</span>
                                </div>
                                <div class="item">
                                    <h4><a href="#/asset/assetInventory">{0}</a></h4>
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
                                        <h4> <a href="#/asset/assetInventory">{0}</a></h4>
                                        <span>流式数据采集</span>
                                    </div>
                                    <div class="item">
                                        <h4><a href="#/asset/assetInventory">{0}</a></h4>
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
                                        <h4> <a href="#/asset/assetInventory">{0}</a></h4>
                                        <span>数据采集</span>
                                    </div>
                                    <div class="item">
                                        <h4><a href="#/asset/assetInventory">{0}</a></h4>
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
                {/* 中间部分 */}
                <div class="column2" style={{ marginTop: '90px' }}>
                    <div class="Hcenter">
                        <div class="hdata">
                            <div class='hdata_left panel'>
                                <h3 style={{color:"#CD7F32",textAlign:"left",fontSize:"14px"}}>数据</h3>
                                <div>
                                    <div class="content panel">
                                        <div class="item">
                                            <h4>{0}</h4>
                                            <span>数据名称</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="content panel">
                                        <div class="item">
                                            <h4>{0}</h4>
                                            <span>数据名称</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{flex:"1"}}></div>
                            <div class='hdata_right panel'>
                                <h3 style={{color:"#CD7F32",textAlign:"left",fontSize:"14px"}}>数据</h3>
                                <div>
                                    <div class="content panel">
                                        <div class="item">
                                            <h4>{0}</h4>
                                            <span>数据名称</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="panel">
                            
                        </div>
                    </div>
                </div>
                {/* 右侧部分 */}
                <div class="column3">
                    <div class="allasset panel">
                        <h3 style={{color:"#CD7F32"}}>数据采集管理平台</h3>
                        <div>
                            <div class="content">
                                <div class="item">
                                    <h4> <a href="#/asset/assetInventory">{0}</a></h4>
                                    <span>数据采集量</span>
                                </div>
                                <div class="item">
                                    <h4><a href="#/asset/assetInventory">{0}</a></h4>
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
                                        <h4> <a href="#/asset/assetInventory">{0}</a></h4>
                                        <span>流式数据采集</span>
                                    </div>
                                    <div class="item">
                                        <h4><a href="#/asset/assetInventory">{0}</a></h4>
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
                                        <h4> <a href="#/asset/assetInventory">{0}</a></h4>
                                        <span>数据采集</span>
                                    </div>
                                    <div class="item">
                                        <h4><a href="#/asset/assetInventory">{0}</a></h4>
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
        )
}
