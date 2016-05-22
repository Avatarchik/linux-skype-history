var skypeIO = require("./skypeDirIO.js");

module.exports = function(initFinishedCallback) {

  skypeIO.getSkypeUsers(function(users) {
    initFinishedCallback({
      getUsers: function() { return users; },
      getUser: function(id) { return users.find(function(user) { return user.id === id; }) }
    });
  });

};
