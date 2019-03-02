import HttpService from '../util/HttpService.jsx';
export default class DictService {
    // 获取函数列表
    getDictList(listParam) {
        let url = "reportServer/dict/getDictList";  
        return HttpService.post(url,JSON.stringify(listParam));
    }
    getDictValue(id,vode){
        let url="reportServer/dict/getDictValueByDictID";
        
        return HttpService.post(url,JSON.stringify({"dict_id":id,"value_code":vode}));
    }
    saveDict(info){
        if(info.oldvalue_code=='null' || info.oldvalue_code==null){
            let url="reportServer/dict/createFuncDictValue";
            return HttpService.post(url,JSON.stringify(info));
        }else{
            let url="reportServer/dict/updateDictValue";
            return HttpService.post(url,JSON.stringify(info));
        }
    }
    deleteDict(param){
        let url="reportServer/dict/deleteDictValueByIDCode";
        return HttpService.post(url,JSON.stringify(param));
    }
    
}
