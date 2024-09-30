import { axiosInstance } from './api.config'
import { EventDTO } from '@/dto'
import { ApiResponse } from '@/types'



const getEvent = async (id: string) => {
  return await axiosInstance.get<ApiResponse<EventDTO>>(`/v1/Events/public/${id}`)
    .then(respose => respose.data.data)
    .catch(error => Promise.reject(error))
}


export const eventService = {
  getEvent
}