import { useState, Component, useEffect } from 'react';
import { Box, Button, Container, Typography, } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import _token from '../../../../AxiosTokens';
import PassingServices from '../PassingServices';
import Header from "../../../../components/Header/Header";
import Footer from "../../../../components/Footer/Footer";
import {
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
} from '@mui/material/styles';
import RealPassing from '../Passing/RealPassing';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const ps = new PassingServices();

const Passing = () => {
    const [val, setVal] = useState();
    const { slug } = useParams();
    const [start_time, setStartTime] = useState();
    const [end_time, setEndTime] = useState();
    const [token, setToken] = useState("");

    const [passing, setPassing] = useState();

    useEffect(() => {
        ps.reloadIdToSlug(slug)
            .then((res) => {
                setVal(res);
                console.log(res);

                setToken(_token());

                if (res.start_time) {
                    setStartTime(new Date(Date.parse(res.start_time)));
                }
            })
            .catch((err) => {
                alert("Невозможно получить данные!");
                console.log(err);
            })
    }, []);

    const handleStartSurveyPassing = () => {
        ps.start(val.id, token)
            .then((res) => setPassing(res))
            .catch((err) => console.log(err))
    }

    return (
        <ThemeProvider theme={theme}>
            <Header />
            <Container sx={{ mt: 10, minHeight: "100vh", }}>
                {!passing ?
                    <Box>
                        <Typography variant="h3">
                            Опрос: {val && val.name}
                        </Typography>
                        <Typography>
                            {val && val.description}
                        </Typography>
                        {(val && val.option_is_published == true
                        ) ?
                            <Button onClick={handleStartSurveyPassing}>
                                Пройти опрос
                            </Button> :
                            <Typography>
                                Опрос закрыт для прохождения
                            </Typography>
                        }
                    </Box> :
                    <RealPassing/>
                }
            </Container>
            <Footer />
        </ThemeProvider>
    );
}
export default Passing;