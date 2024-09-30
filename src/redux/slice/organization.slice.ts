import { CurrencyDTO, OrganizationDTO } from '@/dto'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'



type TOrganization = Omit<OrganizationDTO, 'status' | 'email' | 'phone' | 'currencyId' | 'displayCurrencyId'> & {
  defaultCurrency: CurrencyDTO
  displayCurrency: CurrencyDTO
}

export const organizationSlice = createSlice({
  name: 'organization',
  initialState: {} as TOrganization,
  reducers: {
    setOrganization: (state, action: PayloadAction<TOrganization>) => {
      const keys = Object.keys(action.payload) as (keyof TOrganization)[]
      keys.map((item) => {
        // @ts-ignore
        state[item] = action.payload[item]
      })
    },
  }
})


export const {
  setOrganization
} = organizationSlice.actions