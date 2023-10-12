export function replaceGitBookContent({ content }: { content: string }): string {
  return (
    content
      // replace {% embed ... %} with <iframe />
      .replaceAll(
        /{%\s+embed\s+url="(.*?)"\s+%}/g,
        (...m) =>
          `<iframe src="${m[1].replace(
            // we need to enhance YouTube links, otherwise they will be not loaded in iframe
            'youtube.com/watch?v=',
            'youtube.com/embed/',
          )}" style={{ aspectRatio: 16/9, width: '100%' }} />`,
      )
      // remove gitbook {% ... %} elements
      .replaceAll(/{%.*?%}/g, '')
      // close unclosed img tags
      .replaceAll(/<img((?:(?!\/>)[^>])*?)>/g, (...m) => `<img${m[1]}/>`)
  )
}
