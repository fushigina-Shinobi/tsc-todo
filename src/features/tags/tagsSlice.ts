import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
export interface TagsData {
  value: string;
  label: string;
}

const initialState: TagsData[] = [];

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setTagsData: (state, action: PayloadAction<TagsData[]>) => {
      return action.payload;
    },
  },
});

export const { setTagsData } = tagsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTag = (state: RootState) => state.tags

export default tagsSlice.reducer;
