var train = require('./train');

train(__dirname, function (err, resolved) {
    console.log("All dependencies are resolved.");
});