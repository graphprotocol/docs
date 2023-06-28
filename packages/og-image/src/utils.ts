import { initWasm, Resvg } from '@resvg/resvg-wasm'
import { ReactNode } from 'react'
import satori from 'satori'

import resvgWasm from '../vender/index_bg.wasm'

export function toImage(svg: string): Uint8Array {
  const resvg = new Resvg(svg)
  const pngData = resvg.render()
  return pngData.asPng()
}

export async function loadGoogleFont({
  family,
  weight,
  text,
}: {
  family: string
  weight?: number
  text?: string
}): Promise<ArrayBuffer> {
  const params: Record<string, string> = {
    family: `${family}${weight ? `:wght@${weight}` : ''}`,
    ...(text ? { text } : { subset: 'latin' }),
  }

  const url = `https://fonts.googleapis.com/css2?${new URLSearchParams(params)}`

  const response = await fetch(url, {
    headers: {
      // construct user agent to get TTF font
      'User-Agent':
        'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
    },
  })
  const css = await response.text()
  // Get the font URL from the CSS text
  const fontUrl = /src: url\((.+)\) format\('(opentype|truetype)'\)/.exec(css)?.[1]

  if (!fontUrl) {
    throw new Error('Could not find font URL')
  }

  const res = await fetch(fontUrl)
  return res.arrayBuffer()
}

let notoSans: ArrayBuffer
let init = false

export async function toSVG(node: ReactNode): Promise<string> {
  if (!init) {
    notoSans = await loadGoogleFont({
      family: 'Noto Sans JP',
      weight: 400,
    })
    await initWasm(resvgWasm)
    init = true
  }
  return satori(node, {
    width: 1200,
    height: 600,
    fonts: [{ name: 'NotoSansJP', data: notoSans, weight: 400 }],
  })
}
