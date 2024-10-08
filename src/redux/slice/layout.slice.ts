import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProfileDTO } from '@/dto'
import { removeCookie } from '@/utils'


export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    isWebsiteLoading: true,
    profile: {} as ProfileDTO,
    isLoggedIn: false
  },
  reducers: {
    handleWebsiteLoader: (state, action: PayloadAction<boolean>) => {
      state.isWebsiteLoading = action.payload
    },

    updateProfile: (state, action: PayloadAction<ProfileDTO>) => {
      state.profile = action.payload
      state.isLoggedIn = true
    },

    handleLogout: () => {
      removeCookie('token')
      window.location.replace('/login')
    }
  }
})

export const {
  handleWebsiteLoader,
  updateProfile,
  handleLogout,
} = layoutSlice.actions