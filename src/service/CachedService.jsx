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

    getCubeInfo(cube_id){
        return HttpService.post('/reportServer/cube/getCubeByID/'+cube_id,{});
    }

    
    delCube(id){
        let param=[{cube_id:id}];
        return HttpService.post('/reportServer/cube/deleteCube',JSON.stringify(param));
    }

    getDataAndalysisByqryId(qryid){
        let param={};
        return HttpService.post('/reportServer/cube/getCubeValueByID/'+qryid,JSON.stringify(param));
    }
}
