import {
  createSlice,
  Slice,
  SliceCaseReducers,
  CreateSliceOptions,
  AsyncThunk,
  ValidateSliceCaseReducers,
} from '@reduxjs/toolkit'
import { ModuleGetter } from '../../type'
import { ActionCreator } from "redux"

type buildSliceReturn<Returned, ThunkArg, ThunkApiConfig> = Omit<Slice, "actions"> | {
  [key: string]: AsyncThunk<Returned, ThunkArg, ThunkApiConfig>
}

export function buildSlice<Returned, ThunkArg, ThunkApiConfig, S, CaseReducers extends SliceCaseReducers<S>, Name extends string = string> (
  name: Name,
  modules: ModuleGetter<S, Returned, ThunkArg, ThunkApiConfig>[] = [],
  sliceInitialState: S = Object.create({}),
  reducers: ValidateSliceCaseReducers<S, CaseReducers> = Object.create({}),
): buildSliceReturn<Returned, ThunkArg, ThunkApiConfig> {

  let actions: Record<string, AsyncThunk<Returned, ThunkArg, ThunkApiConfig>> = {}

  const initialState: S = modules.reduce(
    (acc: typeof sliceInitialState, getModule: ModuleGetter<S, Returned, ThunkArg, ThunkApiConfig>) => ({
      ...acc,
      ...getModule(name).initialState,
    }),
    sliceInitialState,
  )

  const options: CreateSliceOptions<S, CaseReducers, Name> = {
    name,
    initialState: initialState,
    extraReducers: (builder) => {
      modules.forEach((getModule) => {
        // Redux toolkit createAsyncThunk automatically create the typePrefix prop
        const module = getModule(name)
        const { actionName, asyncThunk } = module.action
        actions = {
          ...actions,
          [`${actionName}Action`]: asyncThunk,
        }
        if (asyncThunk.typePrefix) {
          Object.entries(asyncThunk).forEach(([actName, action]) => {
            if (typeof action === 'function') {
              builder.addCase(
                  asyncThunk[actName],
                  module.reducers[actName],
              )
            }
          })
        } else {
          builder.addCase(asyncThunk, module.reducers)
        }
      })
    },
    reducers,
  }

  const { actions: sliceActions, ...slice } = createSlice(options)

  return {
    ...slice,
    ...Object.entries(sliceActions).reduce((acc, [actionsName, action]) => {
      return {
        ...acc,
        [`${actionsName}Action`]: action,
      }
    },{}) as Record<string, AsyncThunk<Returned, ThunkArg, ThunkApiConfig>>,
    ...Object.entries(actions).reduce((acc, [actionsName, action]) => {
      return {
        ...acc,
        [actionsName]: action,
      }
    },{}) as Record<string, ActionCreator<Returned>>,
  }
}
