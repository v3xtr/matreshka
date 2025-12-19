import { logInfo, logWarn, logError } from './internal/adapter/logger/logger.js'

async function sendTestLogs() {
  logInfo('Test info log')
  logWarn('Test warn log')
  logError('Test error log')
  console.log('Logs sent')
}

sendTestLogs()
