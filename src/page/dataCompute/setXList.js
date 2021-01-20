function getDay(day){
    var today = new Date();
    var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
    today.setTime(targetday_milliseconds); //注意，这行是关键代码
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    tMonth = doHandleMonth(tMonth + 1);
    tDate = doHandleMonth(tDate);
    return tMonth+"/"+tDate;
}
function doHandleMonth(month){
    var m = month;
    if(month.toString().length == 1){
     m = "0" + month;
    }
    return m;
}

export default (e,setxAxis)=>{
    const Dates=new Date()
    if(e==="近12小时"){
        let Hour =Dates.getHours()
        let arr=[Hour]
        for(let i=0;i<11;i+=1){
            let o=Hour-=1
            arr.push(o>0?o:Math.abs(o))
        }
        const newarr=arr.map(item=>{
                if(item===24){
                    return "00:00"
                }
            return item>9?item+": 00":"0"+item+": 00"
        })
        setxAxis(newarr)
    }
    if(e==="近1天"){
        let Hour =Dates.getHours()
        let arr=[Hour]
        for(let i=0;i<11;i+=1){
            let o=Hour+=1
            arr.push(o>24?o-24:o)
        }
        const newarr=arr.map(item=>{
                if(item===24){
                    return "00:00"
                }
            return item>9?item+": 00":"0"+item+": 00"
        })
        setxAxis(newarr)
    }
    if(e==="近7天"){
        let arr=[]
        for (let i=-6;i<=0;i+=1){
            arr.push(getDay(i))
        }
        setxAxis(arr)
    }
    if(e==="近30天"){
        let arr=[]
        for(let i=-29;i<=0;i+=2){
            arr.push(getDay(i))
        }
        setxAxis(arr)
    }
    if(e==="今日"){
        let arr =[]
        for (let i=0;i<24;i+=1){
            arr.push(i)
        }
        setxAxis(arr)
    }
    if(e==="本周"){
        setxAxis(["周一","周二","周三","周四","周五","周六","周日"])
    }
    if(e==="本月"){
        var d = new Date(Dates.getFullYear(),Dates.getMonth()+1,0);
        var days=d.getDate();
        let arr= []
        for(let i=1;i<=31;i+=1){
            arr.push(i)
        }
        setxAxis(arr)
    }
    if(e==="本年"){
        let arr= []
        for(let i=1;i<=12;i+=1){
            arr.push(i+"月")
        }
        setxAxis(arr)
    }
}