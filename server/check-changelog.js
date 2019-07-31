const fs = require('fs').promises;
const path = require('path');
const { version } = require('../package.json');

const CHANGELOG_PATH = path.resolve(__dirname, '../changelog.md');

const check = async () => {
  const file = await fs.readFile(CHANGELOG_PATH, 'utf8');
  const [, mostRecentUpdate] = file.match(/---\s+##\s+\[([^\]]+)\]/);
  console.log({ mostRecentUpdate });
  if (version !== mostRecentUpdate) {
    console.error(`Most recent changelog entry is for version ${mostRecentUpdate}; expected entry for ${version}`);
    process.exit(1);
  }
};

check();
