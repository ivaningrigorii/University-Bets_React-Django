import axios from 'axios';
import _token from '../../../AxiosTokens';

class ProfileServices {
    getProfileData() {
        const token_ = _token();
        const bearer_str = 'Bearer ' + token_;

        return axios.get("api/v1/profile/me/", {
            headers: {
                'Authorization': bearer_str,
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
    updateUser(data) {
        const token_ = _token();
        const bearer_str = 'Bearer ' + token_;

        return axios.patch("api/v1/profile/me/", data, {
            headers: {
                'Authorization': bearer_str,
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
    updateProfile(data) {
        const token_ = _token();
        const bearer_str = 'Bearer ' + token_;

        return axios.patch("api/v1/profile/more-me/", data, {
            headers: {
                'Authorization': bearer_str,
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