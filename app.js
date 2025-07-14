const express = require('express');
const path = require('path');
const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);
const { pool } = require('./database/index');
const passport = require('passport');
const flash = require('connect-flash');
const methodOverride = require('method-override');

/* LOAD ENVIRONMENT VARIABLES */
require('dotenv').config();

/* APP INITIALIZED */
const app = express();
const PORT = process.env.PORT || 3001;

/* HIDE RESPONSE HEADERS PROPERTY */
app.disable('x-powered-by');

/* SETTING VIEWS */
app.set('view engine', 'ejs');
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
      tableName: 'user_sessions',
      createTableIfMissing: true
    }),
    name: 'con_mc',
    secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      // maxAge: 5000 /* 5 seconds expiration */
      maxAge: 1000 * 60 * 60 * 24 /* 24 hours expiration */
    }
  })
);
/* SETTING FLASH MIDDLEWARE  */
const flashMessageMiddleware = require('./middlewares/flashMessageMiddleware');
app.use(flash());
app.use(flashMessageMiddleware);

/* PASSPORT MIDDLEWARES */
require('./config/passportConfig')();
app.use(passport.session());

/* SETTING CURRENT USER MIDDLEWARE FOR VIEWS */
const currentUserMiddleware = require('./middlewares/currentUserMiddleware');
app.use(currentUserMiddleware);

/* SETTING METHOD OVERRIDE MIDDLEWARE */
app.use(methodOverride('_method'));

/* ROUTERS */
const indexRouter = require('./routes/indexRouters');
const authRouter = require('./routes/authRouters');
const membershipRouter = require('./routes/membershipRouters');
const postRouter = require('./routes/postRouter');
const adminRouter = require('./routes/adminRouters');
const isAdminMiddleware = require('./middlewares/isAdminMiddleware');

app.use('/', authRouter);
app.use('/admin', isAdminMiddleware, adminRouter);
app.use('/posts', postRouter);
app.use('/membership', membershipRouter);
app.use(indexRouter);

/* PAGE NOT FOUND ERROR HANDLER */
app.use((req, res, next) => {
  res.status(404).render('index', {
    windowTitle: 'Page Not Found | Membership Club',
    documentTitle: 'Page Not Found',
    content: {
      location: '/404',
      data: {},
      validationError: []
    }
  });
});

/* SERVER ERROR HANDLER */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('There was an unexpected error.');
});

app.listen(PORT, () => console.log(`🚀 Listening on http://localhost:${PORT}/`));