import {
    DictionaryRepositoryImpl
} from "~/src/core/dictionary/infrastructure/repositories/DictionaryRepositoryImpl";
import {GuessServiceImpl} from "~/src/core/guess/domain/application/services/GuessServiceImpl";
import {SubmitGuessUseCase} from "~/src/core/guess/domain/application/actions/SubmitGuessUseCase";
import {
    CheckGuessWordIsInDictionaryUseCase
} from "~/src/core/guess/domain/application/actions/CheckGuessWordIsInDictionaryUseCase";
import {GuessPresenter} from "~/src/core/guess/presentation/GuessPresenter";
import {ApiClientImpl} from "~/src/core/common/infrastructure/ApiClientImpl";

export const useGuessPresenter = () => {
    const apiClient = new ApiClientImpl('http://localhost:3000/api/v1')

    const dictionaryRepositoryImpl = new DictionaryRepositoryImpl(apiClient)
    const guessServiceImpl = new GuessServiceImpl(dictionaryRepositoryImpl)

    return GuessPresenter(
        new SubmitGuessUseCase(guessServiceImpl),
        new CheckGuessWordIsInDictionaryUseCase(guessServiceImpl)
    )
}