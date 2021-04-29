import { createAsyncThunk, AsyncThunk, AsyncThunkPayloadCreator } from '@reduxjs/toolkit'
import { AsyncThunkConfig } from '../../type'

export function buildAsyncActions<R, TArg = void, TConfig extends AsyncThunkConfig = Record<string, never>> (
  actionName: string,
  service: AsyncThunkPayloadCreator<R, TArg, TConfig>,
  scope?: string,
): { actionName: string, asyncThunk: AsyncThunk<R, TArg, TConfig> } {
  const typePrefix = scope ? `${scope}/${actionName}` : actionName
  return {
    actionName,
    asyncThunk: createAsyncThunk(typePrefix, async(args, thunkAPI)=> {
    try {
      return await service(args, thunkAPI)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
),
}
}
