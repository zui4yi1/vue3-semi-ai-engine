var fs = require('fs');
var path = require('path');

/** Convert characters to camel case form */
const toCamel = (str) => str.replace(/-(\w)/g, ($0, $1) => $1.toUpperCase());

/** sync create multi-level directories */
const mkdirsSync = (dirName) => {
  if (fs.existsSync(dirName)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirName))) {
      fs.mkdirSync(dirName);
      return true;
    }
  }
};

/** Copy files and directories within a folder, without copying the sourceDir itself */
function copyDirectoryFiles(sourceDir, destinationDir) {
  fs.readdir(sourceDir, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    files.forEach((file) => {
      const sourcePath = path.join(sourceDir, file);
      const destinationPath = path.join(destinationDir, file);

      fs.stat(sourcePath, (err, stat) => {
        if (err) {
          console.error(err);
          return;
        }

        if (stat.isFile()) {
          fs.copyFile(sourcePath, destinationPath, (err) => {
            if (err) {
              console.error(err);
              return;
            }
          });
        } else if (stat.isDirectory()) {
          fs.mkdir(destinationPath, { recursive: true }, (err) => {
            if (err) {
              console.error(err);
              return;
            }
            copyDirectoryFiles(sourcePath, destinationPath);
          });
        }
      });
    });
  });
}

/** Synchronously Copy files and directories within a folder, without copying the sourceDir itself */
function copyDirectorySync(sourceDir, destinationDir) {
  if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir, { recursive: true });
  }
  const files = fs.readdirSync(sourceDir);
  for (const file of files) {
    const sourcePath = path.join(sourceDir, file);
    const destinationPath = path.join(destinationDir, file);
    const stat = fs.statSync(sourcePath);
    if (stat.isDirectory()) {
      copyDirectorySync(sourcePath, destinationPath);
    } else {
      fs.copyFileSync(sourcePath, destinationPath);
    }
  }
}

/** Modify the content of a file */
function modifyFile(filePath, oldString, newString) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
    const newContent = data.replace(oldString, newString);
    fs.writeFile(filePath, newContent, 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
      }
    });
  });
}

/**
 * Modify the content of a file
 * @param {Array} strArr - [[oldString, newString]] array of strings to replace in the file
 */
function modifyFileByArr(filePath, strArr = [[]]) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
    let newContent = data;
    strArr.forEach((t) => {
      const oldString = t[0];
      const newString = t[1];
      newContent = newContent.replace(oldString, newString);
    });
    fs.writeFile(filePath, newContent, 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
      }
    });
  });
}

module.exports = {
  toCamel,
  mkdirsSync,
  modifyFile,
  modifyFileByArr,
  copyDirectoryFiles,
  copyDirectorySync,
};
