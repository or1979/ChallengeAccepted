module.exports = function (sequelize, DataTypes) {
    var SpiritTracker = sequelize.define("SpiritTracker", {
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        checkin_counter: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0,
                max: 30
            }
        }
    });
    return SpiritTracker;
};
