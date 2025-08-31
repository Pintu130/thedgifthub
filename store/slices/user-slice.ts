import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type UserState = {
  authenticated: boolean
  email?: string
  emailVerified?: boolean
}

const initialState: UserState = {
  authenticated: false,
  emailVerified: false,
}

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn(state, action: PayloadAction<{ email: string; emailVerified?: boolean }>) {
      state.authenticated = true
      state.email = action.payload.email
      state.emailVerified = !!action.payload.emailVerified
    },
    signOut(state) {
      state.authenticated = false
      state.email = undefined
      state.emailVerified = false
    },
  },
})

export const { signIn, signOut } = slice.actions
export default slice.reducer
