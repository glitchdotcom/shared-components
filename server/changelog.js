const fs = require('fs').promises;
const childProcess = require('child_process')
const { promisify } = require('util')
const exec = promisify(childProcess.exec);

const =

"git diff origin/master --name-status"
// https://git-scm.com/docs/git-diff#Documentation/git-diff.txt---diff-filterACDMRTUXB82308203
// A       changelog.md
// A       lib/example.js
// M       lib/index.js
// M       lib/stories.js