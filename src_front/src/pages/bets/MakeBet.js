import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import _token from "../../AxiosTokens";
import axios from "axios";
import MakeBetDialog from "./MakeBetDialog";

const MakeBet = ({ id_game }) => {
  const [gamers, setGamers] = useState();
  const [ratios, setRatios] = useState();
  const [myBets, setMyBets] = useState();
  const [money, setMoney] = useState();

  const getGamers = async () => {
    let token;
    await _token().then(async (res) => (token = await res));

    return axios
      .get("api/game/gamers/for-bets/" + id_game + "/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        return response.data["gamers"];
      })
      .catch(function (error) {
        return error;
      });
  };

  const find_ratio_for_gamer = (id_gamer) => {
    let find_ok = -1;
    ratios.map((rat, index) => {
      if (rat["gamer"] == id_gamer) {
        find_ok = index;
      }
    });
    return find_ok;
  };

  const getRatios = async () => {
    let token;
    await _token().then(async (res) => (token = await res));

    return axios
      .get("api/bet/ratios/" + id_game + "/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        return response.data.ratios;
      })
      .catch(function (error) {
        return error;
      });
  };

  const getMoney = async () => {
    let token;
    await _token().then(async (res) => (token = await res));

    return axios
      .get("api/v1/profile/money/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        return response.data.money;
      })
      .catch(function (error) {
        return error;
      });
  };

  const getBets = async () => {
    let token;
    await _token().then(async (res) => (token = await res));

    return axios
      .get("api/bet/in-game/" + id_game + "/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        return response.data.bet;
      })
      .catch(function (error) {
        return error;
      });
  };

  useEffect(() => {
    getGamers()
      .then(async (res) => setGamers(res))
      .catch((err) => console.log(err));
    getRatios()
      .then((res) => setRatios(res))
      .catch((err) => console.log(err));
    getBets()
      .then((res) => setMyBets(res))
      .catch((err) => console.log(err));
    getMoney()
      .then((res) => setMoney(res))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log(gamers);
    console.log(ratios);
    console.log(myBets);
  }, [gamers, ratios, myBets]);

  return (
    <Box>
      <Container sx={{ minHeight: "105vh" }}>
        <Box marginTop={{ xs: 5, sm: 5, md: 10 }}>
          <Typography align="center">
            Делание ставки. Ваша сумма: <b>{money && money}</b>
          </Typography>
          <TableContainer component={Paper} marginTop="5px">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="left"
                    sx={{ fontSize: { xs: 12, sm: 13, md: 15 } }}
                  >
                    <b>команды:</b>
                  </TableCell>
                  {gamers &&
                    gamers.map((gamer) => {
                      return (
                        <TableCell
                          key={gamer.id}
                          align="center"
                          sx={{ fontSize: { xs: 12, sm: 13, md: 15 } }}
                        >
                          <b>{gamer["team"]["name"]}</b>
                        </TableCell>
                      );
                    })}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell
                    align="left"
                    sx={{ fontSize: { xs: 12, sm: 13, md: 15 } }}
                  >
                    <b>коэффициенты:</b>
                  </TableCell>
                  {gamers &&
                    ratios &&
                    gamers.map((gamer) => {
                      return (
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          sx={{ fontSize: { xs: 11, sm: 12, md: 14 } }}
                        >
                          {find_ratio_for_gamer(gamer.id) >= 0
                            ? "X " +
                              ratios[find_ratio_for_gamer(gamer.id)].ratio
                            : "X ---"}
                        </TableCell>
                      );
                    })}
                </TableRow>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell
                    align="left"
                    sx={{ fontSize: { xs: 12, sm: 13, md: 15 } }}
                  >
                    <b>ваша ставка: </b>
                  </TableCell>
                  {gamers &&
                    myBets &&
                    gamers.map((gamer) => {
                      return (
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          sx={{ fontSize: { xs: 11, sm: 12, md: 14 } }}
                        >
                          {gamer.id == myBets.gamer && myBets.money}
                        </TableCell>
                      );
                    })}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {gamers && myBets && money && (
            <MakeBetDialog
              bet={myBets}
              gamers_={gamers}
              money_={money}
              setMoney={setMoney}
              setBet={setMyBets}
            />
          )}
        </Box>
      </Container>
    </Box>
  );
};
export default MakeBet;
