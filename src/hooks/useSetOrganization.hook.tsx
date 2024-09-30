import { useEffect } from 'react'

import { getCookie } from '@/utils'
import { useReduxDispatch } from '@/hooks'
import { setOrganization } from '@/redux/slice/organization.slice'



export const useSetOrganization = () => {
  const dispatch = useReduxDispatch()


  useEffect(() => {
    const organization = getCookie('organization')

    if (organization) {
      const finalDetails = JSON.parse(organization)
      dispatch(setOrganization(finalDetails))
    }
  }, [])
}
