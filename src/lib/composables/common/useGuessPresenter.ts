import { DictionaryRepositoryImpl } from '~/src/core/dictionary/infrastructure/repositories/DictionaryRepositoryImpl'
import { GuessServiceImpl } from '~/src/core/guess/domain/application/services/GuessServiceImpl'
import { SubmitGuessUseCase } from '~/src/core/guess/domain/application/actions/SubmitGuessUseCase'
import {
  CheckGuessWordIsInDictionaryUseCase,
} from '~/src/core/guess/domain/application/actions/CheckGuessWordIsInDictionaryUseCase'
import { GuessPresenter } from '~/src/core/guess/presentation/GuessPresenter'
import { ApiClientImpl } from '~/src/core/common/infrastructure/api/ApiClientImpl'

export function useGuessPresenter() {
  const { public: { API_BASE_URL } } = useRuntimeConfig()

  const apiClient = new ApiClientImpl(API_BASE_URL)

  const dictionaryRepositoryImpl = new DictionaryRepositoryImpl(apiClient)
  const guessServiceImpl = new GuessServiceImpl(dictionaryRepositoryImpl)

  const presenter = new GuessPresenter(
    new SubmitGuessUseCase(guessServiceImpl),
    new CheckGuessWordIsInDictionaryUseCase(guessServiceImpl),
  )

  return presenter.store
}
