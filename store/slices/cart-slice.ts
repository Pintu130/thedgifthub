import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"

export type CartItem = {
  id: string
  name: string
  price: number
  image?: string
  qty: number
}

type CartState = { items: CartItem[] }

const initialState: CartState = { items: [] }

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const existing = state.items.find((i) => i.id === action.payload.id)
      if (existing) {
        existing.qty += action.payload.qty
      } else {
        state.items.push(action.payload)
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.id !== action.payload)
    },
    updateQty(state, action: PayloadAction<{ id: string; qty: number }>) {
      const item = state.items.find((i) => i.id === action.payload.id)
      if (item) item.qty = Math.max(1, action.payload.qty)
    },
    clearCart(state) {
      state.items = []
    },
  },
})

export const { addItem, removeItem, updateQty, clearCart } = slice.actions
export default slice.reducer

export const selectCartTotal = (state: RootState) => state.cart.items.reduce((sum, i) => sum + i.price * i.qty, 0)
