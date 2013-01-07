iefavorites - Export IE Favorites
=================================

Export favorites from internet explorer in the Favorites folder and
easily import them into Chrome (or any other netscape compatible browser)

Installation
------------

Install as a command line utility

    npm install -g iefavorites

If you are looking just for the core functionality check out:

* [node urlfile](https://github.com/bahamas10/node-urlfile) - Node module written for parsing .url files
* [node netscape bookmarks](https://github.com/bahamas10/node-netscape-bookmarks) - Node module written for creating netscape compatible bookmark HTML files

Usage
-----

Pass a folder as the first argument that contains a bunch of .url bookmark
files (the Favorites folder in Windows), and the HTML will be written to
stdout, which can the be redirected to a file.

Optionally, pass in a `-j` to print the JSON output as opposed to HTML.

    $ iefavorites --help
    Usage: iefavorites [-j] <favorites directory>

    -h|--help: print this message and exit
    -j|--json: output json instead of netspace bookmark html

License
-------

MIT License
