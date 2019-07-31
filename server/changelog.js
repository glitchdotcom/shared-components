const fs = require('fs').promises;
const path = require('path')
const childProcess = require('child_process')
const { promisify } = require('util')
const exec = promisify(childProcess.exec);
const { version } = require('../package.json');

const CHANGELOG_PATH = path.resolve(__dirname, '../changelog.md')
const ignoredFiles = ['lib/index.js', 'lib/stories.js', 'changelog.md', 'package.json']

const getGitDiff = () => exec("git diff origin/master --name-status");

const parseDiff = (diff) => 
  diff.split('\n')
    .map(line => {
      const [changeType, file] = line.split(/\s/, 1)
      return { changeType, file } // TODO: these need to be 'resolve'-d
    })

const formatDiff = (parsedDiff) => {
  const filtered = parsedDiff(({ file }) => !ignoredFiles.includes(file));
  const grouped = { added: [], removed: [], modified: []}
  for (const change of filtered) {
    if (changeType === 'A') {}
  }
}

const insertChanges = async () => {
  const fileText = await fs.readFile(CHANGELOG_PATH, 'utf8')
  const [head, tail] = fileText.split('---', 1)
  const joined = `${head}---\n${fileText}\n${tail}`
  await fs.writeFile(CHANGELOG_PATH, joined, 'utf8')
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