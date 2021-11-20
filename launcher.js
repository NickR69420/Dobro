// Import exec from child process
var exec = require('child_process').exec;

function rerun() {
    // Executes 'npm run main:start' and gets its exit code
    var exitCode = exec('npm run main:start');
    if (exitCode.exitCode === 2) {
        rerun();
    }
}

rerun()