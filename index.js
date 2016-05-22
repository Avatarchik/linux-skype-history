var express = require("express");
var createSkypeUserRepository = require("./app/skypeUsers.js");
var routes = require("./app/routes.js");
var app = express();
const PORT=8080;

createSkypeUserRepository(function(skypeUserRepository) {
  routes(app, skypeUserRepository);

  app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:%s", PORT);
  });
});


