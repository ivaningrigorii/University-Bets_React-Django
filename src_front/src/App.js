import { BrowserRouter, Route, Routes } from "react-router-dom";

import React, { Component } from "react";

import ListAllGames from "./pages/games/ListAllGames";
import ListMyGames from "./pages/games/ListMyGames";
import MainPage from "./pages/other/MainPage/MainPage";
import EnterPage from "./pages/personal/Auth/Authorization/AuthorizPage";
import LogoutWithotPage from "./pages/personal/Auth/LogOut/LogoutWithotPage";
import RegistrationPage from "./pages/personal/Auth/Registration/RegistrationPage";
import ProfilePage from "./pages/personal/ProfilePage/ProfilePage";
import ProfilePageEdit from "./pages/personal/ProfilePage/ProfilePageEdit";
import TeamsCats from "./pages/teams/TeamsCats";
import ListBetsAllow from "./pages/bets/ListBetsAllow";

import routes from "./routes.js";

class App extends Component {
  componentDidMount() {
    document.title = "Ставки на спорт";
  }
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path={routes.home} element={<MainPage />} />

          <Route path={routes.profile} element={<ProfilePage />} />
          <Route
            path={routes.profile_next.edit}
            element={<ProfilePageEdit />}
          />

          <Route path={routes.auth.login} element={<EnterPage />} />
          <Route path={routes.auth.logout} element={<LogoutWithotPage />} />
          <Route
            path={routes.auth.registration}
            element={<RegistrationPage />}
          />

          <Route path={routes.teams.list} element={<TeamsCats />} />

          <Route
            path={routes.games.list_all_games}
            element={<ListAllGames />}
          />
          <Route path={routes.games.list_my_games} element={<ListMyGames />} />

          <Route path={routes.bets.list_bets} element={<ListBetsAllow />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
export default App;
