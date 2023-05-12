import { useEffect, useState } from "react";
import _token from "../../AxiosTokens";
import {
    CardActions, CardMedia, Container, Typography,
    Box, Grid, Card, Button, CardContent, Stack,
} from "@mui/material";
import { reverse } from "named-urls";
import routes from "../../routes";
import axios from "axios";
import CreateTeamData from "./CreateTeamData";
import ChangeTeamData from "./ChangeTeamData";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const TeamsCats = () => {
    const [teams, setTeams] = useState();
    const [create_team, setCreateTeam] = useState(false);
    const [change_team, setChange] = useState(false);

    const get_teams = async () => {
        let token;
        await _token().then(async (res) => token = await res);

        return axios.get("api/team/all/", {
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        })
            .then(function (response) {
                setTeams(response.data.results);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        get_teams();
    }, []);

    useEffect(() => {
        if (create_team == true || change_team == true) {
            get_teams();
            setCreateTeam(false);
            setChange(false);
        }
    }, [create_team, change_team,]);

    const handleDel = async (id) => {
        let token;
        await _token().then(async (res) => token = await res);

        return axios.delete(("api/team/" + id + "/"), {
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        })
            .then(function (response) {
                setTeams(teams.filter(team => team.id != id));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleChange = (id) => {
        window.location.replace(reverse(routes.teams.change, { id: id }));
    }

    return (
        <Box>
            <Header />
            <Container sx={{ minHeight: "105vh", }}>
                <Box marginTop={{ xs: 5, sm: 5, md: 15, }}>
                    {teams &&
                        <Grid
                            container
                            rowSpacing={{ xs: 1, sm: 2, md: 3 }}
                            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                            justifyContent={{ xs: "center", sm: "flex-start", md: "flex-start" }}
                        >
                            {teams.map((team) => {
                                return (
                                    <Grid key={team.id} item xs={12} sm={6} md={4} >
                                        <Card>
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                sx={{ objectFit: "cover", }}
                                                src={`data:image;base64,${team.img_base64}`}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {team.name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {team.description}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <ChangeTeamData setChange={setChange} team={team} />
                                                <Button size="small" onClick={() => handleDel(team.id)}>Удалить</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    }
                    <Stack direction="row" justifyContent="flex-end" marginTop="5px">
                        <CreateTeamData setCreateTeam={setCreateTeam} />
                    </Stack>
                </Box>
            </Container >
            <Footer />
        </Box >
    );
}
export default TeamsCats;