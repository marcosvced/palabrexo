import { SerializerDependencies } from '~/src/core/common/infrastructure/dependencies/SerializerDependencies'

export default definePayloadPlugin(() => {
  definePayloadReducer('JSONParse', data => data && typeof data === 'object' && '__key' in data && JSON.stringify(data))
  definePayloadReviver('JSONParse', data => JSON.parse(data).__key ? new SerializerDependencies[JSON.parse(data).__key](JSON.parse(data)) : JSON.parse(data))
})
