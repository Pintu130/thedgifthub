import { configureStore } from "@reduxjs/toolkit"
import cart from "./slices/cart-slice"
import user from "./slices/user-slice"
import watchlist from "./slices/watchlist-slice"

export const store = configureStore({
  reducer: { cart, user, watchlist },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
