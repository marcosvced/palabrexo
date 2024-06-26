import {useDictionaryPresenter} from "~/src/lib/composables/common/useDictionaryPresenter";

export const useDictionary = async () => {
    const dictionaryPresenter = useDictionaryPresenter()
    const letters = await dictionaryPresenter.getAlphabet()
    const letterPerRow = await dictionaryPresenter.getLetterPerRows()

    return {
        letters,
        letterPerRow
    }
}