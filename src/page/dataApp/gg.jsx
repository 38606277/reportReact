import React, { useEffect, useState } from "react"
// import styles from "./index.module.less"
import G6 from "@antv/g6"
import { render } from "less";



export default class gg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
           
        };
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    
    //初始化加载调用方法
    componentDidMount() {
       this.renderG6();

    }
    
   

    
    render() {
      
        return (
            <div id="page-wrapper">

             
            </div>
        );
    }
}


renderG6=()=>{
    G6.registerNode('card-node', {
        draw: function drawShape(cfg, group) {
            const r = 2;
            const color = '#5B8FF9';
            const w = cfg.size[0];
            const h = cfg.size[1];
            const shape = group.addShape('rect', {
                attrs: {
                    x: -w / 2,
                    y: -h / 2,
                    width: w, //200,
                    height: h, // 60
                    stroke: color,
                    radius: r,
                    fill: '#fff',
                },
                name: 'main-box',
                draggable: true,
            });
    
            group.addShape('rect', {
                attrs: {
                    x: -w / 2,
                    y: -h / 2,
                    width: w, //200,
                    height: h / 2, // 60
                    fill: color,
                    radius: [r, r, 0, 0],
                },
                name: 'title-box',
                draggable: true,
            });
    
            // title text
            group.addShape('text', {
                attrs: {
                    textBaseline: 'top',
                    x: -w / 2 + 8,
                    y: -h / 2 + 2,
                    lineHeight: 20,
                    text: cfg.id,
                    fill: '#fff',
                },
                name: 'title',
            });
            cfg.children &&
                group.addShape('marker', {
                    attrs: {
                        x: w / 2,
                        y: 0,
                        r: 6,
                        cursor: 'pointer',
                        symbol: G6.Marker.collapse,
                        stroke: '#666',
                        lineWidth: 1,
                        fill: '#fff',
                    },
                    name: 'collapse-icon',
                });
            group.addShape('text', {
                attrs: {
                    textBaseline: 'top',
                    x: -w / 2 + 8,
                    y: -h / 2 + 24,
                    lineHeight: 20,
                    text: 'description',
                    fill: 'rgba(0,0,0, 1)',
                },
                name: `description`,
            });
            return shape;
        },
        setState(name, value, item) {
            if (name === 'collapsed') {
                const marker = item.get('group').find((ele) => ele.get('name') === 'collapse-icon');
                const icon = value ? G6.Marker.expand : G6.Marker.collapse;
                marker.attr('symbol', icon);
            }
        },
    });
    
    

}



const Demo = () => {
    // 根据官网例子的接口获取的数据
    const data = {
        id: '净资产收益率',
        children: [
            {
                id: '权益乘数',
                children: [{ id: '资产总额' }, { id: '所有者权益总额' }],
            },
            {
                id: '总资产收益率',
                children: [{ id: '销售净利率' }, { id: '总资产周转率' }],
            },
        ],
    };

    const [graph, setGraph] = useState(null) // 设置画布

    // 初始化画布
    const setGraphObj = () => {
        const width = document.getElementById('container').scrollWidth;
        const height = document.getElementById('container').scrollHeight || 500;
        const graph = new G6.TreeGraph({
            container: 'container',
            width,
            height,
            defaultNode: {
                type: 'card-node',
                size: [100, 40],
                style: {
                    fill: '#C6E5FF',
                    stroke: '#5B8FF9',
                },
            },
            defaultEdge: {
                type: 'cubic-horizontal',
                style: {
                    stroke: '#A3B1BF',
                    endArrow: true,
                },
            },
            layout: {
                type: 'indented',
                direction: 'LR',
                dropCap: false,
                indent: 200,
                getHeight: () => {
                    return 60;
                },
            },
        });

        let centerX = 0;
        graph.node(function (node) {
            if (node.id === 'Modeling Methods') {
                centerX = node.x;
            }

            return {
                label: node.id,
                labelCfg: {
                    position:
                        node.children && node.children.length > 0
                            ? 'left'
                            : node.x > centerX
                                ? 'right'
                                : 'left',
                    offset: 5,
                },
            };
        });

        graph.edge(edge => { // 设置边的样式
            return {
                id: edge.id,
                type: 'line',
                style: {
                    // fill: 'steelblue',
                    stroke: 'blue',
                },
            };
        });

        graph.on('nodes:mouseenter', (e) => {
            const item = e.item;
            const model = item.getModel()
            model.style.cursor = 'grab'
            graph.update(item, model)
            graph.paint()
        });

        graph.on('nodes:dragstart', (e) => {
            const item = e.item;
            const model = item.getModel()
            model.style.cursor = 'grabbing'
            graph.update(item, model)
            graph.paint()
        });

        graph.on('nodes:drag', (e) => {
            // 鼠标所在位置 转化为现在目标节点所在位置
            // 750 250
            const { clientX, clientY } = e
            // 将视口坐标转换为屏幕/页面坐标。
            const point = graph.getPointByClient(clientX, clientY)
            // {x: 6.1054067460319175, y: -188.58602740575392}
            const item = e.item;
            const model = item.getModel()
            model.style.cursor = 'grabbing'
            item.updatePosition(point)
            graph.update(item, model)
            graph.paint()
        });

        graph.on('nodes:dragend', (e) => {
            const item = e.item;
            const model = item.getModel()
            model.style.cursor = 'grab'
            graph.update(item, model)
            graph.paint()
        });
        graph.data(data);
        graph.render();
        graph.fitView();
        graph.on('node:click', (e) => {
            if (e.target.get('name') === 'collapse-icon') {
                e.item.getModel().collapsed = !e.item.getModel().collapsed;
                graph.setItemState(e.item, 'collapsed', e.item.getModel().collapsed);
                graph.layout();
            }
        });

        setGraph(graph)
    }

    useEffect(() => {
        setGraphObj() // 初始化画布
    }, [])

    useEffect(() => {
        if (graph && data) {
            renderGraph() // 渲染画布
        }
    }, [data, graph])

    const renderGraph = () => {
        graph.clear(); // 清除画布
        graph.data(data); // 传递数据
        graph.render(); // 渲染画布
        graph.fitView(); // 适应视图
    }

    return (
        <div>
            <div id={"container"} />
        </div>
    )
}

