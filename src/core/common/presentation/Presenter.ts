import type { Logger } from '~/src/core/common/infrastructure/logger/Logger'
import { Dependencies, LocatorDependencies } from '~/src/core/common/infrastructure/dependencies/LocatorDependencies'

export abstract class Presenter {
  private _store: any = undefined
  private _logger: Logger = LocatorDependencies.get(Dependencies.LOGGER)

  get logger(): Logger {
    return this._logger
  }

  set store(store: any) {
    this._store = store
  }

  get store() {
    return this._store()
  }

  abstract defineStore(key: string): any
}
