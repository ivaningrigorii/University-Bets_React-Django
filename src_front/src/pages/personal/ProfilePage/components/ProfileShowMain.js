import { Box, Button, Container, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import routes from "../../../../routes";
import ProfileServices from "../ProfileServices";

const ps = new ProfileServices();

const ProfileShow = () => {
  const [data_user, setDataUser] = useState();
  const [preview, setPreview] = useState();

  useEffect(() => {
    ps.getProfileData()
      .then((res) => {
        setDataUser(res);
        setPreview(`data:image;base64,${res.profile.base64_image}`);
      })
      .catch((er) => {
        alert(
          "Ошибка, невозможно получить данные! " +
            "Попробуйте обновить страницу!"
        );
      });
  }, []);

  return (
    <Container sx={{ mt: 10, minHeight: "120vh" }}>
      <Box>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Box
            component="img"
            border={0}
            sx={{
              height: 100,
              width: 100,
              backgroundColor: " #f1c4d5 ",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            src={preview && preview}
          />
          <Box sx={{ width: "fit-content" }}>
            <p>Ваш логин: {data_user && data_user.username}</p>
          </Box>
        </Stack>
        <Stack
          sx={{
            border: 1,
            borderRadius: "40px",
            borderSpacing: "5px",
            borderColor: " #f1c4d5 ",
          }}
          justifyContent="center"
          alignItems="center"
        >
          <Stack
            sx={{ mt: "10px", width: "70vw" }}
            direction="column"
            spacing={2}
          >
            <p>Имя: {data_user && data_user.first_name}</p>
            <p>Фамилия: {data_user && data_user.last_name}</p>
            <p>Дополнительно: {data_user && data_user.profile.bio}</p>
            <p>Почта: {data_user && data_user.email}</p>
          </Stack>
        </Stack>
        <Stack
          sx={{ mt: "20px" }}
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => window.location.replace(routes.profile_next.edit)}
          >
            Изменить
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};
export default ProfileShow;
