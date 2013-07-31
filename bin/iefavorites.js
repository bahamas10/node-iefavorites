#!/usr/bin/env node
/**
 * Export Internet Explorer favorites
 * to Chrome
 *
 * Author: Dave Eddy <dave@daveeddy.com>
 * Date: 1/7/2013
 * License: MIT
 */

var path = require('path');
var util = require('util');

var findit = require('findit');
var getopt = require('posix-getopt');
var netscape = require('netscape-bookmarks');
var urlfile = require('urlfile');

// Return a usage message
function usage() {
  return util.format([
      'Usage: %s [-j] <favorites directory>',
      '',
      '-h|--help: print this message and exit',
      '-j|--json: output json instead of netspace bookmark html',
      ''
  ].join('\n'), path.basename(process.argv[1]));
}

// command line arguments
var parser = new getopt.BasicParser('h(help)j(json)', process.argv);
var option;
var json = false;
while ((option = parser.getopt()) !== undefined) {
  switch (option.option) {
    case 'h':
      console.log(usage());
      process.exit(0);
      break;
    case 'j':
      json = true;
      break;
    default:
      console.error(usage());
      process.exit(1);
      break;
  }
}
var folder = process.argv[parser.optind()];

// missing input
if (!folder)
  return console.error('missing required argument: favorites directory\n%s', usage());

// find the favorites
var favorites = findit.sync(folder).filter(function(file) {
  return path.extname(file).toLowerCase() === '.url';
});
// strip out the first part of the folder name
favorites = favorites.map(function(file) {
  return file.replace(folder, '');
});

var obj = {};

// loop all favorites found
favorites.forEach(function(favorite) {
  var file = path.join(folder, favorite);
  var parts = favorite.split(path.sep);
  var name = parts[parts.length - 1].replace(/\.url$/, '');

  var cur = obj;
  // `cur` is a pointer to the current place in the tree... holy god
  parts.forEach(function(part, i) {
    if (i === parts.length - 1) part = name;
    cur[part] = cur[part] || {}; // lazy initialization
    cur = cur[part]; // move the pointer
    if (i === parts.length - 1) {
      cur.url = urlfile.parseURLFileSync(file);
    } else {
      cur.contents = cur.contents || {};
      cur = cur.contents;
    }
  });
});

var out = json ? JSON.stringify(obj, null, 2) : netscape(obj);
console.log(out);
