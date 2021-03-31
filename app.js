const express = require('express');
const cors = require('cors');
require('dotenv').config()
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth.routes')

const PORT = process.env.PORT

const app = express()


app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)


const START = async () => {
  try {
    const dbURL = process.env.dbURL
    await mongoose
      .connect( dbURL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false, tls: true })
      .then(() => console.log('Database Connected'))
      .catch(error => console.log(error));


    app.listen(() => {
      console.log(`Server started on http://localhost:${PORT}`)
    })

  } catch (error) {
    console.log(error);

  }
}

START()


