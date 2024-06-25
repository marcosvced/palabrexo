import {SerializerContainer} from "~/src/core/common/domain/entities/Serialize";
import {Either} from "~/src/core/common/domain/entities/Either";
import {Alert} from "~/src/core/alert/domain/entities/AlertModel";
import {Game} from "~/src/core/game/domain/entities/GameModel";
import {Guess} from "~/src/core/guess/domain/entities/GuessModel";
import {DictionaryDefinition} from "~/src/core/dictionary/domain/entities/DictionaryDefinition";

export default definePayloadPlugin((nuxt) => {
    if (import.meta.client) {
        SerializerContainer['Game'] = Game
        SerializerContainer['Guess'] = Guess
        SerializerContainer['DictionaryDefinition'] = DictionaryDefinition
        SerializerContainer['Alert'] = Alert
        SerializerContainer['Either'] = Either
    }
})