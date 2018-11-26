
import   HttpService  from '../util/HttpService.jsx';
export default class RuleService{
    //  查询 select 
    getSelectClassTree(){
      //  let url='/reportServer/select/getSelectClassTreeReact';
      let url = "reportServer/query/getQueryClassTree";
        return HttpService.post(url,{});
    }
    getAuthListByConditions(id,param){
        let url='/reportServer/auth/getAuthListByConditions';
        let params=[id,param];
        return HttpService.post(url,JSON.stringify(params));
    }

    //函数 function
    getFunctionClass(){
        let url='/reportServer/function1/getFunctionClass';
        return HttpService.post(url,{});
    }
    getAuthByConditions(id,param){
        let url='/reportServer/auth/getAuthByConditions';
        let params=[id,param];
        return HttpService.post(url,JSON.stringify(params));
    }
    getAuthByConditionsTable(id,param){
        let url='/reportServer/auth/getAuthByConditionsTable';
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
        let url='/reportServer/auth/getFunRuleListReact';
        let params={type:param};
        return HttpService.post(url,JSON.stringify(params));
    }
    //数据菜单
    getAllAuthTypeList(){
        let url='/reportServer/auth/getAllAuthTypeList';
        return HttpService.post(url,{});
    }

    getDataList(){
        let url='/reportServer/auth/getDataList';
        return HttpService.post(url,{});
    }

    getDepartmentList(){
        let url='/reportServer/auth/getDepartmentList';
        return HttpService.post(url,{});
    }

    getAuthTypeListByType(param){
         let url='/reportServer/authType/getAuthTypeListByType';
        return HttpService.post(url,JSON.stringify({authType:param}));
    }
    //保存select
    saveAuthRules(param){
        let url='/reportServer/auth/saveAuthRules';
        return HttpService.post(url,JSON.stringify(param));
    }
    getAllCube(){
        let url='/reportServer/auth/getAllCube';
        return HttpService.post(url,{});
    }
    getAllDashBoard(){
        let url='/reportServer/auth/getAllDashBoard';
        return HttpService.post(url,{});
    }
    
}