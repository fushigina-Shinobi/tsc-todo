import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from '../../store'

// Define a type for the slice state
interface NoteList { id: number; title: string; tags: string[]; body: string }

// Define the initial state using that type
const initialState: NoteList[] = []


export const todoSlice = createSlice({
  name: 'notes',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setNoteList: (state) => {
      console.log(state, 'check state')
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
})

export const { setNoteList } = todoSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default todoSlice.reducer