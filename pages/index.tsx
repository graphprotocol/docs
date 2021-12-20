import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { localeFromBrowser } from '@/locale'

// Redirect to user’s preferred locale
const Index = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace(`/${localeFromBrowser()}`)
  }, [router])

  return <div />
}

export default Index
