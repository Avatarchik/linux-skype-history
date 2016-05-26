var skypeIO = require("./skypeDirIO.js");

module.exports = function(initFinishedCallback) {

  skypeIO.getSkypeUsers(function(users) {
    initFinishedCallback({
      getUsers: function() { return users; },
      getUser: function(id) { return users.find(user => user.id == id); }
    });
  });

};
