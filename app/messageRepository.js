var sqlite3 = require("sqlite3").verbose();
var fs = require("fs");

module.exports = function() {

  var createDbConnection = function(skypeUsername) {
    var dbPath = process.env.HOME + "/.Skype/" + skypeUsername + "/main.db";
    return new sqlite3.Database(dbPath);
  }

  var getConversationContacts = function(skypeUsername, contactsCallback) {
    var db = createDbConnection(skypeUsername);

    db.serialize(function() {
      db.all("SELECT id, displayname AS name FROM conversations", contactsCallback);
    });

    db.close();
  }

  var getMessages = function(skypeUsername, contactId, messagesCallback) {
    var db = createDbConnection(skypeUsername);

    db.serialize(function() {
      db.all("SELECT from_dispname AS \"from\", body_xml AS msg FROM messages WHERE convo_id = (?)",
             contactId,
             messagesCallback);
    });

    db.close();
  }

  return {
    getConversationContacts: getConversationContacts,
    getMessages: getMessages
  }
}();
