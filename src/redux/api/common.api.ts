import { CurrencyDTO } from '@/dto'
import { api } from './api.config'
import { AccessibilityDTO } from '@/dto/Accessibility.dto'
import { Request as GeneratePdfRequest } from '@/pages/api/generate-pdf.api'



export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({

    uploadFile: builder.mutation<string[], { folderName: string, files: File | File[] }>({
      query: ({ files, folderName }) => {

        const formData = new FormData()
        if (files instanceof File) formData.append('files', files)
        else files.map(item => formData.append('files', item))

        return {
          url: '/v1/Attachment/uploadFile',
          method: 'POST',
          formData: true,
          body: formData,
          params: { folderName },
          headers: { hideToast: 'true' },
        }
      },
    }),

    getTimeZones: builder.query<{ id: number, text: string }[], void>({
      query: () => '/v1/Master/TimeZones',
    }),

    getAccessiblities: builder.query<AccessibilityDTO[], void>({
      query: () => '/v1/Master/accessiblities',
    }),

    getCountries: builder.query<{ id: number, name: string, code: string }[], void>({
      query: () => '/v1/Master/countries',
    }),

    getCurrenciesList: builder.query<CurrencyDTO[], void>({
      query: () => `/v1/Master/currencies`,
      providesTags: ['currency']
    }),

    generatePdf: builder.mutation<Blob, GeneratePdfRequest['body']>({
      query: (body) => ({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/generate-pdf`,
        body,
        method: 'POST',
        headers: { hideToast: 'true' },
        responseHandler: (response) => response.blob(),
      }),
    }),

  })
})


export const {
  useUploadFileMutation,
  useGetTimeZonesQuery,
  useGetAccessiblitiesQuery,
  useGetCountriesQuery,
  useGetCurrenciesListQuery,
  useGeneratePdfMutation,
} = extendedApi