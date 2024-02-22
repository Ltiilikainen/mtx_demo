import { createLogger, transports, format } from "winston";

const errorLogger = createLogger({
  transports: [
    new transports.File({
      filename: "errors.log",
      level: "warn",
      format: format.combine(format.timestamp(), format.json({ space: 4 }))
    })
  ]
});

export default errorLogger;
