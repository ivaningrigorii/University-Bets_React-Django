import React, { Component, useEffect, useState } from 'react';
import { Box, Button, Stack, } from '@mui/material';
import ProfileServices from '../ProfileServices';
import './Profile.css';
import routes from '../../../../routes';
import FormData from 'form-data';

const URL_BASE_IMG = "https://chess-center.ru/wp-content/uploads/2022/09/2_4yls8wlami9frintdrgsya.jpeg";

const ps = new ProfileServices();

const ProfileEdit = () => {
    const [img, setImg] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [bio_, setBio_] = useState();
    const [username, setUsername] = useState();

    const [data_user, setDataUser] = useState();
    const [preview, setPreview] = useState(URL_BASE_IMG);

    useEffect(() => {
        if (img) {
            const objectUrl = URL.createObjectURL(img)
            setPreview(objectUrl)

            return () => URL.revokeObjectURL(objectUrl)
        }

    }, [img,])

    useEffect(() => {
        ps.getProfileData()
            .then((res) => {
                setDataUser(res);
                setPreview(`data:image;base64,${res.profile.base64_image}`);
            })
            .catch((er) => {
                alert("Ошибка, невозможно получить данные! " +
                    "Попробуйте обновить страницу!"
                );
            })
    }, []);

    const handleSubmit = () => {
        let data_ = new FormData();

        if (img) data_.append('img', img, img.name);
        if (bio_ && bio_ !== data_user.profile.bio) data_.append('bio', bio_);

        ps.updateProfile(data_)
            .then(() => { window.location.replace(routes.profile) })
            .catch(exp => {
                console.log(exp);
                alert("Обновление данных невозможно!");
            })
    };

    const handleSubmitUserUpdate = () => {
        let data_ = new FormData();

        if (username && username !== data_user.username)
            data_.append('username', username);
        if (firstName && firstName !== data_user.first_name)
            data_.append('first_name', firstName);
        if (lastName && lastName !== data_user.last_name)
            data_.append('last_name', lastName);

        ps.updateUser(data_)
            .then(() => { window.location.replace(routes.profile) })
            .catch(exp => {
                console.log(exp);
                alert("Обновление данных невозможно!");
            })
    }

    return (

        <div className='profile_show_test'>
            <div className='container'>
                <div className='profile_show_test__content'>
                    <h2 className='profile_show_test_title'>Фото профиля</h2>
                    <div className='profile_show_test_img'>
                        <Box
                            component="img"
                            sx={{
                                width: "60px",
                                height: "60px",
                                borderRadius: "50%",
                                objectFit: "cover",
                            }}
                            src={preview && preview}
                        />

                        <div>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="raised-button-file"
                                multiple
                                type="file"
                                name="raised_button_file"
                                onChange={(event) => setImg(event.target.files[0])}
                            />
                            <label htmlFor="raised-button-file">
                                <Button component="span">
                                    Выберите файл
                                </Button>
                            </label>
                        </div>
                    </div>

                    <span className='profile_show_test_info'>Максимальный размер фото 5 МБ</span>
                    <p className='profile_show_test_shiftenter'> </p>
                    <h3 className='profile_show_test_title'>Личная информация</h3>
                    <p className='profile_show_test_shiftenter'> </p>


                    <p className='profile_show_test_title'>Логин</p>
                    <input className='profile_show_test_input'
                        placeholder='Введите логин'
                        type="text"
                        name="username"
                        onChange={(event) => setUsername(event.target.value)}
                        defaultValue={data_user && data_user.username}
                    />
                    <p className='profile_show_test_shiftenter'> </p>

                    <p className='profile_show_test_title'>Имя</p>
                    <input className='profile_show_test_input'
                        placeholder='Введите имя'
                        type="text"
                        name="first_name"
                        onChange={(event) => setFirstName(event.target.value)}
                        defaultValue={data_user && data_user.first_name}
                    />
                    <p className='profile_show_test_shiftenter'> </p>

                    <p className='profile_show_test_title'>Фамилия</p>
                    <input className='profile_show_test_input'
                        placeholder='Введите фамилию'
                        type="text"
                        name="last_name"
                        onChange={(event) => setLastName(event.target.value)}
                        defaultValue={data_user && data_user.last_name}
                    />
                    <p className='profile_show_test_shiftenter'> </p>

                    <p className='profile_show_test_title'>Дополнительная информация</p>
                    <input className='profile_show_test_input'
                        placeholder='Доп. информация'
                        type="text"
                        name="bio"
                        onChange={(event) => setBio_(event.target.value)}
                        defaultValue={data_user && data_user.profile.bio}
                    />
                    <p className='profile_show_test_shiftenter'> </p>

                </div>
                <p className='profile_show_test_shiftenter'> </p>
                <Stack direction="row" spacing={2}>
                    <button className='profile_show_test_btn2'
                        onClick={()=>{
                            handleSubmit();
                            handleSubmitUserUpdate();
                        }}>
                        Сохранить
                    </button>
                    <button className='profile_show_test_btn2' onClick={
                        () => window.location.replace(routes.profile)
                    }>
                        Отмена
                    </button>
                </Stack>
            </div>

            <div className='profile_show_enter_footer' />
        </div>
    );
}
export default ProfileEdit;