module.exports = function (sequelize, DataTypes) {

    return sequelize.define('item', { 

        name: DataTypes.STRING,
        category: DataTypes.STRING,
        description: DataTypes.STRING,
        price: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
    });
};