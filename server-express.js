const express = require("express");
const { addLogger, logger } = require("./loggers.js");
require("dotenv").config();
// const morgan = require("morgan")

const server = express();
// server.use(morgan("dev"))
server.use(addLogger)

server.get("/",(req, res) => {
    res.send("hi im root")
})

/* Artilley example*/

server.get("/operacionsencilla", (req, res) => {
    let sum = 0;
    for(let i = 0; i < 1000000; i++) {
        sum += i
    }
    res.send({ sum })
})

server.get("/operacioncompleja", (req, res) => {
    let sum = 0;
    for(let i = 0; i < 5e7; i++) {
        sum += i
    }
    res.send({ sum })
})

/* --------------- */

server.use("*", (req, res) => {
    logger.warning(`ruta ${req.url} no encontrada!!!`)
    res.status(404).send("not found")
})

server.listen(8080, () => {
    // console.log("server listening on port 8080")
    logger.normal("server listening on port 8080")
})
