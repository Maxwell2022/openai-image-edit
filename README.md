This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Prerequisite

You'll need `node v18+` installed globally (current LTS) and `pnpm v8+`.

I recommend using `Volta` to manage the version of node on your machine.

```bash
brew install volta
```

```
# install and set default version of node
volta install node@18.15.0

# install latest pnpm globally
volta install pnpm
```

By default this template is pinning the version of node in the `package.json`

## Use this template

This is the command to run in order to create an empty project with this template.
It's setup with:

- Typescript
- Tailwind
- Eslint
- Prettier
- [tailwind-prettier](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier) rules
- VSCode plugins recommendations
- pnpm

```bash
npx create-next-app@latest \
    --typescript \
    --tailwind \
    --eslint \
    --use-pnpm \
    --experimental-app \
    --import-alias '@/*'
    --example https://github.com/Maxwell2022/next-template
```

To simplify, you can create an alias in your `~/.zshrc`:

```bash
alias "new-project"="npx create-next-app@latest --typescript --tailwind --eslint --use-pnpm --experimental-app --import-alias '@/*' --example https://github.com/Maxwell2022/next-template"
```

Reload your config:

```bash
source ~/.zshrc
```

And then simply call :

```bash
new-project project-name
```

## Todo

- [ ] Add [renovate bot](https://docs.renovatebot.com/) configuration
