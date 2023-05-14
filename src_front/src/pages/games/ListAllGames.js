import {
    Box,
    Container,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
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
import CreateGameData from "./CreateGameData";
import GamerCells from "./GamersCells";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const titles = [
  "Описание мероприятия",
  "Место проведения",
  "Вид спорта",
  "Дата проведения",
  "Участники",
];

const ListAllGames = () => {
  const [games, setGames] = useState();
  const [create_game, setCreateGame] = useState(false);
  const [change_game, setChange] = useState(false);

  const get_games = async () => {
    let token;
    await _token().then(async (res) => (token = await res));

    return axios
      .get("api/game/all/", {
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

  useEffect(() => {
    if (create_game == true || change_game == true) {
      get_games();
      setCreateGame(false);
      setChange(false);
    }
  }, [create_game, change_game]);

  const handleDel = async (id) => {
    let token;
    await _token().then(async (res) => (token = await res));

    return axios
      .delete("api/game/" + id + "/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(function (response) {
        setGames(games.filter((game) => game.id != id));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Box>
      <Header />
      <ThemeProvider theme={theme}>
        <Container sx={{ minHeight: "105vh" }}>
          <Box marginTop={{ xs: 5, sm: 5, md: 15 }}>
            <Typography align="center">
              Созданные вами актуальные игры
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
                  {games &&
                    games.map((game) => {
                      let row_values = [
                        game.description,
                        game.place,
                        game.sport,
                        new Date(game.date_game).toLocaleString(),
                      ];
                      return (
                        <TableRow
                          key={game.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          {row_values.map((val) => (
                            <TableCell
                              component="th"
                              scope="row"
                              align="center"
                              sx={{ fontSize: { xs: 11, sm: 12, md: 14 } }}
                            >
                              {val}
                            </TableCell>
                          ))}

                          <GamerCells
                            id_game={game.id}
                            stat={game.team_statistic}
                          />
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <Stack direction="row" justifyContent="flex-end" marginTop="5px">
              <CreateGameData setCreateTeam={setCreateGame} />
            </Stack>
          </Box>
        </Container>
      </ThemeProvider>
      <Footer />
    </Box>
  );
};
export default ListAllGames;
