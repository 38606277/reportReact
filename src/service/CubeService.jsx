import HttpService from '../util/HttpService.jsx';
import  LocalStorge  from '../util/LogcalStorge.jsx';
const localStorge = new LocalStorge();


export default class CubeService {
   
    constructor(){
      
    }
    // 获取函数列表
    getCubeList(param) {
        let url = "reportServer/cube/getAllCube";
        return HttpService.post(url,JSON.stringify(param));
    }

    getCubeInfo(cube_id){
        return HttpService.post('/reportServer/cube/getCubeByID/'+cube_id,{});
    }

    saveCubeInfo(cubeInfo){
        if(cubeInfo.cube_id=='null'){
            return HttpService.post('/reportServer/cube/createCube',JSON.stringify(cubeInfo));
        }else{
            return HttpService.post('/reportServer/cube/updateCube',JSON.stringify(cubeInfo));
        }
    }
    delCube(id){
        let param=[{cube_id:id}];
        return HttpService.post('/reportServer/cube/deleteCube',JSON.stringify(param));
    }

}
