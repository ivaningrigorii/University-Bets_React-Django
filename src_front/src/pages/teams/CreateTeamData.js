import { Stack, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import FormData from "form-data";
import * as React from "react";
import { useState } from "react";
import _token from "../../AxiosTokens";

const CreateTeamData = ({ setCreateTeam }) => {
  const [open, setOpen] = React.useState(false);

  const [name, setName] = useState();
  const [description_team, setDescription] = useState();
  const [img, setImg] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateTeam = async (data) => {
    let token;
    await _token().then(async (res) => (token = await res));

    return axios
      .post("api/team/", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(function (response) {
        setCreateTeam(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleCreate = () => {
    if (name && description_team && img) {
      let data_ = new FormData();
      data_.append("name", name);
      data_.append("description", description_team);
      data_.append("img", img, img.name);
      handleCreateTeam(data_);
      setOpen(false);
    } else {
      alert("Не все значения введены!");
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Создать команду
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Создать команду"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Создание команды
          </DialogContentText>
          <Stack direction="column" justifyContent="center">
            <div>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file"
                multiple
                type="file"
                name="raised_button_file"
                onChange={(event) => setImg(event.target.files[0])}
              />
              <label htmlFor="raised-button-file">
                <Button component="span" sx={{ mt: "2vh" }}>
                  Выберите файл
                </Button>
              </label>
            </div>
            {img && <Typography>Выбран файл: {img.name}</Typography>}
            <TextField
              label="Название команды"
              onChange={(event) => setName(event.target.value)}
              sx={{ mt: "2vh" }}
            />
            <TextField
              label="Описание команды"
              onChange={(event) => setDescription(event.target.value)}
              sx={{ mt: "2vh" }}
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
    </div>
  );
};
export default CreateTeamData;
