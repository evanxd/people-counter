var pageMod = require("sdk/page-mod");

pageMod.PageMod({
  include: '*.google.com.tw',
  contentScriptFile: './content-script.js',
});
