
const getTimeStamp = (): string => {
  return new Date().toISOString();
}

const info = (namespace: string, msg: string, object?: any) => {
  console.log(`[${getTimeStamp()}] [INFO] [${namespace}] ${msg}`, object ? object : "");
}

const warn = (namespace: string, msg: string, object?: any) => {
  console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${msg}`, object ? object : "");
}

const error = (namespace: string, msg: string, object?: any) => {
  console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${msg}`, object ? object : "");
}

const debug = (namespace: string, msg: string, object?: any) => {
  console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${msg}`, object ? object : "");
}

const logger = { info, warn, error, debug };

export default logger;