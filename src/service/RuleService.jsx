
import   HttpService  from '../util/HttpService.jsx';
export default class RuleService{
    // 查询 select
    getSelectClassTree(){
        let url='/reportServer/select/getSelectClassTreeReact';
        return HttpService.post(url,{});
    }
    getAuthListByConditions(id,param){
        let url='/reportServer/rule/getAuthListByConditions';
        let params=[id,param];
        return HttpService.post(url,JSON.stringify(params));
    }

    //函数 function
    getFunctionClass(){
        let url='/reportServer/function/getFunctionClassReact';
        return HttpService.post(url,{});
    }
    getAuthByConditions(id,param){
        let url='/reportServer/rule/getAuthByConditions';
        let params=[id,param];
        return HttpService.post(url,JSON.stringify(params));
    }
    
    //模板 
    getDirectory(){
        let url='/reportServer/template/getDirectory';
        return HttpService.post(url,{});
    }
   
    //功能、网站菜单
    getFunRuleList(param){
        let url='/reportServer/rule/getFunRuleListReact';
        let params={type:param};
        return HttpService.post(url,JSON.stringify(params));
    }
    //数据菜单
    getAllAuthTypeList(){
        let url='/reportServer/authType/getAllAuthTypeList';
        return HttpService.post(url,{});
    }

    getDataList(){
        let url='/reportServer/rule/getDataList';
        return HttpService.post(url,{});
    }

    getDepartmentList(){
        let url='/reportServer/rule/getDepartmentList';
        return HttpService.post(url,{});
    }

    getAuthTypeListByType(param){
         let url='/reportServer/authType/getAuthTypeListByType';
        return HttpService.post(url,JSON.stringify({authType:param}));
    }
    //保存select
    saveAuthRules(param){
        console.log(param);
        let url='/reportServer//rule/saveAuthRules';
        return HttpService.post(url,JSON.stringify(param));
    }
    
}