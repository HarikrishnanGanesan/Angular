import { InjectionToken } from '@angular/core';
import { LoggerConfig } from 'ngx-logger';

export const LOGGER_CONFIG_TOKEN = new InjectionToken<LoggerConfig>('logger.config');

export const loggerConfig: LoggerConfig = {
  level: 'debug',
  serverLogLevel: 'off',
  disableConsoleLogging: false,
  enableSourceMaps: true,
};
