import _token from '../../../AxiosTokens';
import axios from 'axios';
import { reverse } from 'named-urls';

// все axios запросы модуля аналитики

class AnServices {

    constructor(){}

    postPollAnalize(data) {
        return axios.post('api/v1/analytics/simple_analytics/', data, {
            headers: { 'Authorization': 'Bearer ' + _token(), }
        },)
            .then((response) => {
                return Promise.resolve(response.data.answers);
            } )
            .catch((error) => {
                return Promise.reject(error);
            });
    }
}
export default AnServices;