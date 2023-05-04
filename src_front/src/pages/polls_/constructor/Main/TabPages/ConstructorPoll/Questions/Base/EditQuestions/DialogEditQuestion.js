import { makeStyles } from '@material-ui/core/styles';
import {
    Button, Dialog, DialogActions,
    DialogContent, InputLabel,
    IconButton, TextField, DialogTitle,
    FormControl, FormGroup, FormControlLabel,
    Switch,
} from '@mui/material';
import { DriveFileRenameOutline } from '@mui/icons-material';

import React, { useCallback, useState, } from 'react';


const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: "40vw",
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
}));


const EditQuestion = ({ saveQuestion, question, }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const [text_question, setTextQuestion] = useState(question.text_question);
    const [one_answer_with_a_choice, setOneAnswerWithAChoice] = useState(
        question.one_answer_with_a_choice
    );
    const [option_required_for_pass, setRequiredForPass] = useState(
        question.option_required_for_pass
    );
    const [ready_to_save, setReadyToSave] = useState(false);

    const handleChangeText = (event) => {
        if (ready_to_save == false)
            setReadyToSave(true);
        setTextQuestion(event.target.value);
    }


    const handleChangeCountChoice = () => {
        if (ready_to_save == false)
            setReadyToSave(true);
        setOneAnswerWithAChoice(one_answer_with_a_choice == true ? false : true);
    }

    const handleChangeRequiredPass = () => {
        if (ready_to_save == false)
            setReadyToSave(true);
        setRequiredForPass(option_required_for_pass == true ? false : true);
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const editQ = useCallback(() => {
        if (ready_to_save) {
            saveQuestion({
                id: question.id,
                text_question: text_question,
                one_answer_with_a_choice: one_answer_with_a_choice,
                option_required_for_pass: option_required_for_pass,
            });
        }
        setOpen(false);
    });

    return (
        <React.Fragment>
            <IconButton size="small" onClick={handleClickOpen}>
                <DriveFileRenameOutline />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">Редакция вопроса</DialogTitle>

                <DialogContent>
                    <FormGroup className={classes.formControl}>
                        <TextField size="small" label="Текст вопроса"
                            defaultValue={text_question} onChange={handleChangeText}
                            sx={{ marginTop: "1em", width: "40vw", }} />

                        <FormControlLabel
                            control={question.one_answer_with_a_choice == true ?
                                <Switch color="warning" defaultChecked
                                    onChange={handleChangeCountChoice} /> :
                                <Switch color="warning" 
                                    onChange={handleChangeCountChoice} />
                            }
                            label="Можно ответить только на 1 вопрос"
                        />
                        <FormControlLabel
                            control={question.option_required_for_pass == true ?
                                <Switch color="secondary" defaultChecked
                                    onChange={handleChangeRequiredPass}
                                /> :
                                <Switch color="secondary"
                                    onChange={handleChangeRequiredPass}
                                />
                            }
                            label="Обязателен для прохождения опроса"
                        />
                    </FormGroup>
                </DialogContent>

                <DialogActions>
                    <Button size='small' onClick={editQ} disable={!ready_to_save}>
                        Сохранить
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Отмена
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
export default EditQuestion;