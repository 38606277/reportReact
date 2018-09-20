import HttpService from '../util/HttpService.jsx';
import  LocalStorge  from '../util/LogcalStorge.jsx';
const localStorge = new LocalStorge();


export default class FunctionService {
   
    constructor(){
      
    }
    // 获取函数列表
    getFunctionList() {

        let url = "reportServer/function/getAllFunctionName";
        let param = {
            name: 'Hubot',
            login: 'hubot'
        };
  
        return HttpService.post(url,param);
    }
    // 获取函数列表
    getFunctionByID(funcid) {

        let url = "reportServer/function/getFunctionByID/"+funcid;
        let param = {
            
        };
  
        return HttpService.post(url,param);
    }

      // 获取SQL的输入输出参数
      getSqlInOut(aSQL) {

        let url = "reportServer/sql/getInputOutputParas";
        let param = {
            sqlType: "sql",
            sql:aSQL
        };
  
        return HttpService.post(url, JSON.stringify(param));
    }
    // 保存一个函数定义
    CreateFunction(jFunc) {

        let url = "reportServer/function/saveUserSql";
        // let param = {
        //     sqlType: "sql",
        //     sql:aSQL
        // };
  
        return HttpService.post(url, JSON.stringify(jFunc));
    }

}
