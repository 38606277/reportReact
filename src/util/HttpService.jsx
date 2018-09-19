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
        const fullUrl = HttpService.getBaseUrl() + url;
       // alert(fullUrl);
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
        });

    }

    get(){

    }

          
    }
