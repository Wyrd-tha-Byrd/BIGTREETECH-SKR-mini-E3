#!/usr/bin/env node
//
// Formatter script for pins_MYPINS.h files
//
// Usage: mffmt [infile] [outfile]
//
// With no parameters convert STDIN to STDOUT
//
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var fs = require("fs"); // String lpad / rpad


String.prototype.lpad = function (len, chr) {
  if (!len) return this;
  if (chr === undefined) chr = ' ';
  var s = this + '',
      need = len - s.length;
  if (need > 0) s = new Array(need + 1).join(chr) + s;
  return s;
};

String.prototype.rpad = function (len, chr) {
  if (!len) return this;
  if (chr === undefined) chr = ' ';
  var s = this + '',
      need = len - s.length;
  if (need > 0) s += new Array(need + 1).join(chr);
  return s;
};

var mpatt = ['-?\\d+', 'P[A-I]\\d+', 'P\\d_\\d+'],
    definePatt = new RegExp("^\\s*(//)?#define\\s+[A-Z_][A-Z0-9_]+\\s+(".concat(mpatt[0], "|").concat(mpatt[1], "|").concat(mpatt[2], ")\\s*(//.*)?$"), 'gm'),
    ppad = [3, 4, 5],
    col_comment = 50,
    col_value_rj = col_comment - 3;
var mexpr = [];

for (var _i = 0, _mpatt = mpatt; _i < _mpatt.length; _i++) {
  var m = _mpatt[_i];
  mexpr.push(new RegExp('^' + m + '$'));
}

var argv = process.argv.slice(2),
    argc = argv.length;
var src_file = 0,
    src_name = 'STDIN',
    dst_file,
    do_log = false;

if (argc > 0) {
  var ind = 0;

  if (argv[0] == '-v') {
    do_log = true;
    ind++;
  }

  dst_file = src_file = src_name = argv[ind++];
  if (ind < argc) dst_file = argv[ind];
} // Read from file or STDIN until it terminates


var filtered = process_text(fs.readFileSync(src_file).toString());
if (dst_file) fs.writeFileSync(dst_file, filtered);else console.log(filtered); // Find the pin pattern so non-pin defines can be skipped

function get_pin_pattern(txt) {
  var r,
      m = 0,
      match_count = [0, 0, 0];
  definePatt.lastIndex = 0;

  var _loop = function _loop() {
    var ind = -1;

    if (mexpr.some(function (p) {
      ind++;
      var didmatch = r[2].match(p);
      return r[2].match(p);
    })) {
      var _m = ++match_count[ind];

      if (_m >= 10) {
        return {
          v: {
            match: mpatt[ind],
            pad: ppad[ind]
          }
        };
      }
    }
  };

  while ((r = definePatt.exec(txt)) !== null) {
    var _ret = _loop();

    if (_typeof(_ret) === "object") return _ret.v;
  }

  return null;
}

function process_text(txt) {
  if (!txt.length) return '(no text)';
  var patt = get_pin_pattern(txt);
  if (!patt) return txt;
  var pindefPatt = new RegExp("^(\\s*(//)?#define)\\s+([A-Z_][A-Z0-9_]+)\\s+(".concat(patt.match, ")\\s*(//.*)?$")),
      noPinPatt = new RegExp("^(\\s*(//)?#define)\\s+([A-Z_][A-Z0-9_]+)\\s+(-1)\\s*(//.*)?$"),
      skipPatt = new RegExp('^(\\s*(//)?#define)\\s+(AT90USB|USBCON|BOARD_.+|.+_MACHINE_NAME|.+_SERIAL)\\s+(.+)\\s*(//.*)?$'),
      aliasPatt = new RegExp('^(\\s*(//)?#define)\\s+([A-Z_][A-Z0-9_]+)\\s+([A-Z_][A-Z0-9_()]+)\\s*(//.*)?$'),
      switchPatt = new RegExp('^(\\s*(//)?#define)\\s+([A-Z_][A-Z0-9_]+)\\s*(//.*)?$'),
      undefPatt = new RegExp('^(\\s*(//)?#undef)\\s+([A-Z_][A-Z0-9_]+)\\s*(//.*)?$'),
      defPatt = new RegExp('^(\\s*(//)?#define)\\s+([A-Z_][A-Z0-9_]+)\\s+([-_\\w]+)\\s*(//.*)?$'),
      condPatt = new RegExp('^(\\s*(//)?#(if|ifn?def|else|elif)(\\s+\\S+)*)\\s+(//.*)$'),
      commPatt = new RegExp('^\\s{20,}(//.*)?$');
  var col_value_lj = col_comment - patt.pad - 2;
  var r,
      out = '',
      check_comment_next = false;
  txt.split('\n').forEach(function (line) {
    if (check_comment_next) check_comment_next = (r = commPatt.exec(line)) !== null;
    if (check_comment_next) // Comments in column 45
      line = ''.rpad(col_comment) + r[1];else if ((r = pindefPatt.exec(line)) !== null) {
      //
      // #define MY_PIN [pin]
      //
      if (do_log) console.log("pin:", line);
      var pinnum = r[4].charAt(0) == 'P' ? r[4] : r[4].lpad(patt.pad);
      line = r[1] + ' ' + r[3];
      line = line.rpad(col_value_lj) + pinnum;
      if (r[5]) line = line.rpad(col_comment) + r[5];
    } else if ((r = noPinPatt.exec(line)) !== null) {
      //
      // #define MY_PIN -1
      //
      if (do_log) console.log("pin -1:", line);
      line = r[1] + ' ' + r[3];
      line = line.rpad(col_value_lj) + '-1';
      if (r[5]) line = line.rpad(col_comment) + r[5];
    } else if ((r = skipPatt.exec(line)) !== null) {
      //
      // #define SKIP_ME
      //
      if (do_log) console.log("skip:", line);
    } else if ((r = aliasPatt.exec(line)) !== null) {
      //
      // #define ALIAS OTHER
      //
      if (do_log) console.log("alias:", line);
      line = r[1] + ' ' + r[3];
      line += r[4].lpad(col_value_rj + 1 - line.length);
      if (r[5]) line = line.rpad(col_comment) + r[5];
    } else if ((r = switchPatt.exec(line)) !== null) {
      //
      // #define SWITCH
      //
      if (do_log) console.log("switch:", line);
      line = r[1] + ' ' + r[3];
      if (r[4]) line = line.rpad(col_comment) + r[4];
      check_comment_next = true;
    } else if ((r = defPatt.exec(line)) !== null) {
      //
      // #define ...
      //
      if (do_log) console.log("def:", line);
      line = r[1] + ' ' + r[3] + ' ';
      line += r[4].lpad(col_value_rj + 1 - line.length);
      if (r[5]) line = line.rpad(col_comment - 1) + ' ' + r[5];
    } else if ((r = undefPatt.exec(line)) !== null) {
      //
      // #undef ...
      //
      if (do_log) console.log("undef:", line);
      line = r[1] + ' ' + r[3];
      if (r[4]) line = line.rpad(col_comment) + r[4];
    } else if ((r = condPatt.exec(line)) !== null) {
      //
      // #if ...
      //
      if (do_log) console.log("cond:", line);
      line = r[1].rpad(col_comment) + r[5];
      check_comment_next = true;
    }
    out += line + '\n';
  });
  return out.replace(/\n\n+/g, '\n\n').replace(/\n\n$/g, '\n');
}