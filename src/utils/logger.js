// logger.js
const { createLogger, format, transports } = require('winston');

// Define the logger configuration
const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.printf((info) => `${info.timestamp} [${info.level}]: ${info.message}`),
        format.colorize({ all: true })
    ),
    transports: [
        new transports.Console(), // Log to console
        new transports.File({ filename: 'logs/server.log' }), // Log to a file
    ],
});

module.exports = logger;