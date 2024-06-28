import { SerializerDependencies } from '~/src/core/common/infrastructure/dependencies/SerializerDependencies'

export function Serialize() {
  return function <T extends { new(...args: any[]): NonNullable<unknown> }>(constructor: T) {
    const className = constructor.name

    SerializerDependencies[className] = constructor

    const newConstructor: any = function (...args: any[]) {
      const instance = new constructor(...args)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      instance.__key = className
      return instance
    }

    newConstructor.prototype = Object.create(constructor.prototype)
    newConstructor.prototype.constructor = constructor
    newConstructor.prototype.toJSON = function () {
      const json: Record<string, any> = {}
      Object.entries(this).forEach(([key, value]) => json[key] = value)
      return json
    }

    return newConstructor
  }
}
