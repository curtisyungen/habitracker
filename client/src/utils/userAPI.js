import axios from "axios";

export default {
    getUserById: function (userId) {
        return axios.get("/api/users/getUserById", { params: { userId } });
    },

    findOrCreateUser: function (user) {
        return axios.post("/api/users/findOrCreateUser", { user });
    },

    updateUser: function (userId, userData) {
        return axios.put("/api/users/updateUser", { userId, userData });
    },

    deleteUser: function (userId) {
        return axios.delete("/api/users/deleteUser", { userId });
    },
}