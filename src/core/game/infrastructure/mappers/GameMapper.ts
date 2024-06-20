import type {Mapper} from "~/src/core/common/infrastructure/Mapper";
import type {GameDto} from "~/src/core/game/infrastructure/dtos/GameDto";
import {Game} from "~/src/core/game/domain/entities/GameModel";
import {normalizeWord} from "~/src/core/common/helpers/normalizeWord";

export class GameMapper implements Pick<Mapper<Game, GameDto>, 'toDomain'> {

    toDomain(dto: GameDto): Game {
        const {word} = dto

        return new Game({
            wordToGuess: normalizeWord(word),
        })
    }


}