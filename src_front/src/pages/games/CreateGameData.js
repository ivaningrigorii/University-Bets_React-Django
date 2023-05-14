import { Stack, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import * as React from "react";
import { useState } from "react";
import _token from "../../AxiosTokens";

const CreateGameData = ({ setCreateTeam: setCreateGame }) => {
  const [open, setOpen] = React.useState(false);
  const today = new Date();

  const [description, setDescription] = useState();
  const [place, setPlace] = useState();
  const [sport, setSport] = useState();
  const [date_game, setDateGame] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateGame = async (data) => {
    let token;
    await _token().then(async (res) => (token = await res));

    return axios
      .post("api/game/", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(function (response) {
        setCreateGame(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleCreate = () => {
    if (description && place && sport && date_game) {
      let data_ = {};
      data_["description"] = description;
      data_["place"] = place;
      data_["sport"] = sport;
      data_["date_game"] = date_game;
      handleCreateGame(data_);
      setOpen(false);
    } else {
      alert("Не все значения введены!");
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Создать игру
      </Button>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Создание игры"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Создание игры
            </DialogContentText>
            <Stack direction="column" justifyContent="center">
              <TextField
                label="Описание игры"
                onChange={(event) => setDescription(event.target.value)}
                sx={{ mt: "2vh" }}
              />
              <TextField
                label="Место проведения"
                onChange={(event) => setPlace(event.target.value)}
                sx={{ mt: "2vh" }}
              />
              <TextField
                label="Вид спорта"
                onChange={(event) => setSport(event.target.value)}
                sx={{ mt: "2vh" }}
              />
              <TextField
                type="datetime-local"
                id="start_time"
                helperText="Дата проведения"
                onChange={(event) => setDateGame(event.target.value)}
                inputProps={{ min: today.toISOString().slice(0, 16) }}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCreate}>Создать</Button>
            <Button onClick={handleClose} autoFocus>
              Отмена
            </Button>
          </DialogActions>
        </Dialog>
      </LocalizationProvider>
    </div>
  );
};
export default CreateGameData;
