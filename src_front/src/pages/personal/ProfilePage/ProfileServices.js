import axios from 'axios';
import _token from '../../../AxiosTokens';

class ProfileServices {
    async getProfileData() {
        let token;
        await _token().then(async (res)=>token = await res);

        return axios.get("api/v1/profile/me/", {
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        })
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    //username, first_name, last_name, email
    async updateUser(data) {
        let token;
        await _token().then(async (res)=>token = await res);

        return axios.patch("api/v1/profile/me/", data, {
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        })
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    //img, bio
    async updateProfile(data) {
        let token;
        await _token().then(async (res)=>token = await res);

        return axios.patch("api/v1/profile/more-me/", data, {
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        })
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
export default ProfileServices;