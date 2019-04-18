
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
// 页面
import QuestionsList from './questionsList.jsx';
import Questions from './questions.jsx';
import AnswerList from './answerList.jsx';
import AnswerInfo from './answerInfo.jsx';
class QaRouter extends React.Component{
    render(){
        return (
            <Switch>
                 <Route path="/chat/questions/:qId" component={Questions} />
                 <Route path="/chat/questionsList" component={QuestionsList} />
                 <Route path="/chat/answer/:aId/:qId" component={AnswerInfo} />
                 <Route path="/chat/answerList/:qId" component={AnswerList} />
                 <Redirect exact from="/chat" to="/chat/questionsList"/> 
            </Switch>
        )
    }
}
export default QaRouter;