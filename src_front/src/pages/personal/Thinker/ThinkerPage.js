import {
  Box,
  Container,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
} from "@mui/material";
import axios from "axios";
import { reverse } from "named-urls";
import { useEffect, useState } from "react";
import _token from "../../../AxiosTokens";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import routes from "../../../routes";

const headers_ = ["Дата события", "Ожидаемый вариант", "Сумма ставки", "Итог"];

const ThinkerPage = () => {
  const [thinkData, setThinkData] = useState();
  const [money, setMoney] = useState();

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
        setMoney(response.data.money);
      })
      .catch(function (error) {
        return error;
      });
  };

  const getThinkData = async () => {
    let token;
    await _token().then(async (res) => (token = await res));

    return axios
      .get("api/v1/profile/hist/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setThinkData(response.data);
      })
      .catch(function (error) {
        return error;
      });
  };

  useEffect(() => {
    getMoney();
    getThinkData();
  }, []);

  var rounded = function (number) {
    return +number.toFixed(2);
  };

  return (
    <Box sx={{background: "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(81,252,70,1) 100%)"}}>
      <Header />
      <Container sx={{ minHeight: "105vh" }}>
        <Stack/>
        <Box marginTop={{ xs: 5, sm: 5, md: 15 }}>
          <Typography>Ваши денюжки: {money && rounded(money)}</Typography>
          <Box marginTop="10px" />
          <TableContainer component={Paper} marginTop="5px">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {headers_ &&
                    headers_.map((he) => {
                      return (
                        <TableCell
                          align="center"
                          sx={{ fontSize: { xs: 12, sm: 13, md: 15 } }}
                        >
                          <b>{he}</b>
                        </TableCell>
                      );
                    })}
                </TableRow>
              </TableHead>
              <TableBody>
                {(thinkData &&
                  thinkData.length > 0) &&
                  thinkData.map((think) => {
                    return (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          sx={{ fontSize: { xs: 11, sm: 12, md: 14 } }}
                        >
                          {think.date_game}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          sx={{ fontSize: { xs: 11, sm: 12, md: 14 } }}
                        >
                          {think.team_name}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          sx={{ fontSize: { xs: 11, sm: 12, md: 14 } }}
                        >
                          {think.bet_money}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          sx={{ fontSize: { xs: 11, sm: 12, md: 14 } }}
                        >
                          {think.result == true ? 
                            <Typography sx={{color: "green"}}>Победа</Typography>  :
                            <Typography sx={{color: "red"}}>Потеря</Typography>
                          }
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};
export default ThinkerPage;
