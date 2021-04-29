import { AsyncThunk, CaseReducerActions, Reducer, Slice, SliceCaseReducers } from "@reduxjs/toolkit"
import { ActionCreator } from "redux"
import { ReturnedReducers } from "../../type"

/**
 *
 * @internal
 */
type RTWModuleGetter<Returned, ThunkArg, ThunkApiConfig, State> = (name: string) => {
    initialState: State
    action: {
        actionName: string,
        asyncThunk: AsyncThunk<Returned, ThunkArg, ThunkApiConfig>
    },
    reducers: Reducer<State>
}

export interface RTWSlice<
    State = any,
    CaseReducers extends SliceCaseReducers<State> = SliceCaseReducers<State>,
    Name extends string = string
> extends Omit<Slice<State, CaseReducers, Name>, "actions"> {
    []: CaseReducerActions<CaseReducers>
}

/**
 * Options for `buildSlice()`.
 *
 * @public
 */
export interface RTWCreateSliceOptions<
    State = any,
    CR extends SliceCaseReducers<State> = SliceCaseReducers<State>,
    Name extends string = string
> {
    /**
     * The slice's name. Used to namespace the generated action types.
     */
    name: Name,
    /**
     * The initial state to be returned by the slice reducer.
     */
    modules: Array<RTWModuleGetter>,
    /**
     * A mapping from action types to action-type-specific *case reducer*
     * functions. For every action type, a matching action creator will be
     * generated using `createAction()`.
     */
    sliceInitialState: State,
    reducers
}

export function buildSlice<
    State,
    CaseReducers extends SliceCaseReducers<State>,
    Name extends string = string
>(name: Name, modules: Array<RTWModuleGetter>, sliceInitialState: State, reducers): RTWSlice<Name, State> {

}

