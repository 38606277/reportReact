/*
* @Author: Rosen
* @Date:   2018-01-31 13:19:15
* @Last Modified by:   Rosen
* @Last Modified time: 2018-02-04 22:52:34
*/

import   HttpService  from '../util/HttpService.jsx';

class Task{
    // 获取代办任务列表
    getAgencyList(listParam){
      
        return HttpService.post('/reportServer/dataCollect/getMyTaskByUserId',
             JSON.stringify(listParam)
        );
    }
    //获取已办任务列表
    getTaskList(listParam){
      
        return HttpService.post(
           '/reportServer/dataCollect/getMyTaskListByUserId',
           JSON.stringify(listParam)
        );
    }
    // 获取任务详情-弃用
    getTaskInfo(taskId){
        return HttpService.post(
           '/reportServer/dataCollect/getTaskAndUsersByid',
            JSON.stringify({ taskId:taskId  })
        );
    }
     // 获取模板详情进行填报
     getTaskTemplate(taskId){
        return HttpService.post(
            '/reportServer/dataCollect/createHtmlForReact/'+taskId,
           null
        );
    }
     // 查看填报详情
     viewTaskTemplate(taskId){
        return HttpService.post(
            '/reportServer/dataCollect/viewHtmlForReact/'+taskId,
            null
        );
    }
}

export default Task;