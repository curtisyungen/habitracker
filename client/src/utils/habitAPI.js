import axios from "axios";

export default {
    getAllHabitsForUser: function (userId) {
        return axios.get("/api/habits/getAllHabitsForUser", { params: { userId } });
    },

    createHabit: function (userId, habitData) {
        return axios.post("/api/habits/createHabit", { userId, habitData });
    },

    updateHabit: function (userId, habitId, habitData) {
        return axios.put("/api/habits/updateHabit", { userId, habitId, habitData });
    },

    deleteHabit: function (userId, habitId) {
        return axios.delete("/api/habits/deleteHabit", { userId, habitId });
    },
}