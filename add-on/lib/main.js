var self = require("sdk/self");
var pageMod = require("sdk/page-mod");
var Request = require("sdk/request").Request;

pageMod.PageMod({
  include: '*.google.com.tw',
  contentScriptFile: './content-script.js',
  onAttach: function(worker) {
    Request({
      url: 'http://localhost:8080/?data=peopleNumber',
      onComplete: function (response) {
        var parsed = JSON.parse(response.text);
        worker.port.emit('peopleNumber', parsed);
      }
    }).get();
  }
});
