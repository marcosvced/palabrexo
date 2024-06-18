import {Ploc} from "~/src/core/common/presentation/Ploc";
import type {Dictionary} from "~/src/core/dictionary/domain/entities/Dictionary";
import type {GetAlphabetUseCase} from "~/src/core/dictionary/domain/application/actions/GetAlphabetUseCase";
import type {GetLetterPerRowsUseCase} from "~/src/core/dictionary/domain/application/actions/GetLetterPerRowsUseCase";

export class DictionaryPresenter extends Ploc<Dictionary> {
    constructor(
        private readonly getAlphabetUseCase:  GetAlphabetUseCase,
        private readonly getLetterPerRowsUseCase:  GetLetterPerRowsUseCase,
    ) {
        super()
    }

    getAlphabet () {
        return this.getAlphabetUseCase.execute()
    }

    getLetterPerRows () {
        return this.getLetterPerRowsUseCase.execute()
    }

    toJSON() {
        const json:Record<string, any> = {}
        Object.entries(this).forEach(([key, value]) => json[key] = value)
        return json
    }
}