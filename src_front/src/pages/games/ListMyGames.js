import { useEffect, useState } from "react";
import _token from "../../AxiosTokens";
import {
    CardActions, CardMedia, Container, Typography,
    Box, Grid, Card, Button, CardContent, Stack,
    TextField,
} from "@mui/material";
import { reverse } from "named-urls";
import routes from "../../routes";
import axios from "axios";
import CreateTeamData from "./CreateTeamData";
import ChangeTeamData from "./ChangeTeamData";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { DateField, } from "@mui/x-date-pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const ListMyGames = () => {
    const [games, setGames] = useState();
    const [create_game, setCreateGame] = useState(false);
    const [change_game, setChange] = useState(false);

    const get_games = async () => {
        let token;
        await _token().then(async (res) => token = await res);

        return axios.get("api/game/my/all/", {
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        })
            .then(function (response) {
                setGames(response.data.results);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        get_games();

    }, []);

    useEffect(() => {
        if (create_game == true || change_game == true) {
            get_games();
            setCreateGame(false);
            setChange(false);
        }
    }, [create_game, change_game,]);

    const handleDel = async (id) => {
        let token;
        await _token().then(async (res) => token = await res);

        return axios.delete(("api/team/" + id + "/"), {
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        })
            .then(function (response) {
                setGames(games.filter(team => team.id != id));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <Box>
            <Header />
            <Container sx={{ minHeight: "105vh", }}>
                <Box marginTop={{ xs: 5, sm: 5, md: 15, }}>
                    {games &&
                        <Grid
                            container
                            rowSpacing={{ xs: 1, sm: 2, md: 3 }}
                            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                            justifyContent={{ xs: "center", sm: "flex-start", md: "flex-start" }}
                        >
                            {games.map((game) => {
                                return (
                                    <Grid key={game.id} item xs={12} sm={6} md={4} >
                                        <Card>
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                sx={{ objectFit: "cover", }}
                                                src={`data:image;base64,${game.img_base64}`}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {game.description}
                                                </Typography>
                                                <TextField type="datetime-local" 
                                                    size='small'
                                                    helperText="Дата игры"
                                                    value={game.date_game}
                                                />
                                                <Typography variant="body2" color="text.secondary">
                                                    Место проведения: {game.place}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Вид спорта: {game.sport}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>

                                                <Button size="small" onClick={() => handleDel(game.id)}>Отменить игру</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    }
                    <Stack direction="row" justifyContent="flex-end" marginTop="5px">
                        <CreateTeamData setCreateTeam={setCreateGame} />
                    </Stack>
                </Box>
            </Container >
            <Footer />
        </Box >
    );
}
export default ListMyGames;