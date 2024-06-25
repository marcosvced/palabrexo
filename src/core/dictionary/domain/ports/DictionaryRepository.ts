import type {DictionaryDefinition} from "~/src/core/dictionary/domain/entities/DictionaryDefinition";

export interface DictionaryRepository {
    search(word: string): Promise<DictionaryDefinition[]>
}