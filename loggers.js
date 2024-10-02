require("dotenv").config();

const ENV = process.env.NODE_ENV;
// console.log({ENV})
// ////////////////////////////// LOG CON CONSOLE ///////////////////////////////////
// console.log("------------------------------------------------")

// console.log("este es un console.log")
// console.error("este es un console.error")
// console.info("este es un console.info")
// console.warn("este es un console.warn")

// console.log("------------------------------------------------")

// ////////////////////////////// LOG CON WINSTON///////////////////////////////////

let level;
if (ENV === "production") {
  level = "warning";
} else {
  level = "normal";
}

const winston = require("winston");

const customLevelsOptions = {
  levels: {
    fatal: 0,
    warning: 1,
    verbose: 2,
    normal: 3,
  },
  colors: {
    fatal: "blue",
    warning: "green",
    verbose: "yellow",
    normal: "red",
  },
};

const logger = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new winston.transports.Console({
      level,
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelsOptions.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({ filename: "warn.log", level: "warning", format: winston.format.simple() }),
  ],
});

// logger.silly("este log es silly")
// logger.debug("este log es debug")
// logger.verbose("este log es verbose")
// logger.http("este log es http")
// logger.info("este log es info")
// logger.warn("este log es warn")
// logger.error("este log es error")

function addLogger(req, res, next) {
  req.logger = logger;
  req.logger.verbose(
    `${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`
  );
  next();
}

module.exports = {
  addLogger,
  logger,
};
