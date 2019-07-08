const fs = require('fs');
const path = require('path');

function debounce(fn, timeout) {
  let handle;
  return (...args) => {
    if (handle) {
      clearTimeout(handle);
    }
    handle = setTimeout(() => {
      fn(...args);
      handle = null;
    }, timeout);
  };
}

function watchFiles(fileNames, onChange) {
  const debouncedOnChange = debounce(onChange, 1000);
  const dirMap = {};
  const watchers = [];
  for (const fileName of fileNames) {
    const dirname = path.dirname(fileName);
    dirMap[dirname] = (dirMap[dirname] || []).concat([path.basename(fileName)]);
  }

  for (const [dirname, fileList] of Object.entries(dirMap)) {
    const watcher = fs.watch(dirname, (eventType, fileName) => {
      if (fileList.includes(fileName)) {
        debouncedOnChange(eventType);
      }
    });
    watchers.push(watcher);
  }

  return () => {
    watchers.forEach((watcher) => watcher.close());
  };
}

module.exports = { watchFiles };

