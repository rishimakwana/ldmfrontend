export type AccreditationRequestDTO = {
  instruction: string
  id: number
  status: 'pending' | 'applied' | 'rejected'
  templateImage: string
}