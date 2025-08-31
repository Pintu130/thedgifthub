"use client"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type WatchlistState = { ids: string[] }

const initialState: WatchlistState = { ids: [] }

const slice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    toggle: (state, action: PayloadAction<string>) => {
      const id = action.payload
      const i = state.ids.indexOf(id)
      if (i >= 0) state.ids.splice(i, 1)
      else state.ids.push(id)
    },
    add: (state, action: PayloadAction<string>) => {
      const id = action.payload
      if (!state.ids.includes(id)) state.ids.push(id)
    },
    remove: (state, action: PayloadAction<string>) => {
      const id = action.payload
      state.ids = state.ids.filter((x) => x !== id)
    },
    clear: (state) => {
      state.ids = []
    },
  },
})

export const { toggle, add, remove, clear } = slice.actions
export default slice.reducer

// selectors
export const selectWatchlistIds = (s: { watchlist: WatchlistState }) => s.watchlist.ids
export const makeSelectIsWatchlisted = (id: string) => (s: { watchlist: WatchlistState }) =>
  s.watchlist.ids.includes(id)
