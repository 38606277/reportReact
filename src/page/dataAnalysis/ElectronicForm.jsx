import React,{useState,useEffect,useRef} from 'react';
import {LeftOutlined } from '@ant-design/icons';
import {
    Form,
    Divider,
    Button,
    Checkbox,
    Input,
    Row,
    Col,
    Select,
    Tooltip,
    List,
    Empty,
    Drawer,
     
} from 'antd';
// import 
import HttpService from '../../util/HttpService.jsx';
const luckyCss = {
    margin: '0px',
    padding: '0px',
    position: 'relative',
    width: '100%',
    height: '100%'
}
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const en = window.luckysheet
export default (props)=>{
    const {onClose}=props
    const luckysheets=useRef()
    const [main,setMain]=useState("")
    const [Class,setClass]=useState([])//报表类别
    const [ClassName,setClassName]=useState(null)//报表类别change
    const [Name,setName]=useState(null)//报名change
    const [Fname,setFname]=useState([])//报表名称
    const [Condition,setCondition]=useState([])//查询条件
    const [output,setOutput]=useState([])//输出参数
    const [myid,setMyid]=useState("")
    const [mainForm] = Form.useForm()//Form
    const [InputList,setInputList]=useState({})
    const [i,seti]=useState(0)
    const [visible, setVisible] = useState(false);

    useEffect(()=>{
            en.create({
                showtoolbarConfig:{
                    hou:false
                },
                showinfobar:false,
                lang: 'zh',
                plugins:['chart'],
                // showstatisticBar: false,
                // functionButton:"<button id='' class='btn btn-primary'  style='padding:3px 6px;font-size: 12px;margin-right: 10px;'>保存</button>",
                data:[
                    {
                        "name": "name",
                        "color": "",
                        "index": 0,
                        "status": 0,
                        "order": 0,
                        "celldata": [],
                        "config": {}
                    },
                ]
              });
              
    },[en])
    useEffect(()=>{
        (()=>{
            HttpService.post("/reportServer/query/getAllQueryClass",JSON.stringify({})).then(res=>{
                if(res.resultCode==="1000"){
                    setClass(res.data)
                }
            })
        })()
    },[])
    const formClass=e=>{
        setClassName(e)
        HttpService.post("reportServer/query/getQueryByClassID/"+e+"",JSON.stringify({})).then(res=>{
            if(res.resultCode==="1000"){
                setFname(res.data)
                setName(null)
                setCondition([])
                setOutput([])
                setInputList({})
            }
        })
    
    }
    const formname=e=>{
        setName(e)
        HttpService.post("reportServer/query/getQueryParam/"+e,JSON.stringify({})).then(res=>{
            if(res.resultCode==="1000"){
                setCondition(res.data.in)
                setOutput(res.data.out)
                setInputList({}) 
            }
        })
        setOutput([])
    }
    const query=()=>{
        const en = window.luckysheet
        mainForm.submit()
        HttpService.post("reportServer/query/execQuery/"+ClassName+"/"+Name,JSON.stringify([
            {
                "in":InputList
            },
            {startIndex: 1, perPage: 10, searchResult: ""}
        ])).then(res=>{
            
            if(res.resultCode==="1000"){
                console.log(res.data.list)
                if(!res.data.list){
                    return 
                }
                const arr=res.data.list
                const TitleArr=[]
                let l=-1
                for (let key in arr[0]){
                    l+=1
                    TitleArr.push({
                        r:0,
                        c:l,
                        v:{
                            v:key,
                            m:key+"",
                            bg: "#fce5cd",
                        }
                    })
                }
                const Myarr=[]

               for(let i=0;i<arr.length;i+=1){
                   let U=[]
                   let s=-1
                   for (let y in arr[i]){
                       s+=1
                        U.push({
                            r:i+1,
                            c:s,
                            v:arr[i][y]
                        })
                   }
                   Myarr.push(...U)
               }
                setOutput(res.data.out)
                     en.create({
                        showtoolbarConfig:{
                            hou:false
                        },
                            showinfobar:false,
                            lang: 'zh',
                            data:[
                            {
                                "name": "name",
                                "celldata":[
                                    ...TitleArr,
                                    ...Myarr
                                ]
                            }
                            ]
                        })
                    en.setHorizontalFrozen(false)
            }
        })
   
    }
      const onClose1 = () => {
        setVisible(false);
    };
    const queryBtn=(e)=>{
        console.log(e.target.innerHTML)
        if(e.target.innerHTML==='查询'){
            setVisible(true)
            console.log('查询')
        }
    }
    
    return (
        
        <div style={{
            width:"100%",
            height:"100%",
            boxSizing:"border-box",
            padding:'0 5px'
        }}>
            <div style={{width:"100%",position:"relative",height:"18px",boxSizing:"border-box",marginBottom:"2px"}}>
                <div style={{textAlign:"center",fontSize:"10px"}}>表格查询</div>
                <Tooltip  placement="right" title={<span>返回</span>}  >
                    <LeftOutlined onClick={()=>{
                        onClose(false)
                    }}
                    style={{position:"absolute",left:"5px",top:"0px",fontSize:"18px"}}
                    />
                </Tooltip>
            </div>
            <div style={{height:"95%"}}>
                <div
                id="luckysheet"
                style={luckyCss}
                onClick={(e)=>{
                    queryBtn(e)
                }}
                ></div>
            </div>
            <Drawer
                placement="right"
                closable={false}
                onClose={onClose1}
                visible={visible}
                width={420}
            >
            <div style={{height:"600px",boxSizing:"border-box",boxSizing  :"border-box",position:"relative",width:"400px"}}>
                <Row style={{display:"flow-root",paddingBottom:"5px"}}>
                    <Button style={{float:"right"}} onClick={()=>{
                        query()
                    }}>执行查询</Button>
                </Row>
                <div style={{overflowY:"scroll",height:"100%"}}>
                        <Form
                            style={{marginLeft:"20px"}}
                            // {...layout}
                            name="basic"
                            >
                            <Form.Item
                                label="报表类别"
                                name="报表类别"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Select
                                    placeholder="请选择报表类别"
                                    size="middle"
                                    showArrow
                                    style={{width:"140px"}}
                                    allowClear
                                    value={ClassName}
                                    onChange={(e)=>{
                                        formClass(e)
                                    }}
                            >
                                {
                                    Class.map((item,index)=>{
                                        return(
                                            <Option key={index} value={item.class_id}>{item.class_name}</Option >
                                        )
                                    })
                                }
                            </Select>
                            </Form.Item>
                            <Form.Item
                                label="报表名称"
                                name="报表名称"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                                preserve={false}
                            >
                                <Select
                                    style={{width:"140px"}}
                                    placeholder="请选择报表类别"
                                    size="middle"
                                    showArrow
                                    allowClear
                                    value={Name}
                                    onChange={(e)=>{
                                        formname(e)
                                    }}
                            >
                                {
                                    Fname[0]?Fname.map((item,index)=>{
                                        return (
                                            <Option key={index} value={item.qry_id}>{item.qry_name}</Option >
                                        )
                                    }):null
                                }
                            </Select>
                                
                            </Form.Item>
                            <Row>
                               <Col sm={12}>
                                    <Checkbox>包含表头</Checkbox>
                               </Col>
                               <Col sm={12}>
                                    <Checkbox>横向扩展</Checkbox>
                               </Col>
                            </Row>
                        </Form>
                    <Divider plain orientation="left" style={{color:"burlywood"}}>查询条件</Divider>

                    <Form 
                        form={mainForm}
                        onFieldsChange={(a,e)=>{
                            let obj={}
                            for (let key in e) {
                                obj[e[key].name[0]] = e[key].value;
                            }
                            setInputList(obj)
                        }}
                        {...layout}
                        style={{
                            marginLeft:"10px"
                        }}
                    >
                        {
                            Condition[0]?Condition.map((item,index)=>{
                                return (
                                    <Form.Item
                                        label={item.in_name}
                                        name={item.in_name}
                                    >
                                        <Input  />
                                    </Form.Item>
                                )
                            }):<Empty />
                        }
                    </Form>
                   <Divider plain orientation="left" style={{color:"burlywood"}}>输出参数</Divider>
                   <List
                    dataSource={output}
                    bordered
                    style={{
                        marginLeft:"10px"
                    }}
                    renderItem={item => (
                        <List.Item>
                        <span style={{float:"right"}}>{item.out_name}:</span> 
                        </List.Item>
                    )}
                    />
                </div>
            </div>
      </Drawer>
         </div>            
   )
}