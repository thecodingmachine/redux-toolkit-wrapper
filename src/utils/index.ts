export function stateKeysExists<S> (state: S, keys: Array<string>, type: string): void {
  keys.forEach((key) => stateKeyExists(state, key, type))
}

export function stateKeyExists<S> (state: S, key: string, type: string): void {
  if (typeof getNestedValue(state, key) === 'undefined') {
    console.error(`Invalid state key : ${key} in ${type}`)
  }
}

export function setNestedValue<S>(state: S, dotKey: string, value: unknown): void {
  dotKey.split('.').reduce((acc: S, key: string, index: number, arr: Array<string>) => {
    if (index === arr.length - 1) {
      (acc as any)[key]  = value
    }
    return (acc as any)[key]
  }, state)
}

export function getNestedValue<S>(state: S, dotKey: string): unknown {
  return dotKey.split('.').reduce((acc: S, key: string) => (acc as any)[key], state)
}
