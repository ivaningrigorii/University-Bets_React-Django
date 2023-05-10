import { Cookies } from 'react-cookie';
import AuthServices from './pages/personal/Auth/AuthServices';
import routes from './routes';
import { useState } from 'react';

const aths = new AuthServices();
const cookies = new Cookies();
const time_life_access_token = 1000 * 60 * 29;
const time_life_refresh_token = 1000 * 60 * 60 * 24 * 3 - 60;
const login_url = routes.auth.login;


function getPayload(jwt) {
    return atob(jwt.split(".")[1])
}

function clear_tokens_and_new_login() {
    aths.deleteToken();
    window.location.replace(login_url);
}

//получение access токена или перенаправление на авторизацию
export default async function _token() {
    let tokens = cookies.get('tokens');
    let time_update_tokens = cookies.get('tt');

    if (!tokens) {
        window.location.replace(login_url);
    }

    if (Date.now() - time_update_tokens > time_life_access_token) {
        if (Date.now() - time_update_tokens > time_life_refresh_token) {
            clear_tokens_and_new_login();
        }
        try {
            await aths.refreshToken(tokens)
                .then(async (result) => {
                    tokens = {
                        access: result.access,
                        refresh: result.refresh
                    };
                    aths.saveToken(tokens);
                })
                .catch((reason) => {
                    if (reason == 400 || reason == 401) {
                        clear_tokens_and_new_login();
                    }
                });
        } catch {
            window.location.replace(login_url);
        }
    }
    
    return await tokens.access;
}