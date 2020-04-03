/// <reference types="node" />

declare module 'get-github-release' {
  export function getGitHubRelease(
    owner: string,
    repo: string,
    matches: RegExp,
    token: string,
    installPath?: string
  ): Promise<string>
}
