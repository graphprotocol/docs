// @ts-check

const isVSCode = Boolean(process.env.VSCODE_PID)

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  overrides: [
    {
      files: ['*.{ts,tsx,js,jsx,mjs,cjs}'],
      extends: ['@edgeandnode/eslint-config', '@edgeandnode/eslint-config/next'],
      settings: {
        next: { rootDir: 'website' },
      },
    },
    {
      files: ['*.{ts,tsx}'],
      parserOptions: {
        project: true,
      },
    },
    {
      files: ['website/src/pages/**/*.{md,mdx}'],
      excludedFiles: [
        'website/src/pages/*/subgraphs/developing/creating/graph-ts/*.md',
        'website/src/pages/*/subgraphs/querying/graph-client/*.md',
      ],
      parser: 'eslint-mdx',
      processor: 'mdx/remark',
      plugins: ['mdx'],
      rules: {
        'mdx/remark': 'error',
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  ],
}
