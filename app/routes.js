var jade = require("jade");

module.exports = function(app, skypeUsers) {

  app.get("/:skype_user_id/:contact_id", function(req, res) {
    var userId = req.params.skype_user_id;
    var contactId = req.params.contact_id;
    var selectedUser = skypeUsers.getUser(req.params.skype_user_id);
    var mockedContacts = [{id: 1, name: "MockUser1"}, {id: 2, name: "MockUser2"}];
    var mockedMessages = [{from: "MockUser1", msg: "Hello world"}, {from: "You", msg: "Insert mocked message here"}];
    var html = jade.renderFile("app/views/index.jade", { users: skypeUsers.getUsers(), selectedUser: selectedUser, contacts: mockedContacts, messages: mockedMessages });
    res.send(html);
  });

  app.get("/:skype_user_id", function(req, res) {
    var selectedUser = skypeUsers.getUser(req.params.skype_user_id);
    var mockedContacts = [{id: 1, name: "MockUser1"}, {id: 2, name: "MockUser2"}];
    var html = jade.renderFile("app/views/index.jade", { users: skypeUsers.getUsers(), selectedUser: selectedUser, contacts: mockedContacts });
    res.send(html);
  });

  app.get("/", function(req, res) {
    var html = jade.renderFile("app/views/index.jade", { users:skypeUsers.getUsers() });
    res.send(html);
  });
}
