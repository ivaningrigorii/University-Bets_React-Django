import React, { Component, useEffect, useState, useRef } from 'react';
import Footer from "../../../../../../components/Footer/Footer";
import Header from "../../../../../../components/Header/Header";
import AuthServices from '../../../../../personal/Auth/AuthServices';
import routes from '../../../../../../routes';
import { Grid, Box, } from '@mui/material';
import MenuCatalogs from '../../components/MenuCatalogs';
import { main } from '../../styles';
import { makeStyles } from '@mui/styles';
import SearchElement from '../../components/SearchElement';
import { useParams } from 'react-router';
import PollsServices from '../../PollsServices';
import { height } from '@mui/system';
import ShowPolls from './ShowPolls';

const ps = new PollsServices();
const auths = new AuthServices();
const PAGE_SIZE = 6;

const useStylesThis = makeStyles({
    grid_style: {
        marginTop: '5%',
    },
    enter: {
        marginTop: '5%',
    }
});


const PollsPage = () => {
    document.title = "Каталог созданные опросы";
    const [pollsOwnList, setPollsOwnList] = useState();
    const [delPoll, setDelPoll] = useState(false);
    const [paginationData, setPagintaionData] = useState({});
    const isChange = useRef(true);

    let {page} = useParams();
    console.log(page);
    page = page?page:1;

    const classes = main();
    const classes_this = useStylesThis();

    const make_get = () => {
        console.log(page);
        ps.getPollsOwn(page, PAGE_SIZE)
            .then((result) => {
                console.log(result);
                setPollsOwnList(result.results);
                setPagintaionData({
                    count: result.count,
                    page: page
                });
            })
            .catch((error) => {
                console.log(error);
                alert('Невозможно получить данные!');
            });
    };

    useEffect(() => {
        if (!isChange.current) {
            return;
        } else {
            isChange.current = false;
        }
        make_get();
    }, []);

    if (!auths.findAuthTokens()) {
        return window.location.replace(routes.auth.login);
    } else {
        return (
            <Box className={classes.body_style}>
                <Header />
                <Box sx={{ height: '25px', }} />
                <Grid container direction="row"
                    className={classes_this.grid_style}
                    justifyContent="space-between" alignItems="center">
                    <SearchElement />
                    <MenuCatalogs titleSelectedOption={"Созданные опросы"} />
                </Grid>
                <br /><br /><hr />
                {pollsOwnList &&
                    <ShowPolls pollsOwnList={pollsOwnList} setPollsOwnList={setPollsOwnList}
                    make_get={make_get} pagination_data={paginationData}/>
                } {!pollsOwnList &&
                    <Grid alignItems="center">
                        <Box sx={{ minHeight: '500px', }} />
                    </Grid>
                }
                <Box className={classes_this.enter} />
                <Footer />
            </Box>
        );
    }
}
export default PollsPage;