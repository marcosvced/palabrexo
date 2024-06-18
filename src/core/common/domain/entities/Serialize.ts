
export const SerializerContainer: { [key: string]: Function } = {};

export function Serialize() {
    return function <T extends { new (...args: any[]): {} }>(constructor: T) {
        const className = constructor.name;

        SerializerContainer[className] = constructor;

        const newConstructor: any = function(...args: any[]) {
            const instance = new constructor(...args);
            instance.__key = className;
            return instance;
        };

        newConstructor.prototype = Object.create(constructor.prototype);
        newConstructor.prototype.constructor = constructor;
        newConstructor.prototype.toJSON = function() {
            const json: Record<string, any> = {};
            Object.entries(this).forEach(([key, value]) => json[key] = value);
            return json;
        };

        return newConstructor;
    };
}