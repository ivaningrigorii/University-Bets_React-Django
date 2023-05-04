import AuthServices from "../AuthServices";
import routes from "../../../../routes";

const auths = new AuthServices();

const LogoutWithotPage = () => {
    auths.deleteToken();
    return (window.location.replace(routes.home));
}
export default LogoutWithotPage;