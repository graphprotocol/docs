import { handler } from '../src/handler'

vi.mock('../vendor/index_bg.wasm', async () => {
  const fs = await import('node:fs/promises')
  const wasm = await fs.readFile(require.resolve('@resvg/resvg-wasm/index_bg.wasm'))
  return {
    default: wasm,
  }
})

const config = {
  failureThresholdType: 'percent',
  failureThreshold: 0.05,
}

describe('handler()', () => {
  it('no title', async () => {
    const response = await handler({
      url: 'http://localhost:3000',
    } as Request)
    const result = Buffer.from(await response.arrayBuffer())
    expect(result).toMatchImageSnapshot(config)
  })
  it('should align title and have container padding', async () => {
    const response = await handler({
      url: 'http://localhost:3000?title=Hello this is a test of really really really really really really long title',
    } as Request)
    const result = Buffer.from(await response.arrayBuffer())
    expect(result).toMatchImageSnapshot(config)
  })
  it('should align title without whitespaces', async () => {
    const response = await handler({
      url: 'http://localhost:3000?title=Home',
    } as Request)
    const result = Buffer.from(await response.arrayBuffer())
    expect(result).toMatchImageSnapshot(config)
  })

  describe('show individual languages', () => {
    for (const [lang, title] of Object.entries({
      hi: 'फोर्क्स का उपयोग करके त्वरित और आसान सबग्राफ डिबगिंग',
      ja: 'フォークを用いた迅速かつ容易なサブグラフのデバッグ',
      ko: '다중서명 지갑 사용하기',
      ru: 'Замените контракт и сохраните его историю с помощью Grafting',
      ua: 'Мережа The Graph в порівнянні з Самостійним хостингом',
      zh: '使用分叉快速轻松地调试子图',
    })) {
      it(lang, async () => {
        const response = await handler({
          url: `http://localhost:3000?title=${title}`,
        } as Request)
        const result = Buffer.from(await response.arrayBuffer())
        expect(result).toMatchImageSnapshot(config)
      })
    }
  })
})
