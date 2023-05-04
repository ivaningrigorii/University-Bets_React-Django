import _token from '../../../../AxiosTokens';
import axios from 'axios';
import { reverse } from 'named-urls';

//тут пока что будут все axios запросы этого модуля

class ConstructorServices {

    constructor(){}

    //опрос
    getPollOptions(id) {
        return axios.get(reverse("api/v1/manage/surv/survey-header/:id/", {id: id, }), {
            headers: { 'Authorization': 'Bearer ' + _token(), }
        })
        .then((response)=>{
            return(response.data);
        })
        .catch((error)=>{
            console.log("ошибочка");
            return Promise.reject(error);
        })
    }

    updateIsPublished(id, option_is_published) {
        return axios.patch(reverse("api/v1/manage/surv/survey-header/:id/", {id:id}), {
            option_is_published: option_is_published,
        }, {
            headers: { 'Authorization': 'Bearer ' + _token(), }
        })
        .then((response) => {
            return(Promise.resolve);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
    }

    //вопросы

    getAllQuestions(idPoll) {
        let path = reverse("api/v1/manage/quest/questions-survey/:id/", {id: idPoll});
        return axios.get(path, {
            headers: { 'Authorization': 'Bearer ' + _token(), }
        })
        .then((respone)=>{ return Promise.resolve(respone.data);})
        .catch((error)=>{ return Promise.reject(error);})
    }

    createQuestion(data) {
        return axios.post('api/v1/manage/quest/question/', data, {
            headers: { 'Authorization': 'Bearer ' + _token(), }
        },)
            .then((response) => {
                return Promise.resolve(response.data);
            } )
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    deleteQuestion(id) {
        let path = reverse("api/v1/manage/quest/question/:id/", {id: id});
        return axios.delete(path, {
            headers: { 'Authorization': 'Bearer ' + _token(), }
        })
        .then((respone)=>{ return Promise.resolve(respone.data);})
        .catch((error)=>{ return Promise.reject(error);})
    }

    saveQuestion(dataquestion) {
        let path = reverse("api/v1/manage/quest/question/:id/", {id: dataquestion.id});
        return axios.patch(path, dataquestion, {
            headers: { 'Authorization': 'Bearer ' + _token(), }
        })
        .then((respone)=>{ return Promise.resolve(respone.data);})
        .catch((error)=>{ return Promise.reject(error);})
    }

    //ответы
    getAllAnswers (id) {
        let path = reverse("api/v1/manage/ans/answers-question/:id/", {id: id});
        return axios.get(path, {
            headers: { 'Authorization': 'Bearer ' + _token(), }
        })
        .then((respone)=>{ return Promise.resolve(respone.data);})
        .catch((error)=>{ return Promise.reject(error);})
    }

    delAnswer(id) {
        let path = reverse("api/v1/manage/ans/answer/:id/", {id: id});
        return axios.delete(path, {
            headers: { 'Authorization': 'Bearer ' + _token(), }
        })
        .then((respone)=>{ return Promise.resolve(respone.data);})
        .catch((error)=>{ return Promise.reject(error);})
    }

    changeAnswer(data) {
        let path = reverse("api/v1/manage/ans/answer/:id/", {id: data.id});
        return axios.patch(path, data, {
            headers: { 'Authorization': 'Bearer ' + _token(), }
        })
        .then((respone)=>{ return Promise.resolve(respone.data);})
        .catch((error)=>{ return Promise.reject(error);})
    }

    addAnswer(data) {
        return axios.post("api/v1/manage/ans/answer/", data, {
            headers: { 'Authorization': 'Bearer ' + _token(), }
        })
        .then((respone)=>{ return Promise.resolve(respone.data);})
        .catch((error)=>{ return Promise.reject(error);})
    }



}
export default ConstructorServices;