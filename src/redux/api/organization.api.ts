import { api } from './api.config'
import { OrganizationDTO } from '@/dto'
import { Pagination, PaginationApiResponse } from '@/types'



export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({

    addOrganization: builder.mutation<void, FormData>({
      query: (body) => ({ url: '/v1/Organization', method: 'POST', formData: true, body }),
      invalidatesTags: (result, error) => !error ? [{ type: 'organization', id: 'LIST' }] : [],
    }),

    updateOrganization: builder.mutation<void, OrganizationDTO>({
      query: ({ id, ...body }) => ({ url: `/v1/Organization/${id}`, method: 'PUT', body }),
      invalidatesTags: (result, error, { id }) => !error ? [{ type: 'organization', id }] : [],
    }),

    deleteOrganization: builder.mutation<void, number>({
      query: (id) => ({ url: `/v1/Organization/${id}`, method: 'DELETE' }),
      invalidatesTags: (result, error, id) => !error ? [{ type: 'organization', id }, { type: 'organization', id: 'LIST' }] : [],
    }),

    getOrganization: builder.query<OrganizationDTO, number>({
      query: (id) => `/v1/Organization/${id}`,
      providesTags: (result, error, id) => !error ? [{ type: 'organization', id }] : []
    }),

    getOrganizationList: builder.query<PaginationApiResponse<OrganizationDTO>, Pagination>({
      query: (params) => ({ url: `/v1/Organization/all`, params }),
      providesTags: (result, error) => !error ? [...result!.list.map(({ id }) => ({ type: 'organization' as const, id })), { type: 'organization', id: 'LIST' }] : [{ type: 'organization', id: 'LIST' }]
    }),

    updateSettings: builder.mutation<void, Partial<OrganizationDTO>>({
      query: (body) => ({ url: `/v1/Organization/settings`, method: 'PUT', body }),
      invalidatesTags: (result, error, { id }) => !error ? [{ type: 'organization', id }, { type: 'profile' }] : [],
    }),

    getOrganizationTypeList: builder.query<{ id: number, type: string }[], void>({
      query: () => '/v1/Organization/types/public/all',
      providesTags: (result, error) => !error ? [{ type: 'organization', id: 'TYPE_LIST' }] : []
    }),

  })
})


export const {
  useGetOrganizationQuery,
  useGetOrganizationListQuery,
  useAddOrganizationMutation,
  useUpdateOrganizationMutation,
  useDeleteOrganizationMutation,
  useUpdateSettingsMutation,
  useGetOrganizationTypeListQuery,
} = extendedApi