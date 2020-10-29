import { createSlice } from '@reduxjs/toolkit'

export default (name, modules = [], moduleInitialState = {}, extraReducers = () => {}) => {
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
        builder
          .addCase(module.action.pending, module.reducers.pending)
          .addCase(module.action.fulfilled, module.reducers.fulfilled)
          .addCase(module.action.rejected, module.reducers.rejected)
      })
      extraReducers(builder)
    },
  })
}