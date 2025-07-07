const express = require('express');
const path = require('path');
const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);
const { pool, pgConnection } = require('./database/index');
const passport = require('passport');

/* LOAD ENVIRONMENT VARIABLES */
require('dotenv').config();

/* APP INITIALIZED */
const app = express();
const PORT = process.env.PORT || 3001;

/* HIDE RESPONSE HEADERS PROPERTY */
app.disable('x-powered-by');

/* SETTING VIEWS */
app.set('views', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* BUILT-IN MIDDLEWARES */
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));


/* DATABASE AND SESSIONS MIDDLEWARES */
const secret = process.env.SECRETS;
app.use(
  session({
    store: new PgSession({
      pool,
      tableName: 'user_sessions'
    }),
    secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 5000
      // maxAge: 1000 * 60 * 60 * 24
    }
  })
);

app.use(passport.session());

/* SETTING CURRENT USER MIDDLEWARE */
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

/* ROUTERS */
const indexRouter = require('./routes/indexRouters');

app.use(indexRouter);

/* PAGE NOT FOUND ERROR HANDLER */
app.use((req, res, next) => {
  res.status(404).send('Page Not Found.');
});

/* SERVER ERROR HANDLER */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('There was an unexpected error.');
});

app.listen(PORT, () => console.log(`🚀 Listening on http://localhost:${PORT}/`));