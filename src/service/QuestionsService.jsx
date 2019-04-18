import   HttpService  from '../util/HttpService.jsx';
class QuestionsService{
    //问题列表
    getQuestionList(listParam){
        return HttpService.post(
            '/reportServer/questions/getQuestionsList',
            JSON.stringify(listParam)
         );
    }
    getQuestionInfo(pid){
        return HttpService.post('/reportServer/questions/getQuestionsByID',pid);
    }
    saveQuestionInfo(qInfo){
        if(qInfo.ai_question_id=='null'){
            return HttpService.post('/reportServer/questions/createQuestion',JSON.stringify(qInfo));
        }else{
            return HttpService.post('/reportServer/questions/updateQuestion',JSON.stringify(qInfo));
        }
    }
    deleteQuestion(id){
        return HttpService.post('/reportServer/questions/deleteQuestion',id);
    }
    //回答列表
    getAnswerList(question_id,param){
        return HttpService.post('/reportServer/questions/getAnswerListByqID/'+question_id,JSON.stringify(param));
    }
    getAnswerId(id){
        return HttpService.post('/reportServer/questions/getAnswerByID',id);
    }
    saveAnswerInfo(aInfo){
        if(aInfo.answer_id=='null'){
            return HttpService.post('/reportServer/questions/createAnswer',JSON.stringify(aInfo));
        }else{
            return HttpService.post('/reportServer/questions/updateAnswer',JSON.stringify(aInfo));
        }
    }
    deleteAnswer(id){
        return HttpService.post('/reportServer/questions/deleteAnswer',id);
    }
}

export default QuestionsService;