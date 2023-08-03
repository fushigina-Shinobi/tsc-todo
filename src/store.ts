import { configureStore } from '@reduxjs/toolkit'
import notesReducer from './features/todo/todoSlice'
import modalReducer from './features/modal/modalSlice'
import tagsReducer from './features/tags/tagsSlice'

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    modal: modalReducer,
    tags: tagsReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch