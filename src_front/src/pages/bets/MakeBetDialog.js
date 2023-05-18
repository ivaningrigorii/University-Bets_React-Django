import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Stack,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import _token from "../../AxiosTokens";

const MakeBetDialog = ({ bet, gamers_, money_, setMoney_, setBet_ }) => {
  const [open, setOpen] = React.useState(false);

  const [gamers, setGamers] = useState(gamers_);
  const [selectGamer, setSelectGamer] = useState();

  const [money, setMoney] = useState();

  const find_gamer_index_by_id = (id_gamer) => {
    let index_ = -1;
    gamers.map((gamer, index) => {
      if (gamer.id == id_gamer) {
        index_ = index;
      }
    });
    return index_;
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (bet) {
      setSelectGamer(find_gamer_index_by_id(bet.gamer) + 1);
      setMoney(bet.money);
    } else {
      setMoney(money_);
      setSelectGamer(1);
    }
  }, []);

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        sx={{ fontSize: { xs: 9, sm: 10, md: 12 } }}
      >
        Делание ставки
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Ставки"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ставки, ставки, ставки
          </DialogContentText>
          <Stack direction="column" justifyContent="center">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label"
                marginTop="20px">Исходы игры</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectGamer && selectGamer}
                label="Исход игры"
                onChange={(event) => setSelectGamer(event.target.value)}
              >
                {gamers &&
                  gamers.map((gamer, index) => {
                    return (
                      <MenuItem value={index + 1}>{gamer.team.name}</MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            <TextField
              id="outlined-number"
              label="Размер ставки"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              defaultValue={money && money}
              onChange={(event) => setMoney(event.target.value)}
              marginTop="40px"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button >Записать</Button>
          <Button onClick={handleClose} autoFocus>
            Отмена
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default MakeBetDialog;
