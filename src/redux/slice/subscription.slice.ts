import { SubscriptionPlanDTO } from '@/dto'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'



export const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState: {
    plan: {} as SubscriptionPlanDTO
  },
  reducers: {
    setSubscriptionPlan: (state, action: PayloadAction<SubscriptionPlanDTO>) => {
      state.plan = action.payload
    },
  }
})


export const {
  setSubscriptionPlan
} = subscriptionSlice.actions