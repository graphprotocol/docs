# Contributing to The Graph Docs

Welcome to The Graph! Thank you so much for helping our ecosystem improve documentation. Once approved and merged, all contributions will eventually be visible on [https://thegraph.com/docs](https://thegraph.com/docs).

Direct contributions are greatly appreciated for minor tasks, such as corrections or small additions to existing content. If the change is more complex, consider starting a discussion in GitHub Issues or Discord first.

## Making changes

Most of the docs are written in [Markdown](https://www.markdownguide.org/getting-started/), or more specifically, [MDX](https://mdxjs.com/docs/what-is-mdx/).

The files that you’ll likely be updating are in [the `/website/src/pages/en` directory](https://github.com/graphprotocol/docs/tree/main/website/src/pages/en).

> [!NOTE]
>
> Changes should only be made to the English language version of pages, as translations are handled by [Crowdin](https://crowdin.com/). If you spot an issue with a translation, please open an issue to let the team know!

Once you located the file that you want to update, click on “Edit” which will create a new forked repo. You can make your edits there and submit a PR.

Alternatively, you can manually fork the repo, create a branch in your fork and make all the edits you want before submitting a PR. To view all your changes in context,[run the application locally](https://github.com/graphprotocol/docs/blob/main/README.md).

## Adding new pages

When you add new page, you should also add it to the sidebar navigation. Here's how to do it:

1. Add an entry to the JavaScript object exported by the `_meta.js` file found in the directory of the file you created, where the key is the filename (minus the `.mdx` extension), and the value is an empty string. The `_meta.js` files control the order of the sidebar items.
2. To give your new page a different title in the navigation (in case the full title is too long), you should add a `sidebarTitle` property to the [frontmatter](https://mdxjs.com/guides/frontmatter/) of the page below `title`.

## Moving or renaming pages or directories

If you want to move or rename pages or directories, you should use the `move-pages` script:

- `cd website`
- `pnpm run move-pages` (example usage is provided when running the script with no arguments)
- Files/directories will be moved/renamed in all languages simultaneously, which is necessary to prevent build errors.

> [!NOTE]
>
> Although it's technically possible to manually move/rename files in English only and then fix the build with the `pnpm run fix-pages-structure` script, translations for the moved/renamed pages will be lost in the process.

Since URLs are generated from the file structure, make sure you also do the following _for every URL change_ in a PR that moves or renames pages:

- Update all links across docs pages, from the old URL to the new URL (e.g. `[see the Delegating page](/old/delegating/)` => `[see the Delegating page](/new/delegating/)`).
- Add a redirect from the old URL to the new URL in the `nginx.conf` file.

## Creating an issue

If you would like to report a bug, or propose a larger feature, please create an issue. Before doing so, please search existing issues for relevant keywords, in case your issue was already raised by someone else.
