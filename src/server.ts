import mongoose from 'mongoose'
import config from './config/index'
import app from './app'
import { logger, errLogger } from './shared/logger'

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info(`Database connected successfully`)

    app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`)
    })
  } catch (err) {
    errLogger.error(`Failed to connect database`, err)
  }
}

bootstrap()
