import { include } from "named-urls";

export default {
  home: "/",

  profile: "/profile/",
  analitic: "/think/",
  profile_next: include("/profile/", {
    edit: "edit/",
  }),

  auth: include("/auth/", {
    login: "login/",
    logout: "logout/",
    registration: "reg/",
  }),

  teams: include("/teams/", {
    list: "list/",
  }),

  games: include("/games/", {
    list_my_games: "list-my-games/",
    list_all_games: "list-all-games/",
  }),

  bets: include("/bets/", {
    list_bets: "",
  }),
};
