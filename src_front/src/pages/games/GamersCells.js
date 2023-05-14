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

  const handleDel = async (id) => {
    let token;
    await _token().then(async (res) => (token = await res));

    return axios
      .delete("api/game/gamer/other/" + id + "/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(function (response) {
        setGamers(gamers.filter((gamer) => gamer.id != id));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <TableCell
      component="th"
      scope="row"
      align="center"
      sx={{ fontSize: { xs: 11, sm: 12, md: 14 } }}
    >
      {gamers && gamers.length == 0 && (
        <AddGamer
          setChangeGamers={setChangeGamers}
          gamers={gamers}
          id_game={id_game}
        />
      )}{" "}
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
                {gamer.team.is_own == true && (
                  <Button onClick={() => handleDel(gamer.id)}>Убрать</Button>
                )}
              </Stack>
            ))}
          {gamers && gamers.length < 2 && (
            <AddGamer
              setChangeGamers={setChangeGamers}
              gamers={gamers}
              id_game={id_game}
            />
          )}
        </Stack>
      )}
    </TableCell>
  );
};
export default GamerCells;
