/* eslint react/no-unknown-property: ['error', { ignore: ['tw'] }] */
import { toImage, toSVG } from './utils'

export async function handler(request: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url)
    // ?title=<title>
    const title = searchParams.get('title')?.slice(0, 100)

    const rawSvg = await toSVG(
      <div
        tw="flex h-full flex-col w-full items-center justify-center text-white text-center p-10 pt-20"
        style={{
          backgroundImage: 'url(https://storage.googleapis.com/graph-website/seo/graph-website.jpg)',
          backgroundPosition: title ? '0 -70%' : '0 -55%',
        }}
      >
        {title && (
          // @ts-expect-error This isn't a valid CSS property supported by browsers yet.
          <span tw="text-5xl" style={{ textWrap: title.includes(' ') ? 'balance' : '' }}>
            {title}
          </span>
        )}
      </div>,
    )

    const buffer = toImage(rawSvg)

    return new Response(buffer, {
      headers: { 'Content-Type': 'image/png' },
    })
  } catch (e) {
    console.error(e)
    return new Response(`Failed to generate the image.\n\nError: ${(e as Error).message}`, {
      status: 500,
    })
  }
}
