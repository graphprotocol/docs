## feat: add "Copy page" button (GDS)

Adds a **Copy page** button to the header of every docs page. It copies the page as Markdown so it can be pasted into an LLM. This reworks #1089 by @PaulieB14 to follow the Graph Design System and the docs site's existing patterns.

### What it does

- A small secondary GDS button sits at the end of the reading-time row, above the page title.
- On click, it fetches the page's source file from GitHub (the same file "Edit on GitHub" opens) and copies it as Markdown:
  - The YAML frontmatter is replaced by the page title as a heading and a `Source:` line with the page URL.
  - MDX `import` lines are removed. Lines inside code blocks are kept.
- The source starts loading on hover or focus, so the copy is usually instant.
- "Copied as Markdown" (with the copy-to-check icon animation) only appears once the page is actually on the clipboard. If loading or copying fails, it says "Couldn't copy this page" instead.
- Labels are in `global.page.copy`, `global.page.copied` and `global.page.copyFailed` in `en/global.json`.

### Changes from #1089

- **GDS components instead of custom UI.** Built from `ExperimentalButton`, `Tooltip` and the `CopyInteractive` icon from `@edgeandnode/gds`, the same version the site already uses and the same parts `ExperimentalCopyButton` is made of. This replaces raw `<button>`s, a hand-built dropdown, inline SVG icons and arbitrary Tailwind classes. (`ExperimentalCopyButton` itself confirms before an async copy finishes, so it can't report failures.) When the site moves to `@graphprotocol/gds-react`, this becomes the new `CopyButton`. That version needs `value` as a string before the click, so the source will need to be loaded first (it already starts loading on hover or focus).
- **One action, no dropdown.** "View as Markdown" opened the same GitHub file as "Edit on GitHub", and `@edgeandnode/gds` v6 has no action menu with a trigger.
- **In the header, not the footer.** People decide to paste a page into an LLM before reading it, not after.
- **Code samples are kept.** The old cleanup removed every line starting with `import`, including code examples. For example, `graph-ts/api.mdx` lost 21 lines across 8 pages.
- **Pages from other repos work.** Their GitHub URLs use `/tree/`, which produced a 404 before. For example, the graph-ts changelog copied a 404 page and still said "Copied!".
- **No false confirmations.** Failed loads and clipboard errors now show an error message instead of "Copied".
- **Works in Safari.** Safari rejects clipboard writes that happen after an `await fetch()`, so the copy passes the pending text to `ClipboardItem`. Other browsers fall back to `writeText`.
- **No unrelated changes.** The escaped backticks in the `content.tsx` comment are not included.

### Testing

- `tsc`, `eslint --max-warnings 0` and `prettier --check` pass.
- The Markdown output was checked against real pages: code-block imports are kept (21/21 on `graph-ts/api.mdx`), MDX imports and frontmatter are removed, and pages from other repos keep their own heading.
- `raw.githubusercontent.com` returns `Access-Control-Allow-Origin: *`, so the browser fetch is allowed.

**For the reviewer:**

- [ ] `pnpm dev`: check the button on a page with reading time, a page without it, and on mobile (375px).
- [ ] Copy in Chrome, Safari and Firefox, then paste: the title, `Source:` line and code blocks should be intact.
- [ ] Copy on pages sourced from other repos: the graph-ts changelog and the Graph Client docs.
- [ ] Block `raw.githubusercontent.com` in DevTools, then copy: it should say "Couldn't copy this page".
- [ ] Keyboard: Tab to the button and press Enter to copy.

### Known limitation

The copy uses the file on `main`, which can briefly differ from the deployed page right after a merge.

Co-authored-by: PaulieB14 <barba334@gmail.com>
