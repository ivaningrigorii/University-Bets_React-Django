import { makeStyles } from '@material-ui/core/styles';
import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, FormControl, FormControlLabel, InputLabel,
    MenuItem, Select, Switch, IconButton,
} from '@mui/material';
import React, { useCallback } from 'react';
import { ControlPoint, } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: '40vw',
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: "40vw",
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
}));

//дефолтные варинты вопросов при создании
const QSimple = {
    text_question: "Это текст вопроса по умолчанию",
    survey: 0,
    one_answer_with_a_choice: false,
    option_required_for_pass: true,
    resourcetype: "QuestionSimple",
}
const QTest = {
    text_question: "Это текст вопроса по умолчанию",
    survey: 0,
    one_answer_with_a_choice: false,
    option_required_for_pass: true,
    resourcetype: "QuestionTestSimpleEv",
}


const CreateQuestion = ({ createQuestion, poll_type, }) => {
    const default_variats_ = [QSimple, QTest];

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [selectAnswer, setSelectAnswer] = React.useState(()=>{
        switch (poll_type) {
            case "SurveySimple":
                return 1;
            case "SurveyTest":
                return 2;
        }
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSelectAnswer = (event) => {
        setSelectAnswer(event.target.value);
    };

    const addValue = useCallback(event => {
        let mydata = default_variats_[selectAnswer - 1];
        createQuestion(mydata);
        setOpen(false);
    });

    return (
        <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen} color="secondary"
                sx={{ marginTop: "5vh", }}>
                Добавить вопрос
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">Добавление ответа</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Установите тип вопроса
                    </DialogContentText><br /><br />
                    <form className={classes.form} noValidate>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="max-width">Тип ответа</InputLabel>

                            {poll_type === "SurveySimple" &&
                                <Select autoFocus value={selectAnswer} onChange={handleSelectAnswer}>
                                    <MenuItem value="1">Простой вопрос</MenuItem>
                                </Select>
                            }

                            {poll_type === "SurveyTest" &&
                                <Select autoFocus value={selectAnswer} onChange={handleSelectAnswer}>
                                    <MenuItem value="1">Простой вопрос</MenuItem>
                                    <MenuItem value="2">Тестовый вопрос</MenuItem>
                                </Select>
                            }

                        </FormControl>
                        <Button size='small' onClick={addValue}>
                            Добавить
                        </Button>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Отмена
                    </Button>
                </DialogActions>
            </Dialog >
        </React.Fragment >
    );
}
export default CreateQuestion;