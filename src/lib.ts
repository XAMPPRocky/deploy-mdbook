import os from 'os'
import process from 'process'

import * as core from '@actions/core'
import * as exec from '@actions/exec'
import {context} from '@actions/github'
import {getGitHubRelease} from 'get-github-release'
import deployToPages, * as gitHubPagesDeploy from 'github-pages-deploy-action'

export async function run(): Promise<void> {
  try {
    const workspace =
      core.getInput('workspace') || process.env['GITHUB_WORKSPACE'] || '.'
    const execOptions = {cwd: workspace}
    const gitHubToken = core.getInput('token', {required: true})
    const platform = os.platform()
    let regex

    if (platform === 'darwin') {
      regex = /apple/
    } else if (platform === 'win32') {
      regex = /windows/
    } else {
      regex = /linux/
    }

    const mdbookPath = await getGitHubRelease(
      'rust-lang',
      'mdbook',
      regex,
      gitHubToken
    )

    core.info(`Installed mdbook to ${mdbookPath}`)

    const {repository} = context.payload

    const repositoryInput = core.getInput('repository')
    const repositoryName = repositoryInput
      ? repositoryInput
      : repository && repository.full_name
      ? repository.full_name
      : process.env.GITHUB_REPOSITORY

    const deployOptions: gitHubPagesDeploy.ActionInterface = {
      accessToken: gitHubToken,
      repositoryName,
      branch: core.getInput('branch') || 'gh-pages',
      folder: 'book',
      workspace
    }

    await exec.exec(mdbookPath, ['build'], execOptions)
    core.info('Built book')

    if (core.getInput('build_only') === 'true') {
      // Do nothing...
    } else {
      await deployToPages(deployOptions)
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}
