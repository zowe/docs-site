// .github/scripts/create-merge-conflict-pr/index.js
const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        // --- Get Inputs ---
        const token = core.getInput('github-token', { required: true });
        const conflictBranch = core.getInput('conflict-branch', { required: true });
        const baseBranch = core.getInput('base-branch', { required: true });
        const prTitle = core.getInput('pr-title', { required: true });
        const prBody = core.getInput('pr-body',{required: false})
        // Optional inputs - comma separated string for labels
        const prLabels = core
            .getInput('pr-labels')
            ?.split(',')
            .map((label) => label.trim())
            .filter((label) => label.length > 0); // Remove empty labels
        // const prBody = `
        // Automated attempt to merge \`master\` into \`docs-staging\` resulted in conflicts.
        //
        //     Please resolve the conflicts in this pull request.
        //
        //     **Steps:**
        //     1. Check out the branch ${conflictBranch} locally.
        //     2. Resolve the merge conflicts in your editor.
        //     3. Commit the resolved files (\`git add .\`, \`git commit\`).
        //     4. Push the changes to the branch ${conflictBranch}.
        //     5. Merge this Pull Request once conflicts are resolved and CI passes.
        // `
        // --- Get Octokit and Context ---
        const octokit = github.getOctokit(token);
        const { owner, repo } = github.context.repo; // Get repo context

        core.info(`Attempting to create PR from ${conflictBranch} to ${baseBranch} in ${owner}/${repo}`);

        // --- Create Pull Request ---
        const { data: pullRequest } = await octokit.rest.pulls.create({
            owner,
            repo,
            title: prTitle,
            head: conflictBranch,
            base: baseBranch,
            body: prBody,
            maintainer_can_modify: true, // Optional
            // draft: false, // Optional
        });

        core.info(`Successfully created Pull Request #${pullRequest.number}: ${pullRequest.html_url}`);
        core.setOutput('pr-number', pullRequest.number);
        core.setOutput('pr-url', pullRequest.html_url);

        // --- Add Labels (Optional) ---
        if (prLabels && prLabels.length > 0) {
            core.info(`Adding labels: ${prLabels.join(', ')}`);
            await octokit.rest.issues.addLabels({
                owner,
                repo,
                issue_number: pullRequest.number,
                labels: prLabels,
            });
            core.info('Labels added successfully.');
        }


    } catch (error) {
        core.error(`Error creating pull request: ${error.message}`);
        if (error.response) {
            core.error(`Response Data: ${JSON.stringify(error.response.data)}`);
        }
        if (error.stack) {
            core.debug(error.stack); // Use debug for stack trace
        }
        core.setFailed(`Action failed with error: ${error.message}`);
    }
}

run();