import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type UserState = {
  authenticated: boolean
  email?: string
  emailVerified?: boolean
  name?: string
  uid?: string
}

const initialState: UserState = {
  authenticated: false,
  emailVerified: false,
}

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn(state, action: PayloadAction<{ email: string; emailVerified?: boolean; name?: string; uid?: string }>) {
      state.authenticated = true
      state.email = action.payload.email
      state.emailVerified = !!action.payload.emailVerified
      state.name = action.payload.name
      state.uid = action.payload.uid
    },
    signOut(state) {
      state.authenticated = false
      state.email = undefined
      state.emailVerified = false
      state.name = undefined
      state.uid = undefined
    },
  },
})

export const { signIn, signOut } = slice.actions
export default slice.reducer
