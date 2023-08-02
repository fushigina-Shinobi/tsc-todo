import { createSlice,PayloadAction } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from '../../store'

// Define a type for the slice state
interface TagsList { tags: string[]}

// Define the initial state using that type
const initialState: TagsList[] = []


export const tagsSlice = createSlice({
  name: 'notes',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setNoteList: (state, action: PayloadAction<TagsList[]>) => {
      return action.payload;
    }

  },
})

export const { setNoteList } = tagsSlice.actions


export default tagsSlice.reducer