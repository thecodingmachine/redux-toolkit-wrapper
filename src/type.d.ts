import { ActionCreator, AnyAction, Dispatch } from "redux"
import { AsyncThunk, AsyncThunkPayloadCreator } from "@reduxjs/toolkit"
import { ScopedAsyncState, UnscopedAsyncState } from "./wrappers/state/buildAsyncState"
import { ReturnedReducers } from "./wrappers/reducers/buildAsyncReducers"

export type AsyncThunkConfig = {
    state?: unknown
    dispatch?: Dispatch
    extra?: unknown
    rejectValue?: unknown
    serializedErrorType?: unknown
}

export interface DefaultStateKeys {
    itemKey?: string | undefined | null ,
    loadingKey?: string,
    errorKey?: string,
}

export type ReturnedReducers<S> = {
    pending: (state: S, { payload, type }: AnyAction) => void
    fulfilled: (state: S, { payload, type }: AnyAction) => void
    rejected: (state: S, { payload, type }: AnyAction) => void
}

export type BuildAsyncModuleParams<Returned, ThunkArg, ThunkConfig> = {
    isStateScoped?: boolean,
    actionName: string,
    service: AsyncThunkPayloadCreator<Returned, ThunkArg, ThunkConfig>,
    defaultStateKeys?: DefaultStateKeys
}

export type BuildAsyncModuleReturn<Returned, ThunkArg, ThunkConfig> = (name:string) => {
    initialState: UnscopedAsyncState | ScopedAsyncState,
    action: { actionName: string, asyncThunk: ActionCreator<Returned, ThunkArg, ThunkConfig> },
    reducers: ReturnedReducers<UnscopedAsyncState | ScopedAsyncState>,
}

type ModuleGetter<S, Returned, ThunkArg, ThunkConfig> = (name: string) => {
    initialState: Record<string, unknown>
    action: { actionName: string, asyncThunk: ActionCreator<Returned, ThunkArg, ThunkConfig> },
    reducers: ReturnedReducers<S>
}

export type UnscopedAsyncState = {
    loading: false,
    error: null
}

export type ScopedAsyncState = {
    [scope: string]: { loading: false, error: null },
}
