import {Container} from "~/src/core/common/dependencies/Container";
import {useGamePresenter} from "~/src/lib/composables/common/useGamePresenter";
import {ApiClientImpl} from "~/src/core/common/infrastructure/ApiClientImpl";
import {useGuessPresenter} from "~/src/lib/composables/common/useGuessPresenter";
import {useDictionaryProvider} from "~/src/core/dictionary/infrastructure/di/useDictionaryProvider";
import * as devalue from "devalue";

export default defineNuxtPlugin((nuxt) => {
    const container = Container.instance

    // container.bind('GamePresenter', useGamePresenter(new ApiClientImpl('http://localhost:3000/api/v1')))
    // container.bind('GuessPresenter', useGuessPresenter(new ApiClientImpl('http://localhost:3000/api/v1')))
    container.bind('DictionaryPresenter', useDictionaryProvider())

    return {
        provide: {
            container: container
        }
    }
})