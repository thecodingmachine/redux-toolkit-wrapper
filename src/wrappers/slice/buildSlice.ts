import {createSlice, Slice, SliceCaseReducers, CaseReducers, CreateSliceOptions} from '@reduxjs/toolkit'

type Module = {
  initialState: any
  action: any
  reducers: any
}

export function buildSlice<State, CaseReducers extends SliceCaseReducers<State>, Name extends string = string>(
    name: Name,
    modules: Module[] = [],
    moduleInitialState: State
): Slice<State, CaseReducers, Name> {

  const initialState: State = modules.reduce(
    (acc: typeof moduleInitialState, module: Module) => ({
      ...acc,
      ...module.initialState,
    }),
      moduleInitialState,
  )

  const options: CreateSliceOptions<State, CaseReducers, Name> = {
    name,
    initialState,
    extraReducers: (builder) => {
      modules.forEach((module) => {
        // Redux toolkit createAsyncThunk automatically create the typePrefix prop
        if (module.action.typePrefix) {
          Object.entries(module.action).forEach(([actionName, action]) => {
            if (typeof action === 'function') {
              builder.addCase(
                  module.action[actionName],
                  module.reducers[actionName],
              )
            }
          })
        } else {
          builder.addCase(module.action, module.reducers)
        }
      })
    },
    // @ts-ignore
    reducers: null,
  }

  return createSlice(options)
}
