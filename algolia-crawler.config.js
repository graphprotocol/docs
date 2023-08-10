new Crawler({
  appId: 'WQ5FYJCL00',
  apiKey: '[SECRET]',
  schedule: 'every 7 days',
  indexPrefix: '',
  rateLimit: 8,
  startUrls: [
    'https://thegraph.com/docs/en/',
    'https://thegraph.com/docs/ar/',
    'https://thegraph.com/docs/es/',
    'https://thegraph.com/docs/ja/',
    'https://thegraph.com/docs/ko/',
    'https://thegraph.com/docs/vi/',
    'https://thegraph.com/docs/zh/',
  ],
  ignoreQueryParams: ['source', 'utm_*'],
  actions: [
    {
      indexName: 'thegraph-docs',
      pathsToMatch: ['https://thegraph.com/docs/**'],
      recordExtractor: ({ helpers }) => {
        const data = helpers.docsearch({
          recordProps: {
            lvl0: {
              selectors: '.graph-docs-current-group',
              defaultValue: 'The Graph Docs',
            },
            lvl1: '.graph-docs-content h1 > span:first-of-type',
            lvl2: '.graph-docs-content h2 > span:first-of-type',
            lvl3: '.graph-docs-content h3 > span:first-of-type',
            lvl4: '.graph-docs-content h4 > span:first-of-type',
            lvl5: '.graph-docs-content h5 > span:first-of-type',
            lvl6: '.graph-docs-content h6 > span:first-of-type',
            content: '.graph-docs-content p, .graph-docs-content li',
          },
        })
        // See https://github.com/algolia/docsearch/issues/1723
        data.forEach((record) => {
          Object.entries(record.hierarchy)
            .filter(([_level, content]) => content)
            .forEach(([level, content]) => {
              record.hierarchy[level] = content.replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&amp;', '&')
            })
        })
        return data
      },
    },
  ],
  initialIndexSettings: {
    'thegraph-docs': {
      attributesForFaceting: ['type', 'language'],
      attributesToRetrieve: ['hierarchy', 'content', 'anchor', 'url', 'url_without_anchor'],
      attributesToHighlight: ['hierarchy', 'hierarchy_camel', 'content'],
      attributesToSnippet: ['content:10'],
      camelCaseAttributes: ['hierarchy', 'hierarchy_radio', 'content'],
      searchableAttributes: [
        'unordered(hierarchy_radio_camel.lvl0)',
        'unordered(hierarchy_radio.lvl0)',
        'unordered(hierarchy_radio_camel.lvl1)',
        'unordered(hierarchy_radio.lvl1)',
        'unordered(hierarchy_radio_camel.lvl2)',
        'unordered(hierarchy_radio.lvl2)',
        'unordered(hierarchy_radio_camel.lvl3)',
        'unordered(hierarchy_radio.lvl3)',
        'unordered(hierarchy_radio_camel.lvl4)',
        'unordered(hierarchy_radio.lvl4)',
        'unordered(hierarchy_radio_camel.lvl5)',
        'unordered(hierarchy_radio.lvl5)',
        'unordered(hierarchy_radio_camel.lvl6)',
        'unordered(hierarchy_radio.lvl6)',
        'unordered(hierarchy_camel.lvl0)',
        'unordered(hierarchy.lvl0)',
        'unordered(hierarchy_camel.lvl1)',
        'unordered(hierarchy.lvl1)',
        'unordered(hierarchy_camel.lvl2)',
        'unordered(hierarchy.lvl2)',
        'unordered(hierarchy_camel.lvl3)',
        'unordered(hierarchy.lvl3)',
        'unordered(hierarchy_camel.lvl4)',
        'unordered(hierarchy.lvl4)',
        'unordered(hierarchy_camel.lvl5)',
        'unordered(hierarchy.lvl5)',
        'unordered(hierarchy_camel.lvl6)',
        'unordered(hierarchy.lvl6)',
        'content',
      ],
      distinct: true,
      attributeForDistinct: 'url',
      customRanking: ['desc(weight.pageRank)', 'desc(weight.level)', 'asc(weight.position)'],
      ranking: ['words', 'filters', 'typo', 'attribute', 'proximity', 'exact', 'custom'],
      highlightPreTag: '<span class="algolia-docsearch-suggestion--highlight">',
      highlightPostTag: '</span>',
      minWordSizefor1Typo: 3,
      minWordSizefor2Typos: 7,
      allowTyposOnNumericTokens: false,
      minProximity: 1,
      ignorePlurals: true,
      advancedSyntax: true,
      attributeCriteriaComputedByMinProximity: true,
      removeWordsIfNoResults: 'allOptional',
    },
  },
})
