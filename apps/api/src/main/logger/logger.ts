import pino from "pino";
import { ILogger } from "./ilogger";
const logger = pino() as ILogger;

export { logger };
