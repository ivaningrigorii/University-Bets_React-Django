import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack, MenuItem, FormControl, InputLabel, Select, } from '@mui/material';
import { useState, useEffect, } from 'react';
import axios from 'axios';
import _token from '../../AxiosTokens';


const AddGamer = ({ setChangeGamers, gamers, id_game, }) => {
    const [open, setOpen] = React.useState(false);
    const [ownTeams, setOwnTeams] = useState();
    const [selectTeam, setSelectTeam] = useState(1);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleGetOwnTeams = async () => {
        let token;
        await _token().then(async (res) => token = await res);

        return axios.get(("api/game/teams/min-data/"), {
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        })
            .then(async function (response) {
                let result = await response.data.results;
                gamers.map((g) => {
                    result.map((gr, index) => {
                        if (gr.id == g.team.id) {
                            delete result[index];
                            result = result.slice();
                        }
                    })
                })
                setOwnTeams(result);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        handleGetOwnTeams();
    }, [])

    const handleCreateGamer = async () => {
        if (selectTeam && ownTeams.length > 0) {
            let token;
            await _token().then(async (res) => token = await res);

            return axios.post(("api/game/gamer/"), {
                team: ownTeams[selectTeam - 1].id,
                game: id_game,
            }, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
            })
                .then(function (response) {
                    setChangeGamers(true);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }

    const handleCreate = () => {
        handleCreateGamer();
        setOpen(false);
    }

    return (
        <div>
            <Button onClick={handleClickOpen}
                sx={{ fontSize: { xs: 9, sm: 10, md: 12 }, }}
            >
                Добавить
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Записать команду"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Записать команду
                    </DialogContentText>
                    <Stack direction="column" justifyContent="center">
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Ваши команды</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectTeam}
                                label="Ваши команды"
                                onChange={(event) => setSelectTeam(event.target.value)}
                            >
                                {ownTeams && ownTeams.map((t, index) => {
                                    return (
                                        <MenuItem value={index + 1}>{t.name}</MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreate}>Записать</Button>
                    <Button onClick={handleClose} autoFocus>
                        Отмена
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default AddGamer;