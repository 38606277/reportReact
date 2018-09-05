/*
* @Author: Rosen
* @Date:   2018-01-31 13:19:15
* @Last Modified by:   Rosen
* @Last Modified time: 2018-02-04 22:52:34
*/
import MUtil        from 'util/mm.jsx'

const _mm   = new MUtil();

class Task{
    // 获取代办任务列表
    getAgencyList(listParam){
      
        return _mm.request({
            type    : 'post',
            url     : '/reportServer/dataCollect/getMyTaskByUserId',
            data    : JSON.stringify(listParam)
        });
    }
    //获取已办任务列表
    getTaskList(listParam){
      
        return _mm.request({
            type    : 'post',
            url     : '/reportServer/dataCollect/getMyTaskListByUserId',
            data    : JSON.stringify(listParam)
        });
    }
    // 获取任务详情-弃用
    getTaskInfo(taskId){
        return _mm.request({
            type    : 'post',
            url     : '/reportServer/dataCollect/getTaskAndUsersByid',
            data    : JSON.stringify({ taskId:taskId  })
        });
    }
     // 获取模板详情进行填报
     getTaskTemplate(taskId){
        return _mm.request({
            type    : 'post',
            url     : '/reportServer/dataCollect/createHtmlForReact/'+taskId,
            data    : null
        });
    }
     // 查看填报详情
     viewTaskTemplate(taskId){
        return _mm.request({
            type    : 'post',
            url     : '/reportServer/dataCollect/viewHtmlForReact/'+taskId,
            data    : null
        });
    }
}

export default Task;