import { api } from './api.config'

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

  })
})


export const {
  useUploadFileMutation
} = extendedApi