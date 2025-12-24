# PR Welcome Greeter

A GitHub Action that automatically adds a friendly welcome comment to new pull requests. It detects first-time contributors and gives them an extra special welcome!

## Features

- Automatically comments on newly opened pull requests
- Detects first-time contributors and gives them a special welcome
- Customizable welcome message
- Simple and lightweight

## Usage

Create a workflow file (e.g., `.github/workflows/welcome.yml`) in your repository:
```yaml
name: Welcome New PRs

on:
  pull_request:
    types: [opened]

jobs:
  welcome:
    runs-on: ubuntu-latest
    steps:
      - name: Welcome PR
        uses: your-username/pr-welcome-greeter@v1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          welcome-message: 'Thanks for your contribution! A maintainer will review this soon.'
```

## Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `github-token` | GitHub token for authentication | Yes | - |
| `welcome-message` | Custom welcome message | No | `Thanks for opening this pull request! 🎉 A maintainer will review it soon.` |

## Example with Custom Message
```yaml
- name: Welcome PR
  uses: your-username/pr-welcome-greeter@v1
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    welcome-message: |
      Thank you for contributing to our project! 
      
      Please make sure you've:
      - [ ] Read our contributing guidelines
      - [ ] Added tests for your changes
      - [ ] Updated documentation if needed
```

## Setup for Publishing

1. Install dependencies: `npm install`
2. Build the action: `npm run build`
3. Commit the `dist` folder
4. Create a release with a tag (e.g., `v1`)
5. Publish to GitHub Marketplace

## License

MIT