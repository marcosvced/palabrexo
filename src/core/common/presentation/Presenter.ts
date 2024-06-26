import type {DataException} from "~/src/core/common/domain/entities/DataException";

export abstract class Presenter {
    private _store: any = undefined

    set store(store: any) {
        this._store = store
    }

    get store() {
        return this._store()
    }

    abstract defineStore: (key: string) => any
    abstract handlerException?: (exception: DataException) => void
}