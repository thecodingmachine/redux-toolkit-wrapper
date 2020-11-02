export const stateKeysExists = (state, keys, type) => {
  keys.forEach((key) => stateKeyExists(state, key, type))
}

export const stateKeyExists = (state, key, type) => {
  if (typeof getNestedValue(state, key) === 'undefined') {
    console.error(`Invalid state key : ${key} in ${type}`)
  }
}

export const setNestedValue = (state, dotKey, value) => {
  dotKey.split('.').reduce((acc, key, index, arr) => {
    if (index === arr.length - 1) {
      acc[key] = value
    }
    return acc[key]
  }, state)
}

export const getNestedValue = (state, dotKey) => {
  return dotKey.split('.').reduce((acc, key) => acc[key], state)
}