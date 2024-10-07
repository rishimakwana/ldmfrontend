import { api } from './api.config'

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({

    uploadFile: builder.mutation<string[], {  images: any | any[] }>({
      query: ({ images,  }) => {
        console.log(images,"uploadFile-----")

        const formData = new FormData()
        if (images instanceof File) formData.append('images', images)
        else images.map((item : any ) => formData.append('files', item as any))

        return {
          url: '/common/uploadImg',
          method: 'POST',
          formData: true,
          body: formData,
          headers: { hideToast: 'true' },
        }
      },
    }),

    
  })
})


export const {
  useUploadFileMutation
} = extendedApi