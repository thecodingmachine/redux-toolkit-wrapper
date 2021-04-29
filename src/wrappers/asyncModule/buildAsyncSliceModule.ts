import { buildAsyncState } from "../state"
import { buildAsyncActions } from "../actions"
import { buildAsyncReducers } from "../reducers"
import { AsyncThunkConfig, BuildAsyncModuleParams, BuildAsyncModuleReturn } from "../../type"

export function buildAsyncSliceModule<R, TArg = void, TConfig extends AsyncThunkConfig = Record<string, never>> ({
    isStateScoped = true,
    actionName,
    service,
    defaultStateKeys = { itemKey: 'item', loadingKey: 'loading', errorKey: 'error'  },
}: BuildAsyncModuleParams<R, TArg, TConfig>): BuildAsyncModuleReturn<R, TArg, TConfig> {
    return (name: string) => {
        let stateKeys = defaultStateKeys
        if (isStateScoped) {
            const defaultScopedState = {
                ...defaultStateKeys,
                loadingKey: `${actionName}.loading`,
                errorKey: `${actionName}.error`,
            }
            stateKeys = { ...stateKeys, ...defaultScopedState }
        }


        return {
            initialState: buildAsyncState(isStateScoped ? actionName : undefined),
            action: buildAsyncActions(actionName, service, name),
            reducers: buildAsyncReducers(stateKeys),
        }
    }
}
