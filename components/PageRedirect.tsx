import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { useLocale } from '@/hooks'

export const PageRedirect = () => {
  const router = useRouter()
  const { getPathWithCurrentLocale } = useLocale()

  useEffect(() => {
    router.replace(getPathWithCurrentLocale('/'))
  }, [router, getPathWithCurrentLocale])

  return <div />
}
