import { LoggerImpl } from '~/src/core/common/infrastructure/logger/LoggerImpl'
import { Dependencies, LocatorDependencies } from '~/src/core/common/infrastructure/dependencies/LocatorDependencies'

export default defineNuxtPlugin(() => {
  LocatorDependencies.bind(Dependencies.LOGGER, new LoggerImpl('ysmvrd/palabrexo', {
    console: {
      isEnabled: true,
    },
  }))
})
