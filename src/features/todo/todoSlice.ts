import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store';

interface NoteList { id: number; title: string; tags: string[]; body: string }

const initialState: NoteList[] = []

export const todoSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNoteList: (state, action: PayloadAction<NoteList[]>) => {
      return action.payload;
    }
  },
})

export const { setNoteList } = todoSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectNote = (state: RootState) => state.notes

export default todoSlice.reducer