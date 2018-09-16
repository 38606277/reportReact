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
            func_id: funcid
        };
  
        return HttpService.post(url,param);
    }

}
