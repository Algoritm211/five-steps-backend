const express = require('express');
const cors = require('cors');
require('dotenv').config()
const mongoose = require('mongoose')
const passport = require('passport')
const fs = require("fs");
const fileUpload = require('express-fileupload')
const path = require('path')
const staticMiddleware = require('./middlewares/static.middleware')

const authRouter = require('./routes/auth.routes')
const lessonRouter = require('./routes/lesson.routes')
const courseRouter = require('./routes/course.routes')
const userRouter = require('./routes/user.routes')
const articleRouter = require('./routes/article.routes')

const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const PORT = process.env.PORT || 5000

const app = express()


app.use(passport.initialize());
app.use(cors({
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  origin: ['http://localhost:3000', process.env.mainURL]
}))

const store = new MongoDBStore({
  uri: process.env.dbURL,
  collection: "sessions",
});

app.use(
  session({
    secret: process.env.secretKey,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: { path: '/', httpOnly: false, secure: false, maxAge: null }
  })
);


app.use(express.json())

app.use('/', express.static( path.join(__dirname, 'static') ))
app.use(fileUpload({}))
app.use(staticMiddleware(path.resolve(__dirname, 'static')))


app.use('/api/auth/', authRouter)
app.use('/api/lesson/', lessonRouter)
app.use('/api/course/', courseRouter)
app.use('/api/user/', userRouter)
app.use('/api/article/', articleRouter)

const START = async () => {
  try {

    const staticPath = path.resolve(__dirname, 'static')

    if (!fs.existsSync(staticPath)) {
      fs.mkdirSync(path.resolve(staticPath))
    }

    const dbURL = process.env.dbURL
    await mongoose
      .connect(dbURL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        tls: true
      })
      .then(() => console.log('Database Connected'))
      .catch(error => console.log(error));


    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`)
    })

  } catch (error) {
    console.log(error);

  }
}

START()


