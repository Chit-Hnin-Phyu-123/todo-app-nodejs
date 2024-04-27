const express = require('express');
const mongoose = require('mongoose');
const Middleware = require('./middlewares/middleware');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var session = require('express-session');
const ApiRoute = require('./routes/api_routes');
const WebRoute = require('./routes/web_routes');
const AuthRoute = require('./routes/auth_routes');

const app = express();

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/todo-homework");

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'Abc123!@#',
    resave: true,
    saveUninitialized: true
  }));

app.use(flash());

app.use('/api/v1/', Middleware.checkUser, ApiRoute);
app.use('/auth/', AuthRoute);
app.use('/web/', Middleware.checkWebUser, WebRoute);

app.listen(8000, () => {
    console.log("Server started at PORT: 8000");
});