const Sequelize = require('sequelize');

const sequelize = new Sequelize('Blue Badge Project', 'postgres', 'Whg11whg', {
    host: 'localhost',
    dialect: 'postgres' 
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to Blue Badge Project postgres database');
    },
    function(err){
        console.log(err);
    }
);

module.exports = sequelize;