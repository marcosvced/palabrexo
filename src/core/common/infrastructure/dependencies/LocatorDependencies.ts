export enum Dependencies {
  LOGGER = 'logger',
}

const container: Map<Dependencies, any> = new Map<Dependencies, any>()

export const LocatorDependencies = {
  bind: (key: Dependencies, data: any) => {
    container.set(key, data)
  },
  get: <T>(key: Dependencies): T => {
    return container.get(key)
  },
}
