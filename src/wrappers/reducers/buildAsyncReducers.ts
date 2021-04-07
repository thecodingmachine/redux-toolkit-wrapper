import { stateKeysExists, setNestedValue, stateKeyExists } from '../../utils'
import { AnyAction} from 'redux'

interface DefaultParams {
  itemKey: string | undefined | null ,
  loadingKey?: string,
  errorKey?: string,
}

export function buildAsyncReducers<S> (params: DefaultParams) {
  const { itemKey = 'item', loadingKey = 'loading', errorKey = 'error' } = params

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
