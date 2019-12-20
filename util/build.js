const fs = require('fs-extra');
const childProcess = require('child_process');


try {
    // Remove current build
    fs.removeSync('./dist/');
    // Copy front-end files
    fs.copySync('./src/public', './dist/public');
    fs.copySync('./src/views', './dist/views');
    // Transpile the typescript files
    childProcess.exec('./node_modules/.bin/tsc --build tsconfig.prod.json', (err) => {
        if (err) {
            console.log(`exec error: ${error}`);
            return;
        }
    });
} catch (err) {
    console.log(err);
}
