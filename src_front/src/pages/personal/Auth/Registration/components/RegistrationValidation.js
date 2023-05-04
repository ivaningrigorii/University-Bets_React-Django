import AuthServices from '../../AuthServices';
import routes from '../../../../../routes';

const aths = new AuthServices();

export default class RegistrationValidation {

    isValid(inputUsername, inputPassword, inputPassword2, email) {
        let login_data = {
            username: inputUsername,
            password: inputPassword,
            email: email,
        }
        if (!login_data.username || !login_data.password) {
            alert("Не все поля заполнены!");
        } else if (inputPassword2 !== inputPassword) {
            alert("Неуспешный повторный ввод пароля!");
        } else {
            aths.registr(login_data)
                .then((res) => window.location.replace(routes.auth.login))
                .catch((err) => {
                    let message = '';
                    let er_ = err.response.data;

                    if (er_.password)
                        er_.password.map(er => message += er + " ");
                    if (er_.username)
                        er_.username.map(er => message += er + " ");
                    if (er_.email)
                        er_.email.map(er => message += er + " ");

                    alert(message);
                })
        };
    };
}