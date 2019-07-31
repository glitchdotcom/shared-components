const fs = require('fs').promises;
const path = require('path')
const childProcess = require('child_process')
const { promisify } = require('util')
const exec = promisify(childProcess.exec);
const { version } = require('../package.json');

const CHANGELOG_PATH = path.resolve(__dirname, '../changelog.md')
const getGitDiff = () => exec("git diff origin/master --name-status");

const insertChange = async () => {
  const fileText = await fs.readFile(CHANGELOG_PATH)
  
}

async function main () {
  const diff = await getGitDiff()
  const parsedDiff = parseDiff(diff)
  const changelogText = formatDiff(parsedDiff)
  await insertChanges(changelogText)
}


// https://git-scm.com/docs/git-diff#Documentation/git-diff.txt---diff-filterACDMRTUXB82308203
// A       changelog.md
// A       lib/example.js
// M       lib/index.js
// M       lib/stories.js