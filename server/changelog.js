const fs = require('fs').promises;
const path = require('path')
const childProcess = require('child_process')
const { promisify } = require('util')
const exec = promisify(childProcess.exec);
const { version } = require('../package.json');

const CHANGELOG_PATH = path.resolve(__dirname, '../changelog.md')
const ignoredFiles = ['lib/index.js', 'lib/stories.js', 'changelog.md', 'package.json']

const getGitDiff = () => exec("git diff origin/master --name-status");

const parseDiff = (diff) => {
  const grouped = { Added: [], Removed: [], Changed: []}

  const lines = diff.split('\n')
  for (const line of lines) {
    const [changeType, file] = line.split(/\s/, 1)
    if (ignoredFiles.includes(file)) continue;
    // https://git-scm.com/docs/git-diff#Documentation/git-diff.txt---diff-filterACDMRTUXB82308203
    if (changeType === 'A') {
      grouped.Added.push(file)
    } else if (changeType === 'D') {
      grouped.Removed.push(file)
    } else {
      grouped.Changed.push(file)
    }
  }
  return grouped; 
}

const formatDiff = (parsedDiff) => {
  const [dateString] = new Date().toISOString().split('T')
  const lines = [`## [${version}] - ${dateString}`]
  
  for (const [group, files] of Object.entries(parsedDiff)) {
    if (files.length === 0) continue
    lines.push(`### ${group}`)
    for (const file of files) {
      lines.push(`- \`${file}\`:`)
    }
  }
  return lines.join('\n')
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