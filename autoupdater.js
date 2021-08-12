// import exec
const exec = require('child_process').exec;
const spawn = require('child_process').spawn;

// A raw version URI to check for updates.
let versionUri = "http://www.example.com/autoupdater.json";

// Get the current version of the app through package.json and split it into major minor and revision numbers.
let currentVersion = JSON.parse(fs.readFileSync(__dirname + "/package.json", "utf8")).version.split(".");
let major = parseInt(currentVersion[0]);
let minor = parseInt(currentVersion[1]);
let revision = parseInt(currentVersion[2]);
// If application is running on production mode it'll be 1 hour otherwise 1 min.
let initalCheckDelay = process.env.NODE_ENV == "production" ? 60 * 60 * 1000 : 60 * 1000;
// Creates a async method that calls a callback after fetching data from versionUri.
async function getVersionData(callback) {
    let versionData = await fetch(versionUri);
    let version = await versionData.json();
    // split the version into major minor and revision numbers.
    let newVersion = version.version.split(".");
    // Create a callback with array of new Version
    callback(newVersion);
}

async function checkForUpdate() {
    // Call getVersionData and pass it a callback.
    await getVersionData(function(newVersion) {
        // Compare the current version with the new version.
        if (newVersion[0] > major) {
            console.log(`Auto updating to a new major. - ${newVersion.join(".")}`);
            // Creates a git pull command.
            let gitPull = `git pull origin master`;
            // Executes the git pull command.
            exec(gitPull, function(error, stdout, stderr) {
                if (error) {
                    console.log(`Error: ${error}`);
                }
            });
            // Run 'npm start' in the base directory of the project in a deatached process.
            let npmStart = `npm start`;
            process.exit(2);

        } else if (newVersion[0] == major && newVersion[1] > minor + 3) {
            console.log(`Auto updating to a new minor version. - ${newVersion.join(".")}`);
            // Executes the git pull command.
            exec(gitPull, function(error, stdout, stderr) {
                if (error) {
                    console.log(`Error: ${error}`);
                }
            });
            process.exit(2);
        } else if (newVersion[0] == major && newVersion[1] == minor && newVersion[2] > revision + 10) {
            console.log(`Auto updating to a new revision. - ${newVersion.join(".")}`);
            // Executes the git pull command.
            exec(gitPull, function(error, stdout, stderr) {
                if (error) {
                    console.log(`Error: ${error}`);
                }
            });
            process.exit(2);
        }
    });

    setInterval(checkForUpdate, initalCheckDelay);
}

// Check if the application is running on developement mode.
if (process.env.NODE_ENV === "development") {
    // Check for update every 1 minutes.
    setInterval(checkForUpdate, initalCheckDelay);
}else {
    // Check for update every 1 hour.
    setInterval(checkForUpdate, initalCheckDelay);
}