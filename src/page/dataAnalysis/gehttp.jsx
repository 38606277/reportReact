import HttpService from '../../util/HttpService.jsx';

export default (url,obj)=>{
    return  HttpService.post(url,JSON.stringify({...obj}))
}