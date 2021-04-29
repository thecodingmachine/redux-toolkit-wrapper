import { UnscopedAsyncState, ScopedAsyncState } from "../../type"

export default (scope?: string): UnscopedAsyncState | ScopedAsyncState => {
  if (scope) {
    return {
      [scope]: { loading: false, error: null },
    }
  }
  return {
    loading: false, error: null,
  }
}
