import HttpService from '../util/HttpService.jsx';
export default class QueryService {
    // 获取函数列表
    getCategoryList() {
        let url = "reportServer/select/getSelectClass";
        let param = {};  
        return HttpService.post(url,param);
    }
    getReportNameList(name){
        let url="reportServer/select/getSelectName/"+name;
        return HttpService.post(url,{});
    }
    getQueryCriteria(selectClassId,selectID){
        let url="reportServer/select/getSelectParam/"+selectClassId+"/"+selectID;
        return HttpService.post(url,{});
    }
    execSelect(selectClassId,selectID,param){
        let url="reportServer/select/execSelect/"+selectClassId+"/"+selectID;
        return HttpService.post(url,JSON.stringify(param));
    }
    getDictionaryList(param,page){
        let url="reportServer/dictionary/execlDictionary/"+param;
        return HttpService.post(url,JSON.stringify(page));
    }
}
