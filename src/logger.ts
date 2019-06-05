import { Logger, createLogger, LoggerOptions, transports, format } from 'winston';

const defaultLevel = process.env.LOG_LEVEL || 'debug';

const consoleOptions = {
    level: defaultLevel,
    handleExceptions: true,
    json: true,
    colorize: true,
};

const options: LoggerOptions = {
    exitOnError: false,
    level: defaultLevel,
    format: format.combine(format.timestamp(), format.splat(), format.json()),
    transports: [new transports.Console(consoleOptions)],
};

const logger: Logger = createLogger(options);

export { logger };
