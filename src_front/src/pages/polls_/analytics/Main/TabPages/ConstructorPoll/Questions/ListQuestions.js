import { useEffect, useState, useRef } from "react";
import ConstructorServices from '../../../ConstructorServices';
import { Box, Stack } from "@mui/material";

import QuestSimple from "./Base/QuestionSimple";
import QuestTestSimpleEv from './Base/QuestionTestSimpleEv';
import AnalyticsCard from "../../../../components/AnalyticsCard";
import CreateQuestion from "./DialogCreateQuestion";


const cs = new ConstructorServices();

const ListQuestions = ({ idPoll, poll_type, }) => {

    const [questions, setQuestions] = useState();

    const type_question = (question) => {
        let resourcetype = question.resourcetype;
        if (resourcetype === "QuestionSimple")
            return <QuestSimple key={question.id} question={question}
                deleteQuestion={deleteQuestion} saveQuestion={saveQuestion}/>;
        if (resourcetype === "QuestionTestSimpleEv")
            return <QuestTestSimpleEv key={question.id} question={question}
                deleteQuestion={deleteQuestion} saveQuestion={saveQuestion}/>;
    }

    useEffect(() => {
        console.log(idPoll);
        cs.getAllQuestions(idPoll)
            .then((result) => {
                console.log(result);
                setQuestions(result.results);
            })
            .catch((error) => {
                console.log(error);
                alert("Данные невозможно получить!");
            })
    }, []);

    const createQuestion = (mydata) => {
        mydata.survey = idPoll;
        cs.createQuestion(mydata)
            .then(res => {
                let questions_ = questions.slice(0);
                questions_.push(res);
                setQuestions(questions_);
            })
            .catch(err => {
                alert("Ошибка, значения не были добавлены!");
                console.log(err);
            })
    }

    const deleteQuestion = (id) => {
        cs.deleteQuestion(id)
            .then((res) => {
                setQuestions(questions.filter(quest => quest.id != id));
            })
            .catch(err => {
                console.log(err);
                alert("Ошибка, удаление невозможно!");
            })
    }

    const saveQuestion = (dataquestion) => {
        return cs.saveQuestion(dataquestion)
            .then(question => {
                let ques = questions.slice(0);
                ques.forEach(function (val_in_ans, index) {
                    if (val_in_ans.id == question.id)
                        this[index] = question;
                }, ques);
                setQuestions(ques);
            })
            .catch((err) => {
                alert("Изменения не были внесены!");
                console.log(err);
            })
    }

    return (
        <Box>
            {questions &&
                questions.map((question) => {
                    return (
                        <Box key={question.id}>
                          
                            {type_question(question, deleteQuestion, saveQuestion)}
                        </Box>
                    );
                })}
            {/* <Stack direction="row" justifyContent="center" alignContent="center">
                <CreateQuestion createQuestion={createQuestion} poll_type={poll_type} />
            </Stack> */}

            <Box sx={{ marginTop: "5vh" }} />
        </Box>
    )
}
export default ListQuestions;