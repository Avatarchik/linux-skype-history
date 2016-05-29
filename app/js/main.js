var onSkypeContactClick = function(id) {
  var skypeUserId = window.location.pathname.split( '/' )[1];
  window.location = "/" + skypeUserId + "/" + id;
}

var skypeUserSelectionChanged = function() {
  var selectHtml = document.getElementById("userSelection");
  var id = selectHtml.options[selectHtml.selectedIndex].value;
  window.location = "/" + id;
}
