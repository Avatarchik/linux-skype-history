var jade = require("jade");

var mockedContacts = [{id: 1, name: "MockUser1"}, {id: 2, name: "MockUser2"}];
var mockedMessages = [{from: "MockUser1", msg: "Hello world"}, {from: "You", msg: "Insert mocked message here"}];

module.exports = function(app, skypeUsers) {

  app.get("/:skype_user_id/:contact_id", function(req, res) {
    var userId = req.params.skype_user_id;
    var contactId = req.params.contact_id;
    var selectedUser = skypeUsers.getUser(req.params.skype_user_id);
    var html = jade.renderFile("app/views/index.jade", { users: skypeUsers.getUsers(), selectedUser: selectedUser, contacts: mockedContacts, messages: mockedMessages });
    res.send(html);
  });

  app.get("/:skype_user_id", function(req, res) {
    var selectedUser = skypeUsers.getUser(req.params.skype_user_id);
    var html = jade.renderFile("app/views/index.jade", { users: skypeUsers.getUsers(), selectedUser: selectedUser, contacts: mockedContacts });
    res.send(html);
  });

  app.get("/", function(req, res) {
    if (skypeUsers.getUsers().length > 0) {
      res.redirect("/0");
    }
    res.send("No skype users found");
  });
}
