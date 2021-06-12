import axios from "axios";

export default {
    getAllHabitsForUser: function (userId) {
        return axios.get("/api/habits/getAllHabitsForUser", { params: { userId } });
    },

    createHabit: function (email, habit) {
        return axios.post("/api/habits/createHabit", { email, habit });
    },

    updateHabit: function (habit) {
        return axios.put("/api/habits/updateHabit", { habit });
    },

    deleteHabit: function (email, habitId) {
        return axios.delete("/api/habits/deleteHabit", { email, habitId });
    },
}