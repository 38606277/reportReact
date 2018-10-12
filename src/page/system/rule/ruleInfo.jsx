
import React                from 'react';
import Role                 from '../../../service/RoleService.jsx';
import RuleService          from '../../../service/RuleService.jsx';

import {Table,Button,Card, Tooltip,Input,message,Tree,Tabs, Select,Icon}  from 'antd';
import Pagination           from 'antd/lib/pagination';

const TreeNode = Tree.TreeNode;
const _role = new Role();
const ruleSevie =new RuleService();
const Search=Input.Search;
const TabPane = Tabs.TabPane;
const Option = Select.Option;


class RuleInfo extends React.Component{
    constructor(props){
        super(props);
        const panes = [];
        this.parentNodes = [];
        this.node = null;
        this.newTabIndex = 0;
        this.state = {
            roleId:this.props.match.params.roleId,
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
            roleName:'',
            panes,
        };
    }
    
    componentDidMount(){
        this.loadRoleList();
        if(null!=this.state.roleId && ''!=this.state.roleId && 'null'!=this.state.roleId){
            this.selectedOnchage(this.state.roleId,'','','');
        }
        
    }
    loadRoleList(){
        let listParam = {};
        listParam.pageNum  = this.state.pageNum;
        listParam.perPage  = this.state.perPage;
        // 如果是搜索的话，需要传入搜索类型和搜索关键字
        if(this.state.listType === 'search'){
            listParam.roleName    = this.state.roleName;
        }
        _role.getRoleList(listParam).then(response => {
            this.setState(response);
           
        }, errMsg => {
            this.setState({
                list : []
            });
        });
        
    }
    onValueChange(e){
        let name = e.target.name,
        value = e.target.value.trim();
           
        this.setState({roleName:value});
    }
    // 搜索
    onSearch(){
        this.setState({
            pageNum         : 1,
            listType :'search'
        }, () => {
            this.loadRoleList();
        });
    }
    // 页数发生变化的时候
    onPageNumChange(pageNum){
        this.setState({
            pageNum : pageNum
        }, () => {
            this.loadRoleList();
        });
    }
    //tree
    onExpand = (expandedKeys) => {
        this.setState({
          expandedKeys,
          autoExpandParent: false,
        });
      }
      //循环增加或删除选中项
      showExcelRuleTreeNodeReact(isChecked,childrenData,checkedKeys){
        if(!isChecked){
            childrenData.map((item,index)=>{
                checkedKeys.push(item.key);
                if(undefined!=item.props.children && 'undefined'!=item.props.children){
                    let childrenData=item.props.children;
                    this.showExcelRuleTreeNodeReact(isChecked,childrenData,checkedKeys);
                }
            });
        }else{
            childrenData.map((item,index)=>{
                for(var i=0;i<checkedKeys.length;i++){
                    if(checkedKeys[i] == item.key){
                        checkedKeys.splice(i,1);
                        i--;
                    }
                }
                if(undefined!=item.props.children && 'undefined'!=item.props.children){
                    let childrenData=item.props.children;
                    this.showExcelRuleTreeNodeReact(isChecked,childrenData,checkedKeys);
                }
            });
        }
        this.setState({ checkedKeys:checkedKeys },function(){});
      }
      //check事件
      onCheck = (checkedKeys,info) => {
        let checkedKeyVal= checkedKeys.checked;
        let treedatas=this.state.treeData;
        this.node=null;
        this.parentNodes=[];
        //获取父节点key
        let arr2 =  this.getNode(treedatas,info.node.props.eventKey);
        //var arr = [...checkedKeyVal,...arr2];
        let array = Array.from(new Set([...checkedKeyVal,...arr2]));

            if(undefined!=info.node.props.children && 'undefined'!=info.node.props.children){
                let childrenData=info.node.props.children;
                let isChecked=info.node.props.checked;
                this.showExcelRuleTreeNodeReact(isChecked,childrenData,array);
            }else{
                this.setState({ checkedKeys:array },function(){});
            }
            
      }
      
