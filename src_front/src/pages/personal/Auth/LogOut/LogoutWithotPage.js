import routes from "../../../../routes";
import AuthServices from "../AuthServices";

const auths = new AuthServices();

const LogoutWithotPage = () => {
  auths.deleteToken();
  return window.location.replace(routes.home);
};
export default LogoutWithotPage;
