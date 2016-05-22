fs = require("fs");
const SKYPE_DIR_PATH = process.env.HOME + "/.Skype";

module.exports = function() {

  var readUsers = function(callback) {
    console.log("Reading skype users from .Skype directory...");
    fs.readdir(SKYPE_DIR_PATH, function(err, files) {
      if (err) {
        callback([]);
      }

      callback(files
               .filter(function(file) { return !file.startsWith("shared") && !(file === "DataRv");})
               .map(function(user, i) { return {id: i, name:user}; })
      );
    });
  }

  return {
    getSkypeUsers: readUsers
  }
}();
