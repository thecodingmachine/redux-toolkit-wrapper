import { createSlice } from '@reduxjs/toolkit'

export default (name, modules = [], moduleInitialState = {}) => {
  const initialState = modules.reduce(
    (acc, module) => ({
      ...acc,
      ...module.initialState,
    }),
    { ...moduleInitialState },
  )

  return createSlice({
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
  })
}