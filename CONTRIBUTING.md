# Contributing

## Environment Setup

Install node. The recommended way is to use [npx](https://github.com/nvm-sh/nvm). Follow the README.md file in the npx project folder to install a node version.

This project was started with node v14.2.0 but should run in v12 on netlify.

### Setup Netlify

Install the Netlify CLI.

```bash
npm install -g netlify-cli
```

Log in to the netlify CLI:

```bash
netlify login
```

Link the project to the netlify site

```bash
netlify init
```

### Install Homebrew dependencies

```bash
brew bundle
```

### Setup FaunaDB CLI

Login to fauna cloud

```bash
fauna cloud-login
```

### Setup Direnv

Hook direnv into your shell. Add the following line at the end of the ~/.zshrc file:

```bash
eval "$(direnv hook zsh)"
```

See https://direnv.net/docs/hook.html for more info.

Allow your direnv to auto-load the .envrc file:

```bash
direnv allow .
```

## Testing a function

First start by running the netlify dev server:

```bash
npm start
```

You can then hit a specific function through the cli with netlify's `function:invoke` command:

```bash
netlify functions:invoke
```
