import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProfileDTO } from '@/dto'
import { removeCookie } from '@/utils'
import { Module } from '@/types'



export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    isWebsiteLoading: true,
    profile: {} as Profile,
    isLoggedIn: false
  },
  reducers: {
    handleWebsiteLoader: (state, action: PayloadAction<boolean>) => {
      state.isWebsiteLoading = action.payload
    },

    updateProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload
      state.isLoggedIn = true
    },

    handleLogout: () => {
      removeCookie('token')
      window.location.replace('/')
    }
  }
})


type Profile = ProfileDTO & { modules: Record<string, Module> }


export const {
  handleWebsiteLoader,
  updateProfile,
  handleLogout,
} = layoutSlice.actions