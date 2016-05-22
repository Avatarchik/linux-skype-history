var express = require("express");
var app = express();
const PORT=8080;

require("./app/skypeUsers.js")(function(skypeUsersObject) {

  require("./app/routes.js")(app, skypeUsersObject);

  app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:%s", PORT);
  });
});


