var jade = require("jade");
var messageRepository = require("./messageRepository.js");
var Entities = require('html-entities').XmlEntities;
var entities = new Entities();

module.exports = function(app, skypeUsers) {

  app.get("/:skype_user_id/:contact_id", function(req, res) {
    var contactId = req.params.contact_id;
    var selectedUser = skypeUsers.getUser(req.params.skype_user_id);
    messageRepository.getConversationContacts(selectedUser.name, function(err, contacts) {
      if (err) {
        console.error(err.message);
      }
      messageRepository.getMessages(selectedUser.name, contactId, function(err, messages) {
        if (err) {
          console.log(err.message);
        }
        messages.filter(message => message.msg !== null).forEach(message => message.msg = entities.decode(message.msg));
        var html = jade.renderFile("app/views/index.jade", { users: skypeUsers.getUsers(), selectedUser: selectedUser, contacts: contacts, messages: messages });
        res.send(html);
      });
    });
  });

  app.get("/:skype_user_id", function(req, res) {
    var selectedUser = skypeUsers.getUser(req.params.skype_user_id);
    messageRepository.getConversationContacts(selectedUser.name, function(err, contacts) {
      var html = jade.renderFile("app/views/index.jade", { users: skypeUsers.getUsers(), selectedUser: selectedUser, contacts: contacts });
      res.send(html);
    });
  });

  app.get("/", function(req, res) {
    if (skypeUsers.getUsers().length > 0) {
      res.redirect("/0");
    }
    res.send("No skype users found");
  });
}
