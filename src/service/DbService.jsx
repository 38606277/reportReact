import HttpService from '../util/HttpService.jsx';



export default class DbService {
   
    constructor(){
      
    }
    // 获取函数列表
    getDbList() {

        let url = "reportServer/DBConnection/ListAll";
        let param = {
        };
  
        return HttpService.post(url,param);
    }

}
