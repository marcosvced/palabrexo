import type {Mapper} from "~/src/core/common/infrastructure/Mapper";
import type {GameDto} from "~/src/core/game/infrastructure/dtos/GameDto";
import {Game} from "~/src/core/game/domain/entities/GameModel";
import {GameStatus} from "~/src/core/game/domain/entities/GameStatus";
import {normalizeWord} from "~/src/core/common/helpers/normalizeWord";

export class GameMapper implements Pick<Mapper<Game, GameDto>, 'toDomain'> {

    toDomain(dto: GameDto): Game {
        const {word} = dto

        return new Game({
            id: 'ppppp',
            wordToGuess: normalizeWord(word),
        })
    }


}