# 📘 deploy-mdbook

The `deploy-mdbook` action allows you to easily deploy your project to GitHub
Pages. See [`actions.yml`] for configuration options.

[`actions.yml`]: ./actions.yml

## Example
```yaml
- uses: XAMPPRocky/deploy-mdbook@v1
  with:
    token: ${{ secrets.DEPLOY_KEY }}
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
