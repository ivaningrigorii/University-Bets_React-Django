import { 
    TextField, Box, Card, 
    CardContent, Stack, IconButton, 
    FormControl, InputAdornment, 
    OutlinedInput, InputLabel,

} from "@mui/material";
import { TypesCSS } from "../style";
import { DeleteOutline, } from "@mui/icons-material";
import { useCallback } from "react";
import ConstructorServices from '../../../../ConstructorServices';

const cs = new ConstructorServices();

const ATextInput = ({ answer, deleteAnswer, }) => {
    const classes = TypesCSS();

    const handleDelete = useCallback(event => {
        deleteAnswer(answer.id);
    }, [deleteAnswer,]);

    return (
        <Box>
            <Card className={classes.card_style} sx={{borderRadius: "25px",}}>
                <CardContent>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <FormControl size="small" fullWidth sx={{ m: 1 }}>
                            <InputLabel size="small" htmlFor="outlined-adornment-amount">Поле ввода</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                label="Свободный ввод..."
                            />
                        </FormControl>

                        <IconButton size="small" color="primary">
                            <DeleteOutline fontSize="inherit" onClick={handleDelete} />
                        </IconButton>


                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}
export default ATextInput;