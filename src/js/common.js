    //增加行
    function addTableTr(){
        var ddd=$("tbody").find("tr:last")[0].cloneNode(true); //深度复制
        var len= $("tbody").find("tr").length;
        var inps = ddd.getElementsByTagName('input'); // 从tr 对象中获取所有input对象
        for(var i = 0, lens = inps.length; i < lens; i++) {
             inps[i].setAttribute("value",""); // 将每一个input的value置为空
        }
        var btn = ddd.getElementsByTagName('button')[0];
        btn.setAttribute("onclick","deletetr(this,null)");
        $("#tabid").append("<tr id='del"+len+"'>"+ddd.innerHTML+"</tr>");
    }
    //删除行
    function deletetr(obj,id){
        if($("tr[id^='del']").length<=1){
            alert("已经到最后一个了，您不能再删除了！");
            return false;
        }else{
            if(null!=id){
                var delid=$("#delId").val();
                if(""==delid || null==delid){
                    delid=id;
                }else{
                    delid=delid+","+id;
                }
                $("#delId").val(delid);
                $(obj).parent('td').parent('tr').remove();
            }else{
                $(obj).parent('td').parent('tr').remove();
            }
        }
    }
    //保存数据
    function GetValue(param){
        var params = serializeForm('tabid'); 
        $.ajax({
            url:"http://localhost:8080/reportServer/dataCollect/saveTaskInfo",
            type:"post",
            dataType    :  'json',
            contentType: "application/json;text/plain",
            data:JSON.stringify({'userId':$("#userId").val(),'taskId':$("#taskId").val(),
            'delId':$("#delId").val(),'isSubmit':param,'dataList':params}),
            success:function(data){
                if("true"==param || param){
                    alert("提交成功！");
                }else{
                    alert("保存成功！");
                }
               
               window.history.back(-1);
            },
            error:function(e){
                alert("保存失败！！");
               
            }
        });        
       
    }
   
    
    //获取指定form中的所有的<input>对象  
    function getElements(formId) {  
    var form = document.getElementById(formId);  
    var elements = new Array();  
    var tagElements = form.getElementsByTagName('input');  
    for (var j = 0; j < tagElements.length; j++){ 
        elements.push(tagElements[j]); 
    
    } 
    return elements;  
    }  
    
    //获取单个input中的【name,value】数组 
    function inputSelector(element) {  
    if (element.checked)  
    return [element.name, element.value];  
    }  
        
    function input(element) {  
    switch (element.type.toLowerCase()) {  
    case 'submit':  
    case 'hidden':  
    case 'password':  
    case 'text':  
        return [element.name, element.value];  
    case 'checkbox':  
    case 'radio':  
        return inputSelector(element);  
    }  
    return false;  
    }  
    
    //组合URL 
    function serializeElement(element) {  
    var parameter = input(element);  
    
    if (parameter) {  
    var key = encodeURIComponent(parameter[0]);  
    if (key.length == 0) return;  
    
    if (parameter[1].constructor != Array)  
        parameter[1] = [parameter[1]];  
        
    var values = parameter[1];  
    var results = [];  
    for (var i=0; i<values.length; i++) {  
        results.push(key + '=' + encodeURIComponent(values[i]));  
    }  
    return results.join('&');  
    }  
    }  
    
    //调用方法   
    function serializeForm(formId) {  
    var elements = getElements(formId);  
    var queryComponents = new Array();
    
    var fieldLength=$("#fieldLength").val()*1+1;
    var k=Math.ceil(elements.length/fieldLength);
    var j= 0;
    for(var i=1;i<=k;i++){
            var arr= new Array();
            var isAdd=0;
            for(j ; j < i*fieldLength; j++){
                var queryComponent = serializeElement(elements[j]);  
                if (queryComponent)
                var ddddd=queryComponent.split("=");
                var d1=ddddd[0];
                var d2=ddddd[1];
                var d=d1+':'+ d2;
                arr.push(d);
                if(""==d2 || null==d2){
                    isAdd++;
                }
            }
            if(isAdd!=fieldLength){
                queryComponents.push(arr);  
            }
        
    }
    return queryComponents; 
    }  
