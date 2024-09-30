import { ProfileDTO } from './Profile.dto'



export type TicketDTO = {
  id: number
  userId: number
  subject: string
  message: string
  replyMessage: string
  assignedToId: number
  assignedById: number
  parentTicketId: any
  status: 'open' | 'closed' | 'inProgress' | 'resolved'
  createdAt: string
  user: ProfileDTO
}
