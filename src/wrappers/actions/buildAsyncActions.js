import { createAsyncThunk } from '@reduxjs/toolkit'

export default (actionName, action = () => {}) => {
  return createAsyncThunk(actionName, async (args, thunkAPI) => {
    try {
      return await action(args, thunkAPI)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  })
}