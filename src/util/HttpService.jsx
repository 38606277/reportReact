import 'whatwg-fetch';
import  LocalStorge  from './LogcalStorge.jsx';
const localStorge = new LocalStorge();
export default class HttpService {
    
    static getBaseUrl(){

        var url=window.getServerUrl();//"http://localhost:8080/";
        return url;
    }
    
    //
    static post(url,param){
        if((undefined==localStorge.getStorage('userInfo') && url!='/reportServer/user/encodePwd' && url!='/reportServer/user/Reactlogin') || (''==localStorge.getStorage('userInfo')  && url!='/reportServer/user/encodePwd' && url!='/reportServer/user/Reactlogin')){
            window.location.href='#login';
            return  new Promise((resolve, reject) => {});
        }else{
            const fullUrl = HttpService.getBaseUrl() + url;
            let opts = {
                method: 'POST',
                headers: {
                    credentials: JSON.stringify(localStorge.getStorage('userInfo') || '')
                },
                body: param
            };

            return fetch(fullUrl, opts).then((response) => {
                    //console.log(response.json())
                    return response.json();
                }).catch((error)=>{
                    return error.json();
                });
        }
    }

    get(){

    }

          
    }
