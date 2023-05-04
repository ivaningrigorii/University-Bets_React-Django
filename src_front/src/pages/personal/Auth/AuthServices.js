import axios from 'axios';
import { Cookies } from 'react-cookie';
const cookies = new Cookies();


class AuthServices {
    
    findAuthTokens() {
        if (cookies.get('tokens')) {
            return true;
        }
        return false;
    }

    //save jwt
    saveToken(tokens_from) {
        cookies.remove('tokens');
        cookies.remove('tt');
        cookies.set('tokens', JSON.stringify(tokens_from), {
            secure: true,
            sameSite: "none",
            path: '/',
        });
        cookies.set('tt', Date.now(), {
            secure: true,
            sameSite: "none",
            path: '/',
        });
    }

    //delete jwt from cookie
    deleteToken() {
        try {
            cookies.remove('tokens', {
                secure: true,
                sameSite: "none",
                path: '/',
            });
            cookies.remove('tt', {
                secure: true,
            sameSite: "none",
            path: '/',
            });
        } catch (error) {
            console.log(error);
        }
    }

    // login
    getTokenData(username, password) {
        const self = this;
        return axios.post('api/v1/login/jwt/create/', {
            username: username,
            password: password
        })
            .then(function (response) {
                self.saveToken({
                    access: response.data.access,
                    refresh: response.data.refresh
                });
                return Promise.resolve;
            })
            .catch(function (error) {
                return Promise.reject(error);
            });
    }

    //registration
    registr(data) {
        return axios.post('api/v1/auth/users/', data)
        .then((resp) => {
            return Promise.resolve(resp);
        })
        .catch((err)=>{
            return Promise.reject(err);
        })
    }


    // refresh jwt
    refreshToken(tokens) {
        return axios.post('api/v1/login/jwt/refresh/', {
            refresh: tokens.refresh
        }, { headers: { 'Authorization': 'Bearer ' + tokens.access, }})
            .then(function (response) {
                return  {
                    access: response.data.access,
                    refresh: response.data.refresh
                };
            })
            .catch(function (error) {
                return Promise.reject(error.response.status);
            });
    }
}
export default AuthServices;

