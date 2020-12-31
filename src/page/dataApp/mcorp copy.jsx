import React,{useEffect,useState,useRef} from 'react'
import ReactDOM from 'react-dom'
import insertCss from 'insert-css'
import { Tooltip ,Table} from 'antd'
import { Graph, Node, Path, Dom } from '@antv/x6'
import './Hindex.css'
const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];
  
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ]
let bow= ()=>{
    return (
        <Table dataSource={dataSource} columns={columns} />
    )
}


let at={
  attrs: {
    line: {
      stroke: '#808080',
      strokeWidth: 1,
      targetMarker: '',
    },
  },
}
let fn=()=>{

}
export default ()=>{
    let box=useRef()
    let tiem=useRef()
    let [nat,setnat]=useState({...at})
    let [colorData,setdata]=useState(['#fe854f','#7c68fc','#73d13d'])
    let [o,seto]=useState(true)
    let aty={
      markup: [
        {
          tagName: 'path',
          selector: 'wrap',
          groupSelector: 'lines',
        },
        {
          tagName: 'path',
          selector: 'line1',
          groupSelector: 'lines',
        },
        {
          tagName: 'path',
          selector: 'line2',
          groupSelector: 'lines',
        },
        {
          tagName: 'path',
          selector: 'line3',
          groupSelector: 'lines',
        },
      ],
      attrs: {
        lines: {
          connection: true,
          strokeDasharray: '10,20',
          strokeLinejoin: 'round',
          fill: 'none',
        },
        line1: {
          stroke: colorData[0],
          strokeWidth: 2,
        },
        line2: {
          stroke: colorData[1],
          strokeDashoffset: 10,
          strokeWidth: 2,
        },
        line3: {
          strokeWidth: 2,
          strokeDashoffset: 20,
          stroke: colorData[2],
          targetMarker: {
            tagName: 'path',
            stroke: '#73d13d',
            strokeWidth: 1,
            d: 'M 0 -4 0 -10 -12 0 0 10 0 4',
          },
        },
      },
    }
    let [yat,setyat]=useState({...aty})
    let st = () =>{
      console.log(tiem.current)
      clearInterval(tiem.current)
      seto(!o)
    }
    let add=()=>{
      clearInterval(tiem.current)
    }
    useEffect(()=>{
        box.current.style.height='1000px'  
        box.current.style.widht='2000px' 
        tiem.current =setInterval(() => {
            //  console.log(1)
            let arr=[colorData[1],colorData[2],colorData[0]]
            setdata([...arr])
            let aty={
              markup: [
                {
                  tagName: 'path',
                  selector: 'wrap',
                  groupSelector: 'lines',
                },
                {
                  tagName: 'path',
                  selector: 'line1',
                  groupSelector: 'lines',
                },
                {
                  tagName: 'path',
                  selector: 'line2',
                  groupSelector: 'lines',
                },
                {
                  tagName: 'path',
                  selector: 'line3',
                  groupSelector: 'lines',
                },
              ],
              attrs: {
                lines: {
                  connection: true,
                  strokeDasharray: '10,20',
                  strokeLinejoin: 'round',
                  fill: 'none',
                },
                line1: {
                  stroke: arr[0],
                  strokeWidth: 2,
                },
                line2: {
                  stroke: arr[1],
                  strokeDashoffset: 10,
                  strokeWidth: 2,
                },
                line3: {
                  strokeWidth: 2,
                  strokeDashoffset: 20,
                  stroke: arr[2],
                  targetMarker: {
                    tagName: 'path',
                    stroke: '#73d13d',
                    strokeWidth: 1,
                    d: 'M 0 -4 0 -10 -12 0 0 10 0 4',
                  },
                },
              },
            }
            setyat(aty)
            console.log(...arr)
        }, 500);
        Graph.registerNode(
            'algo-node',
            {
              inherit: 'rect',
              attrs: {
                body: {
                  strokeWidth: 1,
                  stroke: '#108ee9',
                  fill: '#fff',
                  rx: 15,
                  ry: 15,
                },
              },
              portMarkup: [
                {
                  tagName: 'foreignObject',
                  selector: 'fo',
                  attrs: {
                    width: 6,//控制小圆大小
                    height: 6,//控制小圆大小
                    x: -3,
                    y: -3,
                    magnet: 'true',
                  },
                  children: [
                    {
                      ns: Dom.ns.xhtml,
                      tagName: 'body',
                      selector: 'foBody',
                      attrs: {
                        xmlns: Dom.ns.xhtml,
                      },
                      style: {
                        width: '100%',
                        height: '100%',
                      },
                      children: [
                        {
                          tagName: 'div',
                          selector: 'content',
                          style: {
                            width: '100%',
                            height: '100%',
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            true,
          )
          
          // 定义边
          Graph.registerConnector(
            'algo-edge',
            (source, target) => {
              // console.log(source,target)
              const offset = 4
              const control = 80
              const v1 = { x: source.x, y: source.y + offset + control }
              const v2 = { x: target.x, y: target.y - offset - control }
          
              return `M ${source.x} ${source.y}
                 L ${source.x} ${source.y + offset}
                 C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${target.x} ${target.y - offset}
                 L ${target.x} ${target.y}
                `
            },
            true,
          )
          
          // 初始化画布
          const graph = new Graph({
            grid: true,
            container: box.current,
            onPortRendered(args) {
              // console.log(args)
              const port = args.port
              const contentSelectors = args.contentSelectors
              const container = contentSelectors && contentSelectors.content
              if (container) {
                ReactDOM.render(
                  <Tooltip title="port">
                    <div className={`my-port${port.connected ? ' connected' : ''}`} />
                  </Tooltip>,
                  container,
                )
              }
            },
            highlighting: {
              nodeAvailable: {
                name: 'className',
                args: {
                  className: 'available',
                },
              },
              magnetAvailable: {
                name: 'className',
                args: {
                  className: 'available',
                },
              },
              magnetAdsorbed: {
                name: 'className',
                args: {
                  className: 'adsorbed',
                },
              },
            },
            connecting: {
              snap: true,
              allowBlank: false,
              allowLoop: false,
              highlight: true,
              sourceAnchor: 'bottom',
              targetAnchor: 'center',
              connectionPoint: 'anchor',
              connector: 'algo-edge',
              createEdge() {
                return graph.createEdge({
                  attrs: {
                    line: {
                      strokeDasharray: '5 5',
                      stroke: '#808080',
                      strokeWidth: 1,
                      targetMarker: {
                        name: 'block',
                        args: {
                          size: '6',
                        },
                      },
                    },
                  },
                })
              },
              validateMagnet({ magnet }) {
                return magnet.getAttribute('port-group') !== 'in'
              },
              validateConnection({ sourceView, targetView, sourceMagnet, targetMagnet }) {
                // 只能从输出链接桩创建连接
                if (!sourceMagnet || sourceMagnet.getAttribute('port-group') === 'in') {
                  return false
                }
          
                // 只能连接到输入链接桩
                if (!targetMagnet || targetMagnet.getAttribute('port-group') !== 'in') {
                  return false
                }
          
                // 判断目标链接桩是否可连接
                const portId = targetMagnet.getAttribute('port')
                const node = targetView.cell
                const port = node.getPort(portId)
                if (port && port.connected) {
                  return false
                }
          
                return true
              },
            },
          })
          
          graph.on('edge:connected', (args) => {
              // console.log(args.currentCel)
            const edge = args.edge
            const node = args.currentCel
            const elem = args.currentMagnet
            const portId = elem.getAttribute('port') 
          
            // 触发 port 重新渲染
            node.setPortProp(portId, 'connected', true)
          
            // 更新连线样式
            edge.attr({
              line: {
                strokeDasharray: '',
                targetMarker: '',
              },
            })
          })
          
         const a3= graph.addNode({
            x: 380,
            y: 180,
            width: 160,
            height: 30,
            shape: 'algo-node',
            label: '算法二',
            ports: {
              items: [
                { group: 'in', id: 'in1' },
                { group: 'in', id: 'in2' },
                { group: 'out', id: 'out1' },
                { group: 'out', id: 'out2' },
              ],
              groups: {
                in: {
                  position: { name: 'top' },
                  zIndex: 1,
                },
                out: {
                  position: { name: 'bottom' },
                  zIndex: 1,
                },
              },
            },
          })
          
          const source = graph.addNode({
            x: 200,
            y: 50,
            width: 160,
            height: 30,
            shape: 'algo-node',
            label: '算法1',
            ports: {
              items: [
                { group: 'in', id: 'in1' },
                { group: 'in', id: 'in2' },
                { group: 'out', id: 'out1' },
                {group:'out',id:'out2'}
              ],
              groups: {
                in: {
                  position: { name: 'top' },
                  zIndex: 1,
                },
                out: {
                  position: { name: 'bottom' },
                  zIndex: 1,
                },
              },
            },
          })
          
          const target = graph.addNode({
            x: 120,
            y: 260,
            width: 160,
            height: 30,
            shape: 'algo-node',
            // label: '算法3',
            attrs: {
                body: {
                  fill: '#f5f5f5',
                  stroke: '#d9d9d9',
                },
              },
            ports: {
              items: [
                { group: 'in', id: 'in1', connected: true },
                { group: 'in', id: 'in2' },
                { group: 'out', id: 'out1' },
              ],
              groups: {
                in: {
                  position: { name: 'top' },
                  zIndex: 1,
                },
                out: {
                  position: { name: 'bottom' },
                  zIndex: 1,
                },
              },
            },
            html:()=>{
                let div = document.createElement('div')
                div.innerHTML='1111'
                return div
            }
          })
          graph.addEdge({
            source: { cell: source, port: 'out1' },
            target: { cell: target, port: 'in1' },
            ...o?{...yat}:{...nat}
          
          })
          graph.addEdge({
            source: { cell: source, port: 'out1' },
            target: { cell: a3, port: 'in1' },
            ...!o?{...yat}:{...nat}
          })
          insertCss(`
            .x6-node [magnet="true"] {
              cursor: crosshair;
              transition: none;
            }

            .x6-node [magnet="true"]:hover {
              opacity: 1;
            }

            .x6-node [magnet="true"][port-group="in"] {
              cursor: move;
            }

            .my-port {
              width: 100%;
              height: 100%;
              border: 1px solid #808080;
              border-radius: 100%;
              background: #eee;
            }

            .my-port.connected {
              width: 0;
              height: 0;
              margin-top: 5px;
              margin-left: 1px;
              border-width: 5px 4px 0;
              border-style: solid;
              border-color: #808080 transparent transparent;
              border-radius: 0;
              background-color: transparent;
            }

            .x6-port-body.available {
              overflow: visible;
            }

            .x6-port-body.available body {
              overflow: visible;
            }

            .x6-port-body.available body > div::before {
              content: " ";
              float: left;
              width: 20px;
              height: 20px;
              margin-top: -5px;
              margin-left: -5px;
              border-radius: 50%;
              background-color: rgba(57, 202, 116, 0.6);
              box-sizing: border-box;
            }

            .x6-port-body.available body > div::after {
              content: " ";
              float: left;
              clear: both;
              width: 10px;
              height: 10px;
              margin-top: -15px;
              border-radius: 50%;
              background-color: #fff;
              border: 1px solid #39ca74;
              position: relative;
              z-index: 10;
              box-sizing: border-box;
            }

            .x6-port-body.adsorbed {
              overflow: visible;
            }

            .x6-port-body.adsorbed body {
              overflow: visible;
            }

            .x6-port-body.adsorbed body > div::before {
              content: " ";
              float: left;
              width: 28px;
              height: 28px;
              margin-top: -9px;
              margin-left: -9px;
              border-radius: 50%;
              background-color: rgba(57, 202, 116, 0.6);
              box-sizing: border-box;
            }

            .x6-port-body.adsorbed body > div::after {
              content: " ";
              float: left;
              clear: both;
              width: 10px;
              height: 10px;
              margin-top: -19px;
              border-radius: 50%;
              background-color: #fff;
              border: 1px solid #39ca74;
              position: relative;
              z-index: 10;
              box-sizing: border-box;
            }
        `)
        return ()=>{
          clearInterval(tiem.current)
        }
    },[colorData,o])
    return(
        <div>
          <div ref={box} id='connected'></div>
            <div className="Hbox">
              <div className='Hbox1' onClick={()=>add()}>停止</div>
              <div className='Hbox2' onClick={()=>st()}>切换</div>
            </div>
        </div>
    )
}