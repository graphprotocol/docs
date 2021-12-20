import { NotFound, Spacing } from '@edgeandnode/components'

import { LinkInline } from '@/components'

const Page = () => {
  return (
    <div sx={{ pb: Spacing.XXL }}>
      <NotFound
        title="Oops! This page was lost in space..."
        subtitle="Check if you’re using the right address or explore our website by clicking on the link below."
        link={<LinkInline href="/">Go Home</LinkInline>}
      />
    </div>
  )
}

export default Page
