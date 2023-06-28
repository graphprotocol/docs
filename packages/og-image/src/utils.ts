import { ReactNode } from 'react';
import satori from 'satori';
import { initWasm, Resvg } from '@resvg/resvg-wasm';
import resvgWasm from '../vender/index_bg.wasm';

export function shade(color: string, amount: number): string {
  let result = '';
  if (!color) {
    return result;
  }
  if (color[0] === '#') {
    color = color.slice(1);
    result = '#';
  }

  const num = parseInt(color, 16);

  let r = (num >> 16) + amount;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00_ff) + amount;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (num & 0x00_00_ff) + amount;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return result + (g | (b << 8) | (r << 16)).toString(16);
}

export function toImage(svg: string): Uint8Array {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}

export async function loadGoogleFont({
  family,
  weight,
  text,
}: {
  family: string;
  weight?: number;
  text?: string;
}): Promise<ArrayBuffer> {
  const params: Record<string, string> = {
    family: `${family}${weight ? `:wght@${weight}` : ''}`,
    ...(text ? { text } : { subset: 'latin' }),
  };

  const url = `https://fonts.googleapis.com/css2?${new URLSearchParams(params)}`;

  const response = await fetch(String(url), {
    headers: {
      // construct user agent to get TTF font
      'User-Agent':
        'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
    },
  });
  const css = await response.text();
  // Get the font URL from the CSS text
  const fontUrl = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)?.[1];

  if (!fontUrl) {
    throw new Error('Could not find font URL');
  }

  return fetch(fontUrl).then(res => res.arrayBuffer());
}

let notoSans: Promise<ArrayBuffer>;
let init = false;

export async function toSVG(node: ReactNode): Promise<string> {
  if (!init) {
    notoSans = await loadGoogleFont({
      family: 'Noto Sans JP',
      weight: 400,
    });
    await initWasm(resvgWasm);
    init = true;
  }
  return satori(node, {
    width: 1200,
    height: 600,
    fonts: [{ name: 'NotoSansJP', data: notoSans, weight: 400 }],
  });
}
