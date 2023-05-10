import { include } from 'named-urls'

export default {
    home: "/",

    profile: "/profile/",
    profile_next: include("/profile/", {
        edit: "edit/",
    }),

    auth: include('/auth/', {
        login: "login/",
        logout: "logout/",
        registration: "reg/",
    }),

    teams: include('/teams/', {
        list: "list/",
        change: "change/:id_team/"
    })

}