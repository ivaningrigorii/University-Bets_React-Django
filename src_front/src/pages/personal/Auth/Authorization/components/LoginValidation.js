import AuthServices from '../../AuthServices';
import routes from '../../../../../routes';

const aths = new AuthServices();

export default class LoginValidation {
    
    isValid(inputUsername, inputPassword) {
        let login_data = {
            username: inputUsername,
            password: inputPassword
        }
        if (!login_data.username || !login_data.password) {
            alert("Не все поля заполнены!");
        } else {
            aths.getTokenData(login_data.username, login_data.password)
                .then((result) => {
                    window.location.replace(routes.profile);
                })
                .catch((error) => {
                    alert('Ошибка входа! \nПроверьте логин и пароль!');
                })
        };
    };
}