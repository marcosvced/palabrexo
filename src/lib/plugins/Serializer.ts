import {SerializerContainer} from "~/src/core/common/domain/entities/Serialize";

export default definePayloadPlugin((nuxt) => {
    definePayloadReducer('JSONParse', data => data && 'object' === typeof data && '__key' in data && JSON.stringify(data))
    definePayloadReviver('JSONParse', data => JSON.parse(data)['__key'] ? new SerializerContainer[JSON.parse(data)['__key']](JSON.parse(data)) : JSON.parse(data))
})