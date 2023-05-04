import axios from 'axios';
import _token from '../../../AxiosTokens';
import { useParams } from 'react-router';
import { reverse } from 'named-urls';

class PollsServices {
    getPollsOwn(page, page_size) {
        return axios.get("api/v1/profile/cats_own/", {
            headers: {
                'Authorization': 'Bearer ' + _token(),
            },
            params: {
                page: page,
                page_size: page_size,
            },
        })
            .then((response) => {
                console.log(response.data);
                return Promise.resolve(response.data);
            })
            .catch(function (error) {
                return Promise.reject(error);
            });
    }

    deletePoll(id) {
        try {
            if (!id || id <= 0) {
                throw new Error();
            }
            let path = reverse("api/v1/manage/surv/survey-header/:id/", {id: id, });

            return axios.delete(path, {
                headers: {
                    'Authorization': 'Bearer ' + _token(),
                }
            })
                .then((response) => {
                    return Promise.resolve(response.data);
                })
                .catch(function (error) {
                    return Promise.reject(error);
                });
        } catch (error) {
            return Promise.reject(error);
        }
    }

}
export default PollsServices;