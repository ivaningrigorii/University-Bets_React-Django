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
  FormControl,
  InputLabel,
  NativeSelect,
} from "@mui/material";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import _token from "../../AxiosTokens";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import MakeBet from "./MakeBet";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const titles = [
  "Описание мероприятия",
  "Место проведения",
  "Вид спорта",
  "Дата проведения",
];

const ListBetsAllow = () => {
  const [games, setGames] = useState();
  const [select_value, setSelectValue] = useState(1);

  const get_games = async () => {
    let token;
    await _token().then(async (res) => (token = await res));

    return axios
      .get("api/game/games/for-bets/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(function (response) {
        setGames(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    get_games();
  }, []);

  return (
    <Box>
      <Header />
      <ThemeProvider theme={theme}>
        <Container sx={{ minHeight: "105vh" }}>
          <Box marginTop={{ xs: 5, sm: 5, md: 10 }}>
            <Typography align="center">
              <b>Выбор игры</b>
            </Typography>
            <TableContainer component={Paper} marginTop="5px">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {titles.map((title) => {
                      return (
                        <TableCell
                          align="center"
                          sx={{ fontSize: { xs: 12, sm: 13, md: 15 } }}
                        >
                          {title}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {games && games.length > 0 && (
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell>
                        <FormControl fullWidth>
                          <InputLabel
                            variant="standard"
                            htmlFor="uncontrolled-native"
                          >
                            Выбор игры
                          </InputLabel>
                          <NativeSelect
                            defaultValue={select_value}
                            inputProps={{
                              name: "age",
                              id: "uncontrolled-native",
                            }}
                            onChange={(event) =>
                              setSelectValue(event.target.value)
                            }
                          >
                            {games &&
                              games.map((game, index) => (
                                <option value={index + 1}>
                                  {game.description}
                                </option>
                              ))}
                          </NativeSelect>
                        </FormControl>
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align="center"
                        sx={{ fontSize: { xs: 11, sm: 12, md: 14 } }}
                      >
                        {games[select_value - 1].place}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align="center"
                        sx={{ fontSize: { xs: 11, sm: 12, md: 14 } }}
                      >
                        {games[select_value - 1].sport}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align="center"
                        sx={{ fontSize: { xs: 11, sm: 12, md: 14 } }}
                      >
                        {new Date(
                          games[select_value - 1].date_game
                        ).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Box marginTop="15px">
              {(games && games.length > 0) && (
                <MakeBet id_game={games[select_value - 1].id} />
              )}
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <Footer />
    </Box>
  );
};
export default ListBetsAllow;
