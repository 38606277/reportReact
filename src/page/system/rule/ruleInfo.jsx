
import React                from 'react';
import { Link }             from 'react-router-dom';
import User                 from '../../../service/user-service.jsx';
import RuleService          from '../../../service/RuleService.jsx';

import {Table,Button,Card, Tooltip,Input,message,Tree,Tabs, Select}  from 'antd';
import Pagination           from 'antd/lib/pagination';

const TreeNode = Tree.TreeNode;
const user = new User();
const ruleSevie =new RuleService();
const Search=Input.Search;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
class RuleInfo extends React.Component{
    constructor(props){
        super(props);
        const panes = [];
        this.newTabIndex = 0;
        this.state = {
            list : [],
            pageNum         : 1,
            perPage         : 10,
            listType:'list',
            expandedKeys:[],
            autoExpandParent: true,
            checkedKeys: [],
            selectedKeys: [],
            tabPosition: 'top',
            treeData:[],
            activeKey:"select",
            searchKeyword:'',
            panes,
        };
    }
    
    componentDidMount(){
        this.loadUserList();
    }
    loadUserList(){
        let listParam = {};
        listParam.pageNum  = this.state.pageNum;
        listParam.perPage  = this.state.perPage;
        // 如果是搜索的话，需要传入搜索类型和搜索关键字
        if(this.state.listType === 'search'){
            listParam.keyword    = this.state.searchKeyword;
        }
        user.getUserList(listParam).then(response => {
            this.setState(response.data);
        }, errMsg => {
            this.setState({
                list : []
            });
        });
    }
    // 搜索
    onSearch(searchKeyword){
       
        this.setState({
            pageNum         : 1,
            searchKeyword   : searchKeyword,
            listType :'search'
        }, () => {
            this.loadUserList();
        });
    }
    // 页数发生变化的时候
    onPageNumChange(pageNum){
        this.setState({
            pageNum : pageNum
        }, () => {
            this.loadUserList();
        });
    }
    //tree
    onExpand = (expandedKeys) => {
        //console.log('onExpand', expandedKeys);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
          expandedKeys,
          autoExpandParent: false,
        });
      }
    
      onCheck = (checkedKeys) => {
        console.log('onCheck', checkedKeys);
        this.setState({ checkedKeys });
      }
    
      onSelect = (selectedKeys, info) => {
        console.log('onSelect', info);
        this.setState({ selectedKeys });
      }
    
      renderTreeNodes = (data) => {
        return data.map((item) => {
          if (item.children) {
            return (
              <TreeNode title={item.title} key={item.key} dataRef={item}>
                {this.renderTreeNodes(item.children)}
              </TreeNode>
            );
          }
          return <TreeNode {...item} />;
        });
      }
     
     selectedOnchage(name,types,isChange){
        this.setState({searchKeyword:name,expandedKeys:[],checkedKeys: []});
         let type='select';
            if(''!=types){
                 type=types;
            }else{
                type=this.state.activeKey;
            }
             if(type=='select'){
                 //如果treeData不为空，根据人名称查人员选中事项
                 if(this.state.treeData.length>0 && ''==isChange){
                    ruleSevie.getAuthListByConditions(name,type).then(response=>{
                        let  selectedKeys=[];
                        if(response.resultCode!='3000'){
                            response.map((item,index)=>{
                                selectedKeys.push(item.funcId);
                            })
                            this.setState({
                                expandedKeys:selectedKeys,
                                checkedKeys: selectedKeys,
                            });  
                        }                 
                    });
                 }else{
                     //如果treeData为空，根据人与当前tabKey进行先查询treeData后查人员选中事项
                     this.setState({treeData:[]});
                     ruleSevie.getSelectClassTree().then(response=>{
                        if(response.status!=500){
                            this.setState({treeData:response});
                            ruleSevie.getAuthListByConditions(name,type).then(response=>{
                                let  selectedKeys=[];
                                if(response.resultCode!='3000'){
                                    response.map((item,index)=>{
                                        selectedKeys.push(item.funcId);
                                    })
                                    this.setState({
                                        expandedKeys:selectedKeys,
                                        checkedKeys: selectedKeys,
                                    });  
                                }                 
                            });
                        }
                    });
                }
             }
             if(type=='template'){
                  //如果treeData不为空，根据人名称查人员选中事项
                  if(this.state.treeData.length>0 && ''==isChange){
                    ruleSevie.getAuthByConditions(name,type).then(response=>{
                        let  selectedKeys=[];
                        if(response.resultCode!='3000'){
                            response.map((item,index)=>{
                                selectedKeys.push(item.funcId);
                            })
                            this.setState({
                                expandedKeys:selectedKeys,
                                checkedKeys: selectedKeys,
                            });  
                       }                 
                    });
                 }else{
                     //如果treeData为空，根据人与当前tabKey进行先查询treeData后查人员选中事项
                    this.setState({treeData:[]});
                    ruleSevie.getDirectory().then(response=>{
                        if(response.status!=500){
                                this.setState({treeData:response});
                                ruleSevie.getAuthByConditions(name,type).then(response=>{
                                    let  selectedKeys=[];
                                    if(response.resultCode!='3000'){
                                        response.map((item,index)=>{
                                            selectedKeys.push(item.funcId);
                                        })
                                        this.setState({
                                            expandedKeys:selectedKeys,
                                            checkedKeys: selectedKeys,
                                        });  
                                    }                  
                                });
                        }
                    });
                }
             }
             if(type=='function'){
                    //如果treeData不为空，根据人名称查人员选中事项
                    if(this.state.treeData.length>0 && ''==isChange){
                        ruleSevie.getAuthByConditions(name,type).then(response=>{
                            let  selectedKeys=[];
                            if(response.resultCode!='3000'){
                                response.map((item,index)=>{
                                    selectedKeys.push(item.funcId);
                                })
                                this.setState({
                                    expandedKeys:selectedKeys,
                                    checkedKeys: selectedKeys,
                                });  
                            }                 
                        });
                    }else{
                        //如果treeData为空，根据人与当前tabKey进行先查询treeData后查人员选中事项
                        this.setState({treeData:[]});
                        ruleSevie.getFunctionClass().then(response=>{
                            if(response.status!=500){
                                this.setState({treeData:response});
                                ruleSevie.getAuthByConditions(name,type).then(response=>{
                                    let  selectedKeys=[];
                                    if(response.resultCode!='3000'){
                                        response.map((item,index)=>{
                                            selectedKeys.push(item.funcId);
                                        })
                                        this.setState({
                                            expandedKeys:selectedKeys,
                                            checkedKeys: selectedKeys,
                                        });  
                                    }                   
                                });
                            }
                        });
                    }
             }
             if(type=='func'){
                 //如果treeData不为空，根据人名称查人员选中事项
                 if(this.state.treeData.length>0 && ''==isChange){
                        ruleSevie.getAuthByConditions(name,type).then(response=>{
                            let  selectedKeys=[];
                            if(response.resultCode!='3000'){
                                response.map((item,index)=>{
                                    selectedKeys.push(item.funcId);
                                })
                                this.setState({
                                    expandedKeys:selectedKeys,
                                    checkedKeys: selectedKeys,
                                });  
                            }                 
                        });
                }else{
                    //如果treeData为空，根据人与当前tabKey进行先查询treeData后查人员选中事项
                    this.setState({treeData:[]});
                    ruleSevie.getFunRuleList('excel').then(response=>{
                        if(response.status!=500){
                                this.setState({treeData:response});
                                ruleSevie.getAuthByConditions(name,type).then(response=>{
                                    let  selectedKeys=[];
                                    if(response.resultCode!='3000'){
                                        response.map((item,index)=>{
                                            selectedKeys.push(item.funcId);
                                        })
                                        this.setState({
                                            expandedKeys:selectedKeys,
                                            checkedKeys: selectedKeys,
                                        });  
                                    }                 
                                });
                        }
                    });
                }
             }
             if(type=='webFunc'){
                 //如果treeData不为空，根据人名称查人员选中事项
                 if(this.state.treeData.length>0 && ''==isChange){
                    ruleSevie.getAuthByConditions(name,type).then(response=>{
                        let  selectedKeys=[];
                        if(response.resultCode!='3000'){
                            response.map((item,index)=>{
                                selectedKeys.push(item.funcId);
                            })
                            this.setState({
                                expandedKeys:selectedKeys,
                                checkedKeys: selectedKeys,
                            });  
                        }                 
                    });
                 }else{
                    //如果treeData为空，根据人与当前tabKey进行先查询treeData后查人员选中事项
                    this.setState({treeData:[]});
                    ruleSevie.getFunRuleList('web').then(response=>{
                        if(response.status!=500){
                            this.setState({treeData:response});
                            ruleSevie.getAuthByConditions(name,type).then(response=>{
                                let  selectedKeys=[];
                                if(response.resultCode!='3000'){
                                    response.map((item,index)=>{
                                        selectedKeys.push(item.funcId);
                                    })
                                    this.setState({
                                        expandedKeys:selectedKeys,
                                        checkedKeys: selectedKeys,
                                    });  
                                }                   
                            });
                        }
                    });
                }
             }
             if(type=='ou'){
                 //如果treeData不为空，根据人名称查人员选中事项
                 if(this.state.treeData.length>0 && ''==isChange){
                    ruleSevie.getAuthByConditions(name,type).then(response=>{
                        let  selectedKeys=[];
                        if(response.resultCode!='3000'){
                            response.map((item,index)=>{
                                selectedKeys.push(item.funcId);
                            })
                            this.setState({
                                expandedKeys:selectedKeys,
                                checkedKeys: selectedKeys,
                            });  
                        }                 
                    });
                }else{
                        //如果treeData为空，根据人与当前tabKey进行先查询treeData后查人员选中事项
                        this.setState({treeData:[]});
                        ruleSevie.getAuthTypeListByType().then(response=>{
                            if(response.resultCode!='3000'){
                                this.setState({treeData:response});
                                ruleSevie.getAuthByConditions(name,type).then(response=>{
                                    let  selectedKeys=[];
                                    if(response.resultCode!='3000'){
                                        response.map((item,index)=>{
                                            selectedKeys.push(item.funcId);
                                        })
                                        this.setState({
                                            expandedKeys:selectedKeys,
                                            checkedKeys: selectedKeys,
                                        });  
                                }          
                            });
                        }
                        });
                    }
             }
             if(type=='dept'){
                 //如果treeData不为空，根据人名称查人员选中事项
                 if(this.state.treeData.length>0 && ''==isChange){
                    ruleSevie.getAuthListByConditions(name,type).then(response=>{
                        let  selectedKeys=[];
                        if(response.resultCode!='3000'){
                            response.map((item,index)=>{
                                selectedKeys.push(item.funcId);
                            })
                            this.setState({
                                expandedKeys:selectedKeys,
                                checkedKeys: selectedKeys,
                            });  
                        }                 
                    });
                 }else{
                        //如果treeData为空，根据人与当前tabKey进行先查询treeData后查人员选中事项
                        this.setState({treeData:[]});
                        ruleSevie.getAuthTypeListByType().then(response=>{
                            if(response.resultCode!='3000'){
                                this.setState({treeData:response});
                                ruleSevie.getAuthListByConditions(name,type).then(response=>{
                                    let  selectedKeys=[];
                                    if(response.resultCode!='3000'){
                                        response.map((item,index)=>{
                                            selectedKeys.push(item.funcId);
                                        })
                                        this.setState({
                                            expandedKeys:selectedKeys,
                                            checkedKeys: selectedKeys,
                                        });   
                                     }         
                                 });
                            }
                        });
                }
             }
             if(type=='table'){
                 ruleSevie.getAllAuthTypeList().then(response=>{
                     if(response.resultCode!='3000'){
                        const panes = [];
                        const activeKey = `table`;
                        response.data.map((item,index)=>{
                            panes.push({ title: item.name, content: (
                                <div>
                                    <Button type="primary" onClick={()=>this.saveSelectObject()}>保存</Button>
                                    <Tree
                                        checkable
                                        onExpand={this.onExpand}
                                        expandedKeys={this.state.expandedKeys}
                                        autoExpandParent={this.state.autoExpandParent}
                                        onCheck={this.onCheck}
                                        checkedKeys={this.state.checkedKeys}                                       
                                        selectedKeys={this.state.selectedKeys}
                                    >
                                    {this.renderTreeNodes(this.state.treeData)}
                                    </Tree>
                                </div>   
                           ), key: item.value });

                        })
                        this.setState({ panes, activeKey });
                     }
                    // this.setState({treeData:response});
                 });
            }
     }
     onChangeTab = (activeKey) => {
        this.setState({ activeKey:activeKey,treeData:[] });
        let name=this.state.searchKeyword;
        if(''!=name){
            this.selectedOnchage(name,activeKey,'true');
         }
       
      }
    saveSelectObject(){
            let param=[this.state.searchKeyword,this.state.activeKey,this.state.checkedKeys];
            ruleSevie.saveAuthRules(param).then(response=>{
                message.success("保存成功");
            });
    }
    
    render(){
        this.state.list.map((item,index)=>{
            item.key=index;
        })
        const dataSource = this.state.list;
          const columns = [{
            dataIndex: 'userName',
            key: 'userName',
            render: (text, record)=> {
                return <a href="javascript:;" onClick={()=>this.selectedOnchage(record.userName,'','')} >{text}</a>;
            }
          }];
        const contents=(
            <div>
                    <Button type="primary" onClick={()=>this.saveSelectObject()}>保存</Button>
                    <Tree
                        checkable
                        onExpand={this.onExpand}
                        expandedKeys={this.state.expandedKeys}
                        autoExpandParent={this.state.autoExpandParent}
                        onCheck={this.onCheck}
                        checkedKeys={this.state.checkedKeys}
                        selectedKeys={this.state.selectedKeys}
                    >
                    {this.renderTreeNodes(this.state.treeData)}
                     </Tree>
                  </div>   
        );
        return (
            <div id="page-wrapper">
            <Card title="用户列表"  style={{float:"left",width:"20%"}}>
                <Tooltip>
                    <Search
                        style={{ width: 190,marginBottom:'10px' ,marginLeft: '-20px', marginRight: '-30px', border: '0'}}
                        placeholder="请输入..."
                        enterButton="查询"
                        onSearch={value => this.onSearch(value)}
                        />
                </Tooltip>
                <Table dataSource={dataSource} columns={columns}  pagination={false} 
                showHeader={false} style={{marginLeft: '-30px', marginRight: '-30px', border: '0'}}/>
                 <Pagination current={this.state.pageNum} 
                    total={this.state.total} 
                    onChange={(pageNum) => this.onPageNumChange(pageNum)}/> 
            </Card>
           
            <Card title="权限列表" style={{float:"left",width:"80%"}}>
                <Tabs defaultActiveKey="select" onChange={this.onChangeTab} tabPosition={this.state.tabPosition}>
                <TabPane tab="查询" key="select">
                    {contents}
                </TabPane>
                <TabPane tab="函数" key="function">
                    {contents}
                </TabPane>
                <TabPane tab="模板" key="template">
                     {contents}
                </TabPane>
                <TabPane tab="功能" key="func">
                     {contents}
                </TabPane>
                <TabPane tab="网站菜单" key="webFunc">
                    {contents}
                </TabPane>
                <TabPane tab="数据权限" key="table">
                    <Tabs defaultActiveKey="ou" onChange={this.onChangeTab} tabPosition={this.state.tabPosition}>
                    {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>)}
                       
                    </Tabs>
                </TabPane>
                </Tabs>
            </Card>
             
            </div>
        )
    }
}

export default RuleInfo;