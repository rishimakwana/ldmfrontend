import { Module, Roles } from '@/types'



export type RootLayoutProps = {
  header?: boolean
  footer?: boolean
  title: string
} & (
    {
      pageType: 'public' | 'auth'
      sidebar?: void
      roles?: void
      module?: void
    }
    |
    {
      pageType: 'protected'
      sidebar?: boolean
      roles: Roles[]
      module?: {
        id: number
        permission: keyof Module['permissions']
      }
    }
    |
    {
      pageType: 'protected'
      sidebar?: boolean
      roles?: Roles[]
      module: {
        id: number
        permission: keyof Module['permissions']
      }
    }
  )