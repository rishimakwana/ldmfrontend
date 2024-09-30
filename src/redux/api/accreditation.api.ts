import { Pagination, PaginationApiResponse } from '@/types'
import { api } from './api.config'
import { AccreditationRequestDTO } from '@/dto/AccreditationRequest.dto'



export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({

    getAccreditationTemplate: builder.query<string, void>({
      query: () => '/v1/Organization/template',
      providesTags: (result, error) => !error ? [{ type: 'accreditation', id: 'LIST' }] : [],
    }),

    getAccreditationTemplateList: builder.query<string[], void>({
      query: () => '/v1/Master/templates',
      providesTags: (result, error) => !error ? [{ type: 'accreditation', id: 'LIST' }] : [],
    }),

    saveAccreditationTemplate: builder.mutation<void, { template: string }>({
      query: (body) => ({ url: '/v1/Organization/template', method: 'PUT', body }),
      invalidatesTags: (result, error) => !error ? [{ type: 'accreditation', id: 'LIST' }] : [],
    }),

    uploadAccreditationImage: builder.mutation<void, Partial<AccreditationRequestDTO>>({
      query: (body) => ({ url: '/v1/Admin/accreditation/template', method: 'POST', body }),
    }),

    getAccreditationImageList: builder.query<PaginationApiResponse<any>, Pagination>({
      query: (params) => ({ url: '/v1/Admin/accreditation/all', params }),
    }),

  })
})


export const {
  useGetAccreditationTemplateQuery,
  useLazyGetAccreditationTemplateQuery,
  useGetAccreditationTemplateListQuery,
  useSaveAccreditationTemplateMutation,
  useUploadAccreditationImageMutation,
  useGetAccreditationImageListQuery,
} = extendedApi