module.exports = function (sequelize, DataTypes) {
    const Habits = sequelize.define("Habits", {
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        habit_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        start_date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        end_date: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        timeline: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        target: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Habits;
};
