var self = require('sdk/self');
var pageMod = require('sdk/page-mod');
var prefs = require('sdk/simple-prefs').prefs;
var Request = require('sdk/request').Request;
var now = Date.now();
var url = `${prefs.serverAddress}/?data=peopleNumber&${now}`;

pageMod.PageMod({
  include: '*.google.com.tw',
  contentScriptFile: './content-script.js',
  onAttach: function(worker) {
    Request({
      url: url,
      onComplete: function (response) {
        var parsed = JSON.parse(response.text);
        worker.port.emit('peopleNumber', parsed);
      }
    }).get();
  }
});
