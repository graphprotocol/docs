# Multi-gateway Subgraph docs: saved changes

`multi-gateway-subgraph-docs.patch` holds every proposed change from the `multi-gateway-subgraph-docs` branch (round 1 + round 2), rebased onto `main` @ `413669de` (after #1134 and #1135).

- 99 files: 6 new, 3 moved, 90 modified. Includes the GraphOps page from PR #1133, unchanged.
- Applies cleanly to `413669de` (`git apply --check`), builds with `pnpm build` (212 pages, no errors), and passes `prettier --check`.
- Excludes `drafts/`, `Claude outputs/`, and the generated files (`website/src/openApi/tokenApi.json`, `graph-ts/CHANGELOG.md`, `graph-ts/README.md`) that were in the WIP commit `c8248aef`.
- The four network-page partials (`customContent/_subgraph-*.mdx`, `_substreams-*.mdx`) were restored from `main` and carry only this branch's text edits. Prettier formatting in `c8248aef` had broken them (`{/*` became `{/\*`).

## Apply on a new branch

```sh
git switch main && git pull
git switch -c <new-branch>
git apply --index "Claude outputs/multi-gateway-subgraph-docs.patch"
git status
```

`--index` stages the changes, including the three renames. If `main` has moved since `413669de` and the patch no longer applies cleanly, use `git apply --3way --index` and resolve any conflicts.

## Moved pages (redirects in nginx.conf)

| Old | New |
| --- | --- |
| `/subgraphs/developing/deploying-publishing/using-subgraph-studio/` | `/subgraphs/providers/subgraph-studio/deploying-to-studio/` |
| `/subgraphs/providers/subgraph-studio/upgrade-indexer/` | `/subgraphs/developing/deploying-publishing/upgrade-indexer/` |
| `/subgraphs/best-practices/benefits/` | `/subgraphs/providers/subgraph-studio/benefits/` |

Old billing paths (`/billing/`, `/studio/billing/`, `/subgraphs/billing/`) now point to `/subgraphs/providers/subgraph-studio/billing/`. The Studio landing page keeps its URL, `/subgraphs/providers/subgraph-studio/introduction/`, and forwards old billing anchors to the Billing page.

## Backups

- `multi-gateway-drafts-backup/drafts/`: the `drafts/` folder from `c8248aef`. It no longer exists anywhere else in your working copy.
- The other `Claude outputs/` files from `c8248aef` were restored to `Claude outputs/`.

## Still to do (separate PRs)

- GraphOps page: replace "canonical gateway" wording.
- Ormi provider page.
- networks-registry: drop "canonical" from the gateway descriptions.
- Route lockfile: regenerate it once on `main`, or remove it.
- `.prettierignore` on `main`: the line `website/src/pages/*/subgraphs/querying/graph-client/*.md# Reusable MDX partials…` is missing a newline. That joins two lines, so the graph-client ignore rule doesn't work.
