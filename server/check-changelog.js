const fs = require('fs').promises;
const path = require('path')
const { exec } = require('child_process')
const { version } = require('../package.json');

const CHANGELOG_PATH = path.resolve(__dirname, '../changelog.md')

const check = async () => {
  const file = fs.readFile(CHANGELOG_PATH, 'utf8')
  const [mostRecentUpdate] = file.match(/---\s+##\s+\[([\d\.]+)\]/)
  console.log({ mostRecentUpdate })
  if (version !== mostRecentUpdate) process.exit(1)
}

check()