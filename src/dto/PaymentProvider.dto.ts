export type PaymentProviderDTO = {
  id: number
  paymentMethod: 'master_card' | 'stripe'
  isProduction: boolean
  apiPassword?: string
  merchantId?: string
  bankDetails?: string
}