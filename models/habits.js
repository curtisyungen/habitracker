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
            allowNull: true,
        },
        // check_off, enter_value
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Health, fitness, recreation, etc.
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        target: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // time, quantity
        targetType: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        timeline: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Active, Inactive
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Habits;
};
