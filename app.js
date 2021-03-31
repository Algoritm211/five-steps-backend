const express = require('express');
const cors = require('cors');
require('dotenv').config()
const mongoose = require('mongoose')

const PORT = process.env.PORT

const app = express()


app.use(cors())
app.use(express.json())


const START = async () => {
  try {

    app.listen(() => {
      console.log(`Server started on http://localhost:${PORT}`)
    })

  } catch (error) {
    console.log(error);

  }
}

START()


