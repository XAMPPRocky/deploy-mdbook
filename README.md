# 📘 deploy-mdbook

The `deploy-mdbook` action allows you to easily build and deploy your mdBook project to GitHub
Pages. See [`action.yml`] for configuration options.

[`action.yml`]: ./action.yml

## Example
```yaml
name: Deploy mdBook
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: XAMPPRocky/deploy-mdbook@v1.1
        with:
            token: ${{ secrets.GITHUB_TOKEN }}
```

## Development

The action is written in NodeJS 12, and you can install the dependencies with:

```
npm install
```

### Running

```
npm start
```

GitHub Actions requires all the dependencies to be committed, so before
creating a commit you need to run:

```
npm run build
```

The command will bundle everything in `dist/index.js`. That file will need to
be committed.
