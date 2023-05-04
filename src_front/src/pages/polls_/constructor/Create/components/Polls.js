import { useEffect, useState, useCallback, useRef } from 'react';
import TimePassing from './custom_mui/TimePassing';
import StartTime from './custom_mui//StartTime';
import EndTime from './custom_mui/EndTime';
import { Grid, Container, Stack } from '@mui/material';
import FormData from 'form-data';

const SSimple = ({ data, setData }) => {

    useEffect(() => {
        var d = new FormData();
        d.append('resourcetype', "SurveySimple");
        setData(d);
    }, []);

    return (<div></div>);
}

const STest = ({ data, setData }) => {
    const [start_time, setStartTime_] = useState();
    const [endTime, setEndTime_] = useState();
    const [timePassing, setTimePassing_] = useState();
    const [data__, setData_] = useState(new FormData());

    useEffect(() => {
        let data_ = data__;
        data_.append('resourcetype', "SurveyTest");
        setData(data_);
    }, [])

    useEffect(() => {
        let data_ = data__;
        data_.append('start_time', start_time);
        data_.append('end_time', endTime);
        data_.append('time_passing', timePassing);
        setData_(data_);
        handleInputChange();
    }, [start_time, endTime, timePassing]);

    const handleInputChange = useCallback(event => {
        setData(data__);
    });

    return (
        <Stack direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}>
            <StartTime start_time={start_time} setStartTime={setStartTime_} />
            <EndTime endTime={endTime} setEndTime={setEndTime_} />
            <TimePassing timePassing={timePassing} setTimePassing={setTimePassing_} />
        </Stack>
    );
}

export { STest, SSimple };