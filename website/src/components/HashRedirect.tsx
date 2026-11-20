import { useEffect } from 'react'

interface HashRedirectProps {
  /**
   * Map of URL fragments (without the leading `#`) to destination paths.
   * Destinations are locale-relative (e.g. `/resources/getting-grt/`) and may include their own fragment.
   * Fragments never reach the server, so these redirects can't live in `nginx.conf`.
   */
  redirects: Record<string, string>
}

export const HashRedirect = ({ redirects }: HashRedirectProps) => {
  useEffect(() => {
    const redirect = () => {
      const hash = decodeURIComponent(window.location.hash.replace(/^#/, ''))
      const destination = hash ? redirects[hash] : undefined
      if (!destination) return
      const basePath = process.env.BASE_PATH ?? ''
      const [locale] = window.location.pathname.substring(basePath.length).split('/').filter(Boolean)
      window.location.replace(`${basePath}/${locale ?? 'en'}${destination}`)
    }
    redirect()
    window.addEventListener('hashchange', redirect)
    return () => window.removeEventListener('hashchange', redirect)
  }, [redirects])

  return null
}
