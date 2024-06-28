import { Dependencies, LocatorDependencies } from '~/src/core/common/infrastructure/dependencies/LocatorDependencies'
import type { Logger } from '~/src/core/common/infrastructure/logger/Logger'

export function useLog() {
  return {
    logger: LocatorDependencies.get<Logger>(Dependencies.LOGGER),
  }
}
