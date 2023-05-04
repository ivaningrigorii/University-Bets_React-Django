import axios from 'axios';
import { useParams } from 'react-router';
import { reverse } from 'named-urls';
import _token from '../../../AxiosTokens';

class PassingServices {

    reloadIdToSlug(slug) {
        try {
            let path = reverse("api/v1/passing/id-from-slug/:slug/", {slug: slug, });

            return axios.get(path)
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

    start(id, token) {
        return axios.post('api/v1/passing/taking_survey/start/', {
            survey: id,
        }, {
            headers: { 'Authorization': 'Bearer ' + _token(), }
        },)
            .then((response) => {
                return Promise.resolve(response.data);
            } )
            .catch((error) => {
                return Promise.reject(error);
            });
    }

}
export default PassingServices;