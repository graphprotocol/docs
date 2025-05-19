# @graphprotocol/guides Demo

This package contains a standalone Next.js application to demonstrate a filterable and searchable "Guides" page, inspired by Vercel's guides section. It is intended for internal demo purposes and can later be integrated into the main The Graph documentation site.

## Features

- Filter guides by Products, Guide Types, and Difficulty.
- Fuzzy search across guide titles, descriptions, products, and types.
- Guide detail pages displaying content (currently stubs).
- Styled with Tailwind CSS.

## Running the Demo

1.  **Install dependencies (from the project root):**
    ```bash
    pnpm install
    ```

2.  **Start the development server for this package only:**
    ```bash
    pnpm --filter @graphprotocol/guides dev
    ```

3.  **Open your browser to:** [http://localhost:3100/guides](http://localhost:3100/guides)

## Structure

-   `pages/guides/index.tsx`: The main browse/filter page.
-   `pages/guides/[slug].tsx`: Individual guide detail page.
-   `data/guides.json`: Sample guide data (includes titles, descriptions, categories, content stubs, etc.).
-   `components/`: (Currently minimal, but can house reusable UI parts).
-   `styles/`: Global CSS and Tailwind setup.
-   `public/`: Static assets (if any).
```

## Integration into Main Docs

To integrate this into the main `@graphprotocol/docs` Nextra website:

1.  Copy the relevant page components (primarily `pages/guides/index.tsx` and `pages/guides/[slug].tsx`) into the `website/pages/` directory of the main documentation site.
2.  Adapt the data loading (`guides.json`) and styling (Tailwind/global CSS) to fit the existing Nextra structure.
3.  Ensure any shared components or utilities are correctly imported or moved.
4.  The filtering logic and Fuse.js setup can be largely reused.

This package (`@graphprotocol/guides`) itself would then likely not be directly imported as a library, but its code would serve as the basis for the new section within the main documentation app. 