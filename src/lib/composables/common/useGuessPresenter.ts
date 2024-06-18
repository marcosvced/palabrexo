import {
    GuessDictionaryRepositoryImpl
} from "~/src/core/guess/infrastructure/repositories/GuessDictionaryRepositoryImpl";
import {GuessDictionaryServiceImpl} from "~/src/core/guess/domain/application/services/GuessDictionaryServiceImpl";
import {SubmitGuessUseCase} from "~/src/core/guess/domain/application/actions/SubmitGuessUseCase";
import {
    CheckGuessWordIsInDictionaryUseCase
} from "~/src/core/guess/domain/application/actions/CheckGuessWordIsInDictionaryUseCase";
import {GuessPresenter} from "~/src/core/guess/presentation/GuessPresenter";
import {ApiClientImpl} from "~/src/core/common/infrastructure/ApiClientImpl";

export const useGuessPresenter = () => {
    const apiClient = new ApiClientImpl('http://localhost:3000/api/v1')

    const guessDictionaryRepository = new GuessDictionaryRepositoryImpl(apiClient)
    const guessDictionaryService = new GuessDictionaryServiceImpl(guessDictionaryRepository)

    return GuessPresenter(
        new SubmitGuessUseCase(guessDictionaryService),
        new CheckGuessWordIsInDictionaryUseCase(guessDictionaryService)
    )
}