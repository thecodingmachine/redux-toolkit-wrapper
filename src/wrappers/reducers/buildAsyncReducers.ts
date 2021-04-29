import { stateKeysExists, setNestedValue, stateKeyExists } from '../../utils'
import { AnyAction } from 'redux'
import { DefaultStateKeys, ReturnedReducers } from '../../type'

export function buildAsyncReducers<S> (defaultKeys: DefaultStateKeys): ReturnedReducers<S> {
  const { itemKey = 'item', loadingKey = 'loading', errorKey = 'error' } = defaultKeys

  function pending(state: S, { type }: AnyAction) {
    stateKeysExists(state, [loadingKey, errorKey], type)
    setNestedValue(state, loadingKey, true)
    setNestedValue(state, errorKey, null)
  }

  const fulfilled = (state: S, { payload, type }: AnyAction) => {
    stateKeysExists(state,[loadingKey, errorKey], type)
    if (itemKey) {
      stateKeyExists(state, itemKey, type)
      setNestedValue(state, itemKey, payload)
    }
    setNestedValue(state, loadingKey, false)
    setNestedValue(state, errorKey, null)
  }

  const rejected = (state: S, { payload, type }: AnyAction) => {
    stateKeysExists(state, [loadingKey, errorKey], type)
    setNestedValue(state, loadingKey, false)
    setNestedValue(state, errorKey, payload)
  }

  return {
    pending,
    fulfilled,
    rejected,
  }
}
