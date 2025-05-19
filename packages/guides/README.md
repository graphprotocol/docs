# @graphprotocol/guides

A collection of guides and utilities for The Graph documentation site.

## Development

```
# Install dependencies (from project root)
pnpm install

# In watch mode (inside this package)
pnpm --filter @graphprotocol/guides dev
```

## Build

```
# Build the TypeScript sources
pnpm --filter @graphprotocol/guides build
```

The compiled JavaScript files and type declarations will be output to `dist/`. 