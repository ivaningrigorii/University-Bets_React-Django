import {
    TextField, Box, Card,
    CardContent, Stack,
    IconButton, FormControlLabel,
    Checkbox,
    Radio,
} from "@mui/material";
import { DeleteOutline, CheckTwoTone, Undo, Edit, } from "@mui/icons-material";
import { useState, useEffect, useCallback } from "react";
import { TypesCSS } from "../../style";
import ConstructorServices from '../../../../../ConstructorServices';

const cs = new ConstructorServices();


const ASelectableSimple = ({ answer, deleteAnswer, saveAnswer, one_answer_with_a_choice, }) => {
    const classes = TypesCSS();

    const [field_edit, setFieldEdit] = useState(false);
    const [isDisableWithoutChanged, setIsDisableChanged] = useState(true);

    const [text, setText] = useState(answer.text);

    const handleDelete = useCallback(event => {
        deleteAnswer(answer.id);
    }, [deleteAnswer,]);


    const handleChangeText = (event) => {
        if (isDisableWithoutChanged == true)
            setIsDisableChanged(false);
        setText(event.target.value);
    }

    const handleSave = () => {
        saveAnswer({
            text: text,
            id: answer.id,
        })
            .then((res) => {
                setIsDisableChanged(true);
                setFieldEdit(false);
            })

    };

    const handlEnterKeyUp = (e) => {
        e.which = e.which || e.keyCode;
        if (e.which == 13) {
            handleSave();
        }
    }

    const cancelChanging = () => {
        if (isDisableWithoutChanged == false) {
            let res = window.confirm("У вас есть несохранённые данные. Вернуться?");
            if (res == true) {
                setText(answer.text);
                setFieldEdit(false);
                setIsDisableChanged(true);
            }
        } else {
            setFieldEdit(false);
        }
    }
    return (
        <Box>      
            <Card className={classes.card_style} sx={{ borderRadius: "25px", }}>
                {field_edit == true &&
                    <CardContent>
                        <Stack direction="row" alignItems="center" justifyContent="flex-end">
                            <Stack onClick={cancelChanging} >
                                ответ на простой вопрос
                            </Stack>
                            <IconButton size="small" color="primary"
                                onClick={handleDelete}>
                                <DeleteOutline fontSize="inherit" />
                            </IconButton>
                            <IconButton size="small" color="primary"
                                disabled={isDisableWithoutChanged} onClick={handleSave}>
                                <CheckTwoTone fontSize="inherit" />
                            </IconButton>
                            <IconButton size="small" color="secondary"
                                onClick={cancelChanging}>
                                <Undo fontSize="inherit" />
                            </IconButton>
                        </Stack>
                    </CardContent>
                }
                {field_edit == false &&
                    <Stack direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        // onClick={() => setFieldEdit(true)}
                    >
                        <FormControlLabel control={one_answer_with_a_choice != true ?
                            <Checkbox size="small" /> : <Radio size="small" />
                        }
                            label={text}
                            sx={{ marginLeft: "5px", }}
                        />               
                    </Stack>
                }
            </Card>
        </Box>
    );
}
export default ASelectableSimple;