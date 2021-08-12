// A raw version URI to check for updates.
let versionUri = "http://www.example.com/autoupdater.json";

// Get the current version of the app through package.json and split it into major minor and revision numbers.
let currentVersion = JSON.parse(fs.readFileSync(__dirname + "/package.json", "utf8")).version.split(".");
let major = currentVersion[0];
let minor = currentVersion[1];
let revision = currentVersion[2];

// Creates a async method that calls a callback after fetching data from versionUri.
async function getVersionData(callback) {
    let versionData = await fetch(versionUri);
    let version = await versionData.json();
    // split the version into major minor and revision numbers.
    let newVersion = version.version.split(".");
    // Create a callback with array of new Version
    callback(newVersion);
}
