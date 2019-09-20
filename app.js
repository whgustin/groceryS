require('dotenv').config();

var express = require('express');
var app = express();
var user = require('./controllers/usercontroller');
var item = require('./controllers/itemcontroller');
var sequelize = require('./db');


sequelize.sync();
// sequelize.sync({force: true});

app.use(express.json()); //1
app.use(require('./middleware/headers'));
app.use('/user', user);
app.use(require('./middleware/validate-session'));
app.use('/items', item);

app.listen(process.env.PORT, function() {
    console.log('App is listening on 3000.')
});