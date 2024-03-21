"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;


// Accept json data: fronttan gelen JSON veriyi kabul eder ve objeye çevirir, bu bir middleware dir, artık data req.body de
app.use(express.json())

// Catch async-errors:
require('express-async-errors')

app.use(require('./app/routes/todo.router')) // router ları import ettik

//Errorhandleri import ediyor
app.use(require('./app/errorHandler'))

app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));