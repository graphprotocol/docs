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
        project: 'tsconfig.json',
      },
      rules: {
        '@typescript-eslint/no-unsafe-argument': 'off', // lots of false positives for some reason
      },
    },
    {
      // We lint only english pages because other languages will be translated from english
      files: ['website/pages/en/**/*.{md,mdx}'],
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
