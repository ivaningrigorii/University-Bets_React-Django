import { Card, CardContent, Box, Stack, } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { useCallback, useEffect, useRef, useState, } from 'react';
import {
    Clear, CloseFullscreen,
    OpenInFull, DriveFileRenameOutline,
    CheckTwoTone, Undo,
} from '@mui/icons-material';

import ConstructorServices from '../../../../ConstructorServices';
import { TypesCSS } from '../style';
import GetTypeAnswer from './GetTypeAnswer';

import CreateAnswer from '../../Answers/DialogCreateAnswer';
import { IconButton, TextField } from '@material-ui/core';

import EditQuestion from './EditQuestions/DialogEditQuestion';

const allow_fields_adding = [
    "AnswerSelectableTest",
];

const cs = new ConstructorServices();

const QuestTestSimpleEv = ({ question, deleteQuestion, saveQuestion, }) => {
    const classes = TypesCSS();
    const [answers, setAnswers] = useState();
    const [allow_fields, setAllowFields] = useState();
    const [full_screan, setFullScrean] = useState(true);

    const analizeQuestionAnswers = () => {
        let fields = allow_fields_adding.slice(0);

        if (answers.find(answer => answer.resourcetype === "AnswerTextInput"))
            fields = fields.filter(field => field != "AnswerTextInput");

        if (answers.find((answer) => answer.resourcetype === "AnswerSelectableTest"))
            fields = fields.filter(field => field != "AnswerSelectableSimple" &&
                field != "AnswerTextInput");

        setAllowFields(fields);
    };


    useEffect(() => {
        cs.getAllAnswers(question.id)
            .then((result) => {
                setAnswers(result.results);
            })
            .catch((error) => {
                alert("Данные невозможно получить!");
                console.log(error);
            })
    }, []);

    useEffect(() => {
        if (answers)
            analizeQuestionAnswers();
    }, [answers,]);

    useEffect(() => {
        console.log("изменили");
    }, [allow_fields,])

    const deleteAnswer = id => {
        cs.delAnswer(id)
            .then((res) => {
                setAnswers(answers.filter(answer => answer.id != id));
            })
            .catch((exp) => alert("Удаление невозможно!"))
    };

    const createAnswer = mydata => {
        mydata.question = question.id;
        cs.addAnswer(mydata)
            .then((answer) => {
                answers.push(answer);
                setAnswers(answers.slice(0));
            })
            .catch((exp) => {
                alert("Добавление невозможно, ошибка!");
                console.log(exp);
            });
    };

    const saveAnswer = answer => {
        return cs.changeAnswer(answer)
            .then(answer => {
                let ans = answers.slice(0);
                ans.forEach(function (val_in_ans, index) {
                    if (val_in_ans.id == answer.id)
                        this[index] = answer;
                }, ans);
                setAnswers(ans);
            })
            .catch((err) => {
                alert("Изменения не были внесены!");
                console.log(err);
            })
    }

    const handleDeleteQuestion = useCallback(() => {
        deleteQuestion(question.id);
    });

    const saveQuestion_ = useCallback((dataquestion) => {
        saveQuestion(dataquestion);
    });

    return (
        <Box>
            <Card className={classes.card_style} sx={{
                backgroundColor: " #c7decf ",
                borderRadius: "25px",
            }}>
                <CardContent>
                    <Stack container justifyContent="space-between" direction="row" align="center"
                        sx={{ marginLeft: "10px", marginRight: "10px", }}>
                        <p className={classes.header_question}>{question.text_question}</p>
                        <Stack container justifyContent="flex-end" direction="row" align="center">
                            <EditQuestion question={question} saveQuestion={saveQuestion_} />
                            {full_screan == true &&
                                <IconButton onClick={() => setFullScrean(false)} size="small">
                                    <CloseFullscreen fontSize="inherit" />
                                </IconButton>
                            } {full_screan == false &&
                                < IconButton onClick={() => setFullScrean(true)} size="small">
                                    <OpenInFull fontSize="inherit" />
                                </IconButton>
                            }
                            <IconButton size="small" color="secondary"
                                onClick={handleDeleteQuestion}>
                                <Clear fontSize="inherit" />
                            </IconButton>
                        </Stack>
                    </Stack>
                    {full_screan == true &&
                        <Box sx={{ border: 1, borderRadius: "25px", marginTop: "5px", }}>
                            <Box sx={{ marginLeft: "5px", marginRight: "5px", }}>
                                {answers &&
                                    answers.map((answer) => {
                                        let one_answer_with_a_choice = question.one_answer_with_a_choice;
                                        return GetTypeAnswer({
                                            answer, deleteAnswer,
                                            saveAnswer, one_answer_with_a_choice,
                                        });
                                    })}
                                <Stack
                                    container
                                    justifyContent="center"
                                    direction="row"
                                    align="center"
                                    sx={{ marginBottom: "1em", marginTop: "1em", }}
                                >
                                    <CreateAnswer createAnswer={createAnswer}
                                        allow_fields={allow_fields} />
                                </Stack>
                            </Box>
                        </Box>
                    }
                    <Stack justifyContent="flex-end" direction="row"
                        sx={{ marginRight: "10px", }}>
                        {question.option_required_for_pass == true &&
                            <p>Обязателен к прохождению</p>
                        }
                    </Stack>


                </CardContent>
            </Card>
        </Box >
    );
}
export default QuestTestSimpleEv;
