/* eslint react/no-unknown-property: ['error', { ignore: ['tw'] }] */
import { GuildLogo, TheGuild } from '@theguild/components/logos';
import { PRODUCTS } from '@theguild/components/products';
import { LeftCircle, RightCircle, RightSmallCircle } from './components';
import { shade, toImage, toSVG } from './utils';

const { WHATSAPP: _, ...filteredProducts } = PRODUCTS;

const products = {
  ...filteredProducts,
  GUILD: {
    name: 'The Guild',
    logo: GuildLogo,
    primaryColor: undefined,
  },
};

const englishJoinWords = (words: string[]): string =>
  new Intl.ListFormat('en-US', { type: 'disjunction' }).format(words);

const ALLOWED_PRODUCT_NAMES = englishJoinWords(Object.keys(products));

export async function handler(request: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url);
    const productName = searchParams.get('product') as keyof typeof products | null;
    const product = productName && products[productName];

    if (!product) {
      return new Response(
        `Unknown product name "${productName}".\nAllowed product names: ${ALLOWED_PRODUCT_NAMES}`,
        { status: 404 },
      );
    }
    // ?title=<title>
    const title = searchParams.get('title')?.slice(0, 100);
    const extra = searchParams.get('extra');
    const IS_GUILD = productName === 'GUILD';

    const rawSvg = await toSVG(
      <div tw="flex bg-neutral-900 h-full flex-col w-full items-center justify-center text-center text-white p-10">
        <LeftCircle tw="absolute left-0 top-0" color={product.primaryColor} />
        <RightCircle tw="absolute right-0" color={product.primaryColor} />
        <RightSmallCircle
          tw="absolute right-0 opacity-80"
          color={product.primaryColor && shade(product.primaryColor, 100)}
        />
        <product.logo style={{ width: 102, height: 108 }} />
        <span tw="font-bold text-7xl my-5">{product.name}</span>
        {title && (
          // @ts-expect-error This isn't a valid CSS property supported by browsers yet.
          <span tw="font-bold text-5xl" style={{ textWrap: title.includes(' ') ? 'balance' : '' }}>
            {title}
          </span>
        )}
        {extra && (
          <span
            tw="font-bold text-2xl mt-4"
            // @ts-expect-error This isn't a valid CSS property supported by browsers yet.
            style={{ textWrap: extra.includes(' ') ? 'balance' : '' }}
          >
            {extra}
          </span>
        )}
        {!IS_GUILD && (
          <div
            tw="flex items-center"
            style={{
              gap: '0.375rem',
              marginTop: title || extra ? 'auto' : '2rem',
            }}
          >
            <GuildLogo />
            <TheGuild />
          </div>
        )}
      </div>,
    );

    const buffer = toImage(rawSvg);

    return new Response(buffer, {
      headers: { 'Content-Type': 'image/png' },
    });
  } catch (e) {
    // eslint-disable-next-line no-console -- to debug
    console.error(e);
    return new Response(`Failed to generate the image.\n\nError: ${(e as Error).message}`, {
      status: 500,
    });
  }
}
