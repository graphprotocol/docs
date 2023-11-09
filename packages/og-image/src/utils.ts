import { initWasm, Resvg } from '@resvg/resvg-wasm'
import { ReactNode } from 'react'
import satori, { FontWeight } from 'satori'

import resvgWasm from '../vender/index_bg.wasm'

export function toImage(svg: string): Uint8Array {
  const resvg = new Resvg(svg)
  const pngData = resvg.render()
  return pngData.asPng()
}

type Font = { data: ArrayBuffer; weight: FontWeight; name: string }

export async function loadGoogleFont({ family, weight }: { family: string; weight?: number }): Promise<Font> {
  const params: Record<string, string> = {
    family: `${family}${weight ? `:wght@${weight}` : ''}`,
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
  return {
    data: await res.arrayBuffer(),
    weight: Number(/weight: (.+);/.exec(css)?.[1]) as FontWeight,
    name: family,
  }
}

let fonts: Font[]
let init = false

export async function toSVG(node: ReactNode): Promise<string> {
  if (!init) {
    fonts = await Promise.all([
      loadGoogleFont({ family: 'Noto Sans', weight: 400 }),
      loadGoogleFont({ family: 'Noto Sans Arabic', weight: 400 }),
      // await loadGoogleFont({ family: 'Noto Sans JP', weight: 400 }),
      loadGoogleFont({ family: 'Noto Sans KR', weight: 400 }), // ko
      loadGoogleFont({ family: 'Noto Sans SC', weight: 400 }), // zh
    ])
    await initWasm(resvgWasm)
    init = true
  }
  return satori(node, {
    width: 1200,
    height: 600,
    fonts,
  })
}
