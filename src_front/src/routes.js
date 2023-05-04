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

    polls: include('/polls/', {
        cats: {
            default: "catalogs/",
            own: "catalogs/:page/",
        },

        create: "create/",
        constructor: "constructor/:poll/",
        analytics: "analytics/:poll/",
        

        passing: {
            to: ":slug/",
        }
    }),

}