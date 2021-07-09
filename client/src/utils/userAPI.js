import axios from "axios";

export default {
    getUser: function (userId) {
        return axios.get("/api/users/getUser", { params: { userId } });
    },

    getUserSettings: function(email) {
        return axios.get("/api/users/getUserSettings", { params: { email }});
    },

    findOrCreateUser: function (user) {
        return axios.post("/api/users/findOrCreateUser", { user });
    },

    updateUser: function (user) {
        return axios.put("/api/users/updateUser", { user });
    },

    deleteUser: function (userId) {
        return axios.delete("/api/users/deleteUser", { userId });
    },
}