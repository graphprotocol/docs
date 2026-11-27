Adds a **Copy page** button to the top of every docs page. It copies the page as Markdown so readers can paste it into an LLM. This reworks #1089 by @PaulieB14 to use the Graph Design System (GDS) and fix bugs found in review. PaulieB14 is credited as co-author on both commits.

Supersedes #1089.

## What it does

- A small GDS button sits at the end of the reading-time row, above the page title.
- On click, it loads the page's source file from GitHub (the same file "Edit on GitHub" opens) and copies it as Markdown:
  - The frontmatter is replaced by the page title as a heading and a `Source:` line with the page's URL.
  - MDX `import` lines are removed. Lines inside code blocks are kept.
- The source starts loading when the button is hovered or focused, so the copy is usually instant.
- "Copied as Markdown" appears only once the page is on the clipboard, with the copy icon switching to a check. If loading or copying fails, the button says "Couldn't copy this page".
- New labels: `global.page.copy`, `global.page.copied` and `global.page.copyFailed` in `en/global.json`.

## Changes from #1089

- **GDS components.** Built from `ExperimentalButton`, `Tooltip` and the `CopyInteractive` icon in `@edgeandnode/gds`, the version the site already uses. This replaces raw `<button>`s, a hand-built dropdown, inline SVG icons and one-off Tailwind classes. `ExperimentalCopyButton` isn't used directly because it shows "Copied" before an async copy finishes, so it can't report a failure.
- **One action, no dropdown.** "View as Markdown" opened the same GitHub file as "Edit on GitHub", and `@edgeandnode/gds` v6 has no dropdown menu with a trigger.
- **At the top of the page, not the footer.** Readers decide to paste a page into an LLM before reading it.
- **Code examples are kept.** #1089 removed every line starting with `import`, including inside code blocks. 8 pages lost example code this way, including 21 lines on `graph-ts/api.mdx`.
- **Pages from other repos work.** Their GitHub links use `/tree/`, which #1089 turned into a 404 address. On the graph-ts changelog, it copied the 404 page and still said "Copied!".
- **No false confirmations.** Failed loads and clipboard errors show an error message instead of "Copied".
- **Safari support.** Safari blocks clipboard writes that happen after waiting for a download, so the copy hands the pending text to `ClipboardItem`. Other browsers fall back to `writeText`.
- **No unrelated changes.** The escaped backticks #1089 added to a comment in `content.tsx` are left out.

## Files

- `website/src/components/CopyPageButton.tsx`: the new component.
- `website/src/components/index.ts`: exports it.
- `website/src/layout/templates/default/content.tsx`: adds the button to the page header.
- `website/src/pages/en/global.json`: the three labels.

## Testing done

- `tsc`, `eslint --max-warnings 0` and `prettier --check` pass.
- The Markdown output was checked against real pages:
  - Code-block imports are kept (21 of 21 on `graph-ts/api.mdx`, 6 of 6 on `avoid-eth-calls.mdx`).
  - MDX imports and frontmatter are removed.
  - The graph-ts changelog now loads (status 200 instead of 404) and keeps its own heading.
- `raw.githubusercontent.com` sends `Access-Control-Allow-Origin: *`, so the browser is allowed to load the file.
- Not tested yet: a visual check in the running site.

## For the reviewer

- [ ] Run `pnpm dev`. Check the button on a page with reading time, a page without it, and at mobile width (375px).
- [ ] Copy in Chrome, Safari and Firefox, then paste. The title, `Source:` line and code blocks should be intact.
- [ ] Copy the graph-ts changelog and a Graph Client page, which both come from other repos.
- [ ] Block `raw.githubusercontent.com` in DevTools and copy. The button should say "Couldn't copy this page".
- [ ] Press Tab to reach the button, then Enter to copy.

## Known limitation

The copy uses the file on `main`, which can differ briefly from the deployed page right after a merge.

## Later

When the site moves to `@graphprotocol/gds-react`, this should become the new GDS `CopyButton`. That component needs the text before the click, so the page source will need to be loaded first. It already starts loading on hover and focus.
