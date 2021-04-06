import { Dispatch, AnyAction } from 'redux'
import { createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit'

type AsyncThunkConfig = {
  state?: unknown
  dispatch?: Dispatch
  extra?: unknown
  rejectValue?: unknown
  serializedErrorType?: unknown
}

export function buildAsyncActions<Returned, ThunkArg = void, ThunkApiConfig extends AsyncThunkConfig = {}>(
    actionName: string,
    service: Promise<Returned>,
): AsyncThunk<Returned, ThunkArg, ThunkApiConfig> {
  return createAsyncThunk(actionName, async (args, thunkAPI) => {
    try {
      // @ts-ignore
      return await service(args, thunkAPI)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  })
}
