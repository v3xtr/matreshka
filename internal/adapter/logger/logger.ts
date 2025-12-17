import { esClient } from '../elastic/elastic.js'
import { ElasticsearchTransport } from 'winston-elasticsearch'
import winston from 'winston'

const esTransportOpts = {
  level: 'info',
  client: esClient as any,
  index: 'profile-service-logs',
  dataStream: false,
  clientOpts: {
    maxRetries: 5,
    requestTimeout: 30000,
    sniffOnStart: false
  }
}

const esTransport = new ElasticsearchTransport(esTransportOpts)

esTransport.on('error', error => {
  console.error("Elasticsearch logging error: ", error)
})

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
)

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(({ level, message, timestamp, ...meta }) => {
    const msgStr = typeof message === 'object' ? JSON.stringify(message) : message;
    const metaStr = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : '';
    return `${timestamp} [${level}]: ${msgStr} ${metaStr}`;
  })
);


export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'debug',
  format: logFormat,
  defaultMeta: {
    service: "profile-service",
    environment: process.env.NODE_ENV || 'development',
    hostname: process.env.HOSTNAME || 'localhost'
  },
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: consoleFormat
    }),
    esTransport
  ]
})

if (process.env.NODE_ENV === 'production') {
  logger.level = 'info';
}

export const loggerStream = {
  write: (message: string) => {
    logger.info(message.trim());
  }
}

export const logInfo = (message: string, meta?: any) => logger.info(message, meta)
export const logWarn = (message: string, meta?: any) => logger.warn(message, meta)
export const logError = (message: string, meta?: any) => logger.error(message, meta)
