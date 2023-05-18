import {
    Box,
    Button,
    Stack,
    TableCell
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import _token from "../../AxiosTokens";
import AddGamer from "./AddGamer";

const GamerCells = ({ id_game, stat }) => {
  const [gamers, setGamers] = useState();
  const [this_stat, setThisStat] = useState(stat);
  const [change_gamers, setChangeGamers] = useState(false);

  const get_gamers = async () => {
    let token;
    await _token().then(async (res) => (token = await res));
    console.log(id_game);

    return axios
      .get("api/game/gamer/" + id_game + "/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(function (response) {
        return response.data.gamers;
      })
      .catch(function (error) {
        console.log(error);
        return error;
      });
  };

  useEffect(() => {
    get_gamers()
      .then(async (res) => {
        setGamers(res);
        console.log(await res);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    if (change_gamers == true) {
      get_gamers()
        .then(async (res) => {
          setGamers(res);
          setChangeGamers(false);
          console.log(await res);
        })
        .catch((err) => {});
    }
  }, [change_gamers]);

  return (
    <TableCell
      component="th"
      scope="row"
      align="center"
      sx={{ fontSize: { xs: 11, sm: 12, md: 14 } }}
    >
      {gamers && gamers.length > 0 && (
        <Stack
          sx={{ fontSize: { xs: 11, sm: 12, md: 14 } }}
          justifyContent="flex-start"
        >
          {gamers &&
            gamers.map((gamer) => (
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="baseline"
              >
                <Box>{gamer.team.name}</Box>
              </Stack>
            ))}
        </Stack>
      )}
    </TableCell>
  );
};
export default GamerCells;
