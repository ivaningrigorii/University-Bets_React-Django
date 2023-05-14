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
import { useEffect, useState } from "react";
import _token from "../../AxiosTokens";

const ChangeTeamData = ({ setChange, team }) => {
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

  useEffect(() => {
    setName(team.name);
    setDescription(team.description);
  }, []);

  const handleCreateTeam = async (data) => {
    let token;
    await _token().then(async (res) => (token = await res));

    return axios
      .patch("api/team/" + team.id + "/", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(function (response) {
        setChange(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChange = () => {
    let data_ = new FormData();
    let data = {};

    if (img) {
      data_.append("img", img, img.name);
      if (name && name !== team.name) data_.append("name", name);
      if (description_team && description_team !== team.description)
        data_.append("description", description_team);

      handleCreateTeam(data_);
    } else {
      if (name && name !== team.name) data["name"] = name;
      if (description_team && description_team !== team.description)
        data["description"] = description_team;
      if (data) {
        handleCreateTeam(data);
      }
    }

    setOpen(false);
  };

  return (
    <div>
      <Button size="small" onClick={handleClickOpen}>
        Изменить
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
              defaultValue={name}
              onChange={(event) => setName(event.target.value)}
              sx={{ mt: "2vh" }}
            />
            <TextField
              label="Описание команды"
              defaultValue={description_team}
              onChange={(event) => setDescription(event.target.value)}
              sx={{ mt: "2vh" }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleChange}>Изменить</Button>
          <Button onClick={handleClose} autoFocus>
            Отмена
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default ChangeTeamData;