      getNode(json, nodeId) {
        //1.第一层 root 深度遍历整个JSON
        var i = 0;
        for (i; i < json.length; i++) {
            if (this.node) {
                break;
            }
            var obj = json[i];
            //没有就下一个
            if (!obj || !obj.key) {
                continue;
            }

            //2.有节点就开始找，一直递归下去
            if (obj.key == nodeId) {
                //找到了与nodeId匹配的节点，结束递归
                this.node = obj;
                break;
            } else {
                //3.如果有子节点就开始找
                if (obj.children) {
                    this.parentNodes.push(obj.key);
                    //递归往下找
                    this.getNode(obj.children, nodeId);
                } else {
                    //跳出当前递归，返回上层递归
                    continue;
                }
            }
        }
        //如果这个循环都没有，则删除父节点
        if(i==json.length){
            this.parentNodes.splice(this.parentNodes.length-1,1);
        }
        //6.返回结果obj
        // return {
        //     parentNode: this.parentNodes,
        //     node: this.node
        // };
        return  this.parentNodes;
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
     
     selectedOnchage(roleId,name,types,isChange){
        this.setState({roleId:roleId,roleName:name,expandedKeys:[],checkedKeys: []},function(){
         let type='select';
            if(''!=types){
                 type=types;
            }else{
                type=this.state.activeKey;
            }
             if(type=='select'){
                 //如果treeData不为空，根据人名称查人员选中事项
                 if(this.state.treeData.length>0 && ''==isChange){
                    ruleSevie.getAuthListByConditions(roleId,type).then(response=>{
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
                            ruleSevie.getAuthListByConditions(roleId,type).then(response=>{
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
             }else if(type=='template'){
                  //如果treeData不为空，根据人名称查人员选中事项
                  if(this.state.treeData.length>0 && ''==isChange){
                    ruleSevie.getAuthByConditions(roleId,type).then(response=>{
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
                                ruleSevie.getAuthByConditions(roleId,type).then(response=>{
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
             }else if(type=='function'){
                    //如果treeData不为空，根据人名称查人员选中事项
                    if(this.state.treeData.length>0 && ''==isChange){
                        ruleSevie.getAuthByConditions(roleId,type).then(response=>{
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
                                ruleSevie.getAuthByConditions(roleId,type).then(response=>{
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
             }else if(type=='func'){
                 //如果treeData不为空，根据人名称查人员选中事项
                 if(this.state.treeData.length>0 && ''==isChange){
                        ruleSevie.getAuthByConditions(roleId,type).then(response=>{
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
                                ruleSevie.getAuthByConditions(roleId,type).then(response=>{
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
             }else if(type=='webFunc'){
                 //如果treeData不为空，根据人名称查人员选中事项
                 if(this.state.treeData.length>0 && ''==isChange){
                    ruleSevie.getAuthByConditions(roleId,type).then(response=>{
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
                            ruleSevie.getAuthByConditions(roleId,type).then(response=>{
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
             }else if(type=='table'){
                //如果treeData不为空，根据人名称查人员选中事项
                if(this.state.treeData.length>0 && ''==isChange){
                   ruleSevie.getAuthByConditions(roleId,type).then(response=>{
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
                       ruleSevie.getAllAuthTypeList().then(response=>{
                           if(response.resultCode!='3000'){
                               this.setState({treeData:response});
                               ruleSevie.getAuthByConditions(roleId,type).then(response=>{
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
               //  ruleSevie.getAllAuthTypeList().then(response=>{
               //      if(response.resultCode!='3000'){
               //         const panes = [];
               //         const activeKey = `table`;
               //         response.data.map((item,index)=>{
               //             panes.push({ title: item.name, content: (
               //                 <div>
               //                     <Button type="primary" onClick={()=>this.saveSelectObject()}>保存</Button>
               //                     <Tree
               //                         checkable
               //                         onExpand={this.onExpand}
               //                         expandedKeys={this.state.expandedKeys}
               //                         autoExpandParent={this.state.autoExpandParent}
               //                         onCheck={this.onCheck}
               //                         checkedKeys={this.state.checkedKeys}                                       
               //                         selectedKeys={this.state.selectedKeys}
               //                     >
               //                     {this.renderTreeNodes(this.state.treeData)}
               //                     </Tree>
               //                 </div>   
               //            ), key: item.value });

               //         })
               //         this.setState({ panes, activeKey });
               //      }
               //     // this.setState({treeData:response});
               //  });
           }
            //  if(type=='ou'){
            //      //如果treeData不为空，根据人名称查人员选中事项
            //      if(this.state.treeData.length>0 && ''==isChange){
            //         ruleSevie.getAuthByConditions(roleId,type).then(response=>{
            //             let  selectedKeys=[];
            //             if(response.resultCode!='3000'){
            //                 response.map((item,index)=>{
            //                     selectedKeys.push(item.funcId);
            //                 })
            //                 this.setState({
            //                     expandedKeys:selectedKeys,
            //                     checkedKeys: selectedKeys,
            //                 });  
            //             }                 
            //         });
            //     }else{
            //             //如果treeData为空，根据人与当前tabKey进行先查询treeData后查人员选中事项
            //             this.setState({treeData:[]});
            //             ruleSevie.getAuthTypeListByType('ou').then(response=>{
            //                 if(response.resultCode!='3000'){
            //                     this.setState({treeData:response});
            //                     ruleSevie.getAuthByConditions(roleId,type).then(response=>{
            //                         let  selectedKeys=[];
            //                         if(response.resultCode!='3000'){
            //                             response.map((item,index)=>{
            //                                 selectedKeys.push(item.funcId);
            //                             })
            //                             this.setState({
            //                                 expandedKeys:selectedKeys,
            //                                 checkedKeys: selectedKeys,
            //                             });  
            //                     }          
            //                 });
            //             }
            //             });
            //         }
            //  }
            //  if(type=='dept'){
            //      //如果treeData不为空，根据人名称查人员选中事项
            //      if(this.state.treeData.length>0 && ''==isChange){
            //         ruleSevie.getAuthListByConditions(roleId,type).then(response=>{
            //             let  selectedKeys=[];
            //             if(response.resultCode!='3000'){
            //                 response.map((item,index)=>{
            //                     selectedKeys.push(item.funcId);
            //                 })
            //                 this.setState({
            //                     expandedKeys:selectedKeys,
            //                     checkedKeys: selectedKeys,
            //                 });  
            //             }                 
            //         });
            //      }else{
            //             //如果treeData为空，根据人与当前tabKey进行先查询treeData后查人员选中事项
            //             this.setState({treeData:[]});
            //             ruleSevie.getAuthTypeListByType().then(response=>{
            //                 if(response.resultCode!='3000'){
            //                     this.setState({treeData:response});
            //                     ruleSevie.getAuthListByConditions(roleId,type).then(response=>{
            //                         let  selectedKeys=[];
            //                         if(response.resultCode!='3000'){
            //                             response.map((item,index)=>{
            //                                 selectedKeys.push(item.funcId);
            //                             })
            //                             this.setState({
            //                                 expandedKeys:selectedKeys,
            //                                 checkedKeys: selectedKeys,
            //                             });   
            //                          }         
            //                      });
            //                 }
            //             });
            //     }
            //  }
             
        });
     }
     onChangeTab = (activeKey) => {
        this.setState({ activeKey:activeKey,treeData:[] },function () {
            let name=this.state.roleName;
            let roleId=this.state.roleId;
            if(''!=roleId){
                this.selectedOnchage(roleId,name,activeKey,'true');
             }
          });
             
      }
    saveSelectObject(){
            let param=[this.state.roleId,this.state.activeKey,this.state.checkedKeys];
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
            dataIndex: 'roleName',
            key: 'roleName',
            render: (text, record)=> {
                return <a href="javascript:;" onClick={()=>this.selectedOnchage(record.roleId,record.roleName,'','')} >{text}</a>;
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
                        checkStrictly
                    >
                    {this.renderTreeNodes(this.state.treeData)}
                     </Tree>
                  </div>   
        );
       
        return (
            <div id="page-wrapper">
            <Card title="角色列表"  style={{float:"left",width:"20%"}}>
                <Tooltip>
                    <Search
                        style={{ width: 190,marginBottom:'10px' ,marginLeft: '-20px', marginRight: '-30px', border: '0'}}
                        placeholder={this.state.roleName==''?'请输入...':this.state.roleName}
                        enterButton="查询"
                        onSearch={value => this.onSearch(value)}
                        onChange={(e) => this.onValueChange(e)}
                        value={this.state.roleName}
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
                    {contents}
                    {/* <Tabs  onChange={this.onChangeTab} tabPosition={this.state.tabPosition}>
                    {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>)}
                       
                    </Tabs> */}
                </TabPane>
                </Tabs>
            </Card>
             
            </div>
        )
    }
}

export default RuleInfo;