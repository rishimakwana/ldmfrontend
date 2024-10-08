export type RootLayoutProps = {
  header?: boolean
  footer?: boolean
  title: string
} & (
    {
      pageType: 'public' | 'auth'
      sidebar?: void
    }
    |
    {
      pageType: 'protected'
      sidebar?: boolean
    }
  )