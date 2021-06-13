import axios from "axios";

export default {
    getAllHabitsForUser: function (email) {
        return axios.get("/api/habits/getAllHabitsForUser", { params: { email } });
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