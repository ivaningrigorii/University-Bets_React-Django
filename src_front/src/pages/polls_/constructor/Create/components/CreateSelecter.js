import Description from './custom_mui/Description';
import Name from './custom_mui/Name';
import React, { useState, useEffect } from 'react';
import { SSimple, STest } from './Polls';
import {
  FormControl, TextField,
  Autocomplete, Grid, Container,
  FormLabel, InputLabel, Select, MenuItem, Button,
  Stack, Box,
} from '@mui/material';
import CreatePollButton from './custom_mui/CreatePollButton';
import ServicesCreatePage from '../ServicesCreatePage';
import routes from '../../../../../routes';
import { reverse } from 'named-urls';
import FormData from 'form-data'


const createPageServices = new ServicesCreatePage();



const CreateSelecter = () => {
  const [optionResourcetype, setOptionResourcetype] = useState(1);
  const [data, setData] = useState(new FormData());
  const [img, setImg] = useState();
  const [preview, setPreview] = useState();

  const type_poll_components = {
    1: <SSimple data={data} setData={setData} />,
    2: <STest data={data} setData={setData} />
  };

  useEffect(() => {
    if (img) {
      const objectUrl = URL.createObjectURL(img)
      setPreview(objectUrl)

      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl)
    }

  }, [img,])

  const handleChange = (event) => {
    setOptionResourcetype(event.target.value);
  };

  const handleSubmit = (event, selectedOption) => {
    event.preventDefault();

    var data_ = data;
    data_.append('img', img, img.name);
    data_.append('name', event.target.name.value);
    data_.append('description', event.target.description.value);
    setData(data_);

    createPageServices.createPoll(data)
      .then((result) => {
        localStorage.setItem('position_survey', JSON.stringify(0));
        localStorage.setItem('type_of_surv', JSON.stringify(optionResourcetype));
        window.location.replace(reverse(routes.polls.constructor, { poll: result.id }));
      })
      .catch((exp) => {
        console.log(exp);
        alert("Опрос не был создан, проверьте введённые данные!");
      })
  };

  return (
    <Container>
      <Box
      textAlign="center"
      sx={{
        backgroundColor: " #e6e2f3 ",
        mt: "10vh",
        mx: 20,
        borderRadius: "20px",
      }}
      >
        <p>Создание опроса</p>
        <Box sx={{ mx: "10px", mt: "5px", }}>
          <form onSubmit={handleSubmit}>
            <Stack container
              direction="row"
              justifyContent="space-between"
              alignItems="base-line"
            >

              <Stack container
                direction="column"
                justifyContent="center"
                alignItems="flex-start">
                <Box
                  sx={{
                    width: { xs: 300, },
                    height: { xs: 150, },
                    borderRadius: "25px",
                    backgroundColor: "#9783e9",
                  }}>
                  {img &&
                    <Box sx={{ mx: "auto", }}>
                      <Box
                        component="img"
                        sx={{
                          width: { xs: 300, },
                          maxHeight: { xs: 150, },
                          maxWidth: { xs: 300, },
                          borderRadius: "25px",
                          objectFit: "cover",
                        }}
                        src={preview}
                      />
                    </Box>
                  }
                </Box>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="raised-button-file"
                  multiple
                  type="file"
                  name="raised_button_file"
                  onChange={(event) => setImg(event.target.files[0])}
                />
                {img ?
                  <label htmlFor="raised-button-file">
                    <Button component="span">
                      Изменить
                    </Button>
                  </label> :
                  <label htmlFor="raised-button-file">
                    <Button component="span">
                      Обложка
                    </Button>
                  </label>
                }

              </Stack>

              <FormControl sx={{ minWidth: 120, maxLength: 400, }} size="small">
                <InputLabel id="demo-simple-select-label" sx={{ maxLength: 400, }} size="small">
                  Тип опроса
                </InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" size="small"
                  value={optionResourcetype} label="Тип опроса"
                  onChange={handleChange} sx={{ maxLength: 400, }}>
                  <MenuItem value={1}>Обычный опрос</MenuItem>
                  <MenuItem value={2}>Тестовый опрос</MenuItem>
                </Select>
              </FormControl>

            </Stack>

            <Name />
            <Description />
            {optionResourcetype &&
              <div>{type_poll_components[optionResourcetype]}</div>
            }
            <CreatePollButton />
          </form>
          <Box sx={{mt:"15px",}}/>
        </Box>
      </Box>
    </Container>
  );
}
export default CreateSelecter;