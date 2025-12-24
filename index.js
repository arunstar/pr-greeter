const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const token = core.getInput('github-token', { required: true });
    const welcomeMessage = core.getInput('welcome-message');
    
    const context = github.context;
    
    // Only run on pull request events
    if (context.eventName !== 'pull_request') {
      core.info('This action only runs on pull_request events');
      return;
    }
    
    const pr = context.payload.pull_request;
    
    // Check if this is a new PR (action === 'opened')
    if (context.payload.action !== 'opened') {
      core.info('This action only runs when a PR is opened');
      return;
    }
    
    const octokit = github.getOctokit(token);
    
    // Get the PR author
    const prAuthor = pr.user.login;
    
    // Check if this is the author's first contribution
    const { data: contributions } = await octokit.rest.repos.listContributors({
      owner: context.repo.owner,
      repo: context.repo.repo,
    });
    
    const isFirstContribution = !contributions.some(
      contributor => contributor.login === prAuthor
    );
    
    let message = welcomeMessage;
    if (isFirstContribution) {
      message = `Welcome to the project, @${prAuthor}! 🎊\n\n${welcomeMessage}`;
    }
    
    // Add comment to the PR
    await octokit.rest.issues.createComment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: pr.number,
      body: message,
    });
    
    core.info(`Successfully added welcome comment to PR #${pr.number}`);
    
  } catch (error) {
    core.setFailed(`Action failed: ${error.message}`);
  }
}

run();