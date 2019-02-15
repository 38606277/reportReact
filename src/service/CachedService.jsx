import HttpService from '../util/HttpService.jsx';
import  LocalStorge  from '../util/LogcalStorge.jsx';
const localStorge = new LocalStorge();


export default class CachedService {
   
    constructor(){
      
    }
    // 获取函数列表
    getCubeList(param) {
        let url = "reportServer/cacheds/getAllCacheName";
        return HttpService.post(url,JSON.stringify(param));
    }

    getCubeInfo(cached_id){
        let param=[{cached_id:cached_id}];
        return HttpService.post('/reportServer/cacheds/getElementValuesByKey',JSON.stringify(param));
    }

    
    delCube(id){
        let param=[{cached_id:cached_id}];
        return HttpService.post('/reportServer/cacheds/deleteCube',JSON.stringify(param));
    }

    
}
