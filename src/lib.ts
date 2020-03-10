import process from 'process'
import * as core from '@actions/core'
import * as exec from '@actions/exec'
import {getGitHubRelease} from 'get-github-release'
import deployToPages, * as gitHubPagesDeploy from 'github-pages-deploy-action'

export async function run(): Promise<void> {
  try {
    const workspace =
      core.getInput('workspace') || process.env['GITHUB_WORKSPACE'] || '.'
    const execOptions = {cwd: workspace}
    const gitHubToken = core.getInput('token', {required: true})
    const mdbookPath = getGitHubRelease(
      'rust-lang',
      'mdbook',
      /apple/,
      gitHubToken
    )

    core.setInfo(`Installed mdbook to ${mdbookPath}`)

    const deployOptions: gitHubPagesDeploy.actionInterface = {
      repositoryName: core.getInput('repository', {required: true}),
      branch: core.getInput('branch') || 'gh-pages',
      folder: 'book',
      workspace
    }

    await exec.exec(mdbookPath, ['build'], execOptions)
    core.setInfo('Built book')

    await deployToPages(deployOptions)
  } catch (error) {
    core.setFailed(error.message)
  }
}
