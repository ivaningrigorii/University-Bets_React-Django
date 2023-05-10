import { useEffect, useState } from "react";
import _token from "../../AxiosTokens";
import { CardActions, CardMedia, Container, Typography,
    Box, Grid, Card, Button, CardContent, } from "@mui/material";
import { reverse } from "named-urls";
import routes from "../../routes";
import axios from "axios";
import CreateTeamData from "./CreateTeamData";

const TeamsCats = () => {
    const [teams, setTeams] = useState();

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

    const handleDel = async(id) => {
        let token;
        await _token().then(async (res) => token = await res);

        return axios.delete(("api/team/"+id+"/"), {
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        })
            .then(function (response) {
                setTeams(teams.filter(team => team.id == id));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleChange = (id) => {
        window.location.replace(reverse(routes.teams.change, {id: id}));
    }

    return (
        <Container>
            <CreateTeamData/>
            {teams &&
                <Grid xs={12} md={6} sm={3}>
                    {teams.map((team) => {
                        return (
                            <Card>
                                <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    height="140"
                                    src={`data:image;base64,${team.img}`}
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
                                    <Button size="small" onClick={()=>handleChange(team.id)}>Изменить</Button>
                                    <Button size="small" onClick={()=>handleDel(team.id)}>Удалить</Button>
                                </CardActions>
                            </Card>
                        );
                    })}
                </Grid>
            }
        </Container>

    );
}
export default TeamsCats;