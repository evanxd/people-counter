var self = require("sdk/self");
var pageMod = require("sdk/page-mod");
var Request = require("sdk/request").Request;
var prefs = require("sdk/simple-prefs").prefs;

pageMod.PageMod({
  include: '*.google.com.tw',
  contentScriptFile: './content-script.js',
  onAttach: function(worker) {
    Request({
      url: prefs.serverAddress + '/?data=peopleNumber',
      onComplete: function (response) {
        var parsed = JSON.parse(response.text);
        worker.port.emit('peopleNumber', parsed);
      }
    }).get();
  }
});
