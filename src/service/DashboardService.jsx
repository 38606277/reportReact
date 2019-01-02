import HttpService from '../util/HttpService.jsx';
import  LocalStorge  from '../util/LogcalStorge.jsx';
const localStorge = new LocalStorge();


export default class DashboardService {
    constructor(){
    }
    // 获取函数列表
    getDashboardList(param) {
        let url = "reportServer/dashboard/getAllDashboard";
        return HttpService.post(url,JSON.stringify(param));
    }

    getDashboardInfo(dashboard_id){
        return HttpService.post('/reportServer/dashboard/getDashboardByID/'+dashboard_id,{});
    }

    saveDashboardInfo(Info){
        if(Info.dashboard_id=='null'){
            return HttpService.post('/reportServer/dashboard/createDashboard',JSON.stringify(Info));
        }else{
            return HttpService.post('/reportServer/dashboard/updateDashboard',JSON.stringify(Info));
        }
    }
    delDashboard(id){
        let param=[{dashboard_id:id}];
        return HttpService.post('/reportServer/dashboard/deleteDashboard',JSON.stringify(param));
    }

}