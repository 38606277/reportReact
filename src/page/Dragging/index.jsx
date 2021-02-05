import React,{useState,useEffect} from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";

import {
    BarChartOutlined,
    GlobalOutlined,
    LineChartOutlined,
    PieChartOutlined,
    ProfileOutlined,
  } from '@ant-design/icons';
  import ReactEcharts from 'echarts-for-react';
  import '@ant-design/compatible/assets/index.css';
  import "./DashboardCreator.scss";
  import { getBarChart,getLineChart,getPieChart } from "./chart.js";


const ResponsiveReactGridLayout = WidthProvider(Responsive);

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */

const  cols={ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }
const rowHeight=100

export default (props)=>{
    const [layouts,setlayouts]=useState(getFromLS||{})
    const [widgets,setwidgets]=useState([])
    const [add,setadd]=useState(0)
    const onRemoveItem =(i)=>{
        console.log(1)
        console.log(i)
        setwidgets([...widgets.filter((item,index) => index !=i)])
    }
    const getFromLS=(key) =>{
        let ls = {};
        if (global.localStorage) {
          try {
            ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
          } catch (e) {
            /*Ignore*/
          }
        }
        return ls[key];
      }
    const  createElement=(el)=> {
        const removeStyle = {
          position: "absolute",
          right: "2px",
          top: 0,
          cursor: "pointer"
        };
        const i = el.add ? "+" : el.i;
        return (
          <div key={i} data-grid={el}>
            {el.add ? (
              <span
                className="add text"
                onClick={onAddItem}
                title="You can add an item by clicking here, too."
              >
                Add +
              </span>
            ) : (
              <span className="text">{i}</span>
            )}
            <span
              className="remove"
              style={removeStyle}
              onClick={onRemoveItem(i)}
            >
              x
            </span>
          </div>
        );
      }
    const onAddItem =()=>{
        console.log(widgets)
        widgets.push({
            i: new Date().getTime().toString(),
            x: (widgets.length * 2)%12,
            y: Infinity, // puts it at the bottom
            w: 2,
            h: 2
        })
        setwidgets(widgets)
    }
    useEffect(()=>{

    },[widgets])
    return (
        <div>
            <div>{add}</div>
            <div onClick={()=>{
                onAddItem('line')
                let i=add+1
                setadd(i)
            }}>增加</div>
            <ResponsiveReactGridLayout
                className="layout"
                layouts={layouts}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            >

                {
                    widgets.map((item,index)=>{
                        const removeStyle = {
                            position: "absolute",
                            right: "2px",
                            top: 0,
                            cursor: "pointer",
                            zIndex:"999"
                          };
                        return (
                            <div key={index} className="text"> 
                                <h1>{index}</h1>
                            <span
                              className="remove"
                              style={removeStyle}
                              onClick={(e)=>{
                                  console.log(e)
                                // onRemoveItem(index)
                              }}
                            >
                              x
                            </span>
                          </div>
                        )
                    })
                }
                {/* {
                 _.map(widgets, (el) => {
                    return  createElement(el)
                    })
                } */}
            </ResponsiveReactGridLayout>
        </div>
    )
}