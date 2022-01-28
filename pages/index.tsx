import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { localeFromBrowser } from '@/i18n'

// Redirect to the user’s preferred locale
const Index = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace(`/${localeFromBrowser()}`)
  }, [router])

  return <div />
}

export default Index
