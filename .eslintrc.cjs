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
      // Only lint the English pages because the Markdown for the other languages is auto-generated from English (via Crowdin).
      // But include all languages when running the ESLint extension in VS Code (in case the user has "eslint.validate": ["mdx"]),
      // otherwise there will be random errors since the non-English files don't match any ruleset.
      files: [`website/pages/${!isVSCode ? 'en/' : ''}**/*.{md,mdx}`],
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
