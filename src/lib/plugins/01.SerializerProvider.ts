import { Either } from '~/src/core/common/domain/entities/Either'
import { Alert } from '~/src/core/alert/domain/entities/AlertModel'
import { Game } from '~/src/core/game/domain/entities/GameModel'
import { Guess } from '~/src/core/guess/domain/entities/GuessModel'
import { DictionaryDefinition } from '~/src/core/dictionary/domain/entities/DictionaryDefinition'
import { SerializerDependencies } from '~/src/core/common/infrastructure/dependencies/SerializerDependencies'

export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    SerializerDependencies.Game = Game
    SerializerDependencies.Guess = Guess
    SerializerDependencies.DictionaryDefinition = DictionaryDefinition
    SerializerDependencies.Alert = Alert
    SerializerDependencies.Either = Either
  }
})
