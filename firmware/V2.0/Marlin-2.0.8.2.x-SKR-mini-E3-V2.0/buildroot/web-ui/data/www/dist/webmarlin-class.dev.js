"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var wmEnums = {
  Panels: {
    STATUS: 0,
    CONTROLS: 1,
    FILES: 2,
    CONSOLE: 3
  },
  ConsoleDirection: {
    APPEND: 0,
    PREPEND: 1
  },
  ConsoleLevels: {
    ERROR: 0,
    SUCCESS: 1,
    INFO: 2,
    MONITOR: 3,
    WARNING: 4
  },
  WSMsgDirection: {
    SENT: 0,
    RECEIVED: 1
  },
  WsMsgSymbols: {
    SENT: {
      LETTER: "S",
      ICON: null
    },
    RECEIVED: {
      LETTER: "R",
      ICON: null
    }
  },
  WSSatuses: {
    CONNECTING: 0,
    OPEN: 1,
    CLOSING: 2,
    CLOSED: 3
  },
  LogLevels: {
    INFO: 0,
    WARNING: 1,
    ERROR: 2,
    DEBUG: 3,
    VERBOSE: 4
  },
  TempUnits: {
    CELSIUS: {
      LABEL: "Celsius",
      VALUE: 0,
      GP: "C"
    },
    FAHRENHEIT: {
      LABEL: "Fahrenheit",
      VALUE: 1,
      GP: "F"
    },
    KELVIN: {
      LABEL: "Kelvin",
      VALUE: 2,
      GP: "K"
    }
  }
};
var wmSettings = {
  AppName: "Marlin WebUI",
  AppRelease: "January, 1 2020",
  AppVersion: "1.1",
  AutoConnect: false,
  ConsoleDirection: wmEnums.ConsoleDirection.PREPEND,
  DefaultPanel: wmEnums.Panels.CONTROLS,
  LogLevel: wmEnums.LogLevels.VERBOSE,
  SymbolMode: 'letter',
  SymbolSend: wmEnums.WsMsgSymbols.SENT.LETTER,
  SymbolReceive: wmEnums.WsMsgSymbols.RECEIVED.LETTER,
  AutoTempInterval: 1,
  TempUnit: wmEnums.TempUnits.CELSIUS
};

var wmLogItem =
/*#__PURE__*/
function () {
  function wmLogItem(text, mdir, mrs) {
    var gcmd = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var bgclass = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var ficon = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

    _classCallCheck(this, wmLogItem);

    this.DateTime = wmTools.GetDateTime();
    this.Text = text;
    this.Direction = mdir;
    this.RsType = mrs;
    this.GCode = gcmd;
    this.BgClass = bgclass === null ? 'console-list-items-info' : bgclass;
    this.FontIcon = ficon === null ? wmIcons.InfoCircle : ficon;
    this.SdFile = null;
  }

  _createClass(wmLogItem, [{
    key: "SetValues",
    value: function SetValues() {
      var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var mdir = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var mrs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var gcmd = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var bgclass = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      var ficon = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

      if (text !== null) {
        this.Text = text;
      }

      ;

      if (mdir !== null) {
        this.Direction = mdir;
      }

      ;

      if (mrs !== null) {
        this.RsType = mrs;
      }

      ;

      if (gcmd !== null) {
        this.GCode = gcmd;
      }

      ;

      if (bgclass !== null) {
        this.BgClass = bgclass;
      }

      ;

      if (ficon !== null) {
        this.FontIcon = ficon;
      }

      ;
    }
  }, {
    key: "ToJson",
    value: function ToJson() {
      return JSON.stringify(this);
    }
  }, {
    key: "ToCsv",
    value: function ToCsv() {
      return wmTools.StringFormatCsv(this);
    }
  }, {
    key: "ToString",
    value: function ToString() {
      return wmTools.Stringfy(this);
    }
  }, {
    key: "ToLoglist",
    value: function ToLoglist() {
      switch (this.RsType) {
        case wmEnums.ConsoleLevels.INFO:
          this.BgClass = "console-list-items-info";
          this.FontIcon = wmIcons.InfoCircle;
          break;

        case wmEnums.ConsoleLevels.SUCCESS:
          this.BgClass = "console-list-items-success";
          this.FontIcon = wmIcons.CheckSquare;
          break;

        case wmEnums.ConsoleLevels.ERROR:
          this.BgClass = "console-list-items-error";
          this.FontIcon = wmIcons.Triangle;
          break;

        case wmEnums.ConsoleLevels.MONITOR:
          this.BgClass = "console-list-items-terminal";
          this.FontIcon = wmIcons.Terminal;
          break;

        case wmEnums.ConsoleLevels.WARNING:
          this.BgClass = "console-list-items-warning";
          this.FontIcon = wmIcons.Triangle;
          break;
      }

      var strout = '<li class="list-group-item console-list-items ' + this.BgClass + '">';
      strout += '<span class="badge badge-light mr-1">' + this.FontIcon.ToHtml() + "</span>";
      strout += '<span class="badge badge-secondary mr-1">' + this.DateTime + '</span>';
      strout += '<span class="badge badge-' + (this.Direction === wmEnums.WSMsgDirection.SENT ? "danger" : "success") + ' mr-1">';
      strout += this.Direction === wmEnums.WSMsgDirection.SENT ? wmSettings.SymbolSend : wmSettings.SymbolReceive;
      strout += '</span>' + this.Text + '</li>';
      return strout;
    }
  }, {
    key: "ToSdFileList",
    value: function ToSdFileList() {
      if (this.SdFile !== "Begin file list" && this.SdFile !== "End file list") {
        var a = this.SdFile.split(" ");
        var strout = '<a href="javascript:void(0);" class="list-group-item list-group-item-action list-group-item-light p-1" data-sdfile="' + a[0] + '" onclick="WmButtons.SetSdSelected(this)">';
        strout += '<i class="icon icon-file mr-1"></i>' + a[0] + '<div class="badge badge-secondary float-right">' + wmTools.FileSizeFormat(a[1]) + '</div>';
        strout += '</a>';
        return strout;
      }
    }
  }], [{
    key: "ParseWsMessage",
    value: function ParseWsMessage(msg) {
      var li = new wmLogItem();
      li.Direction = wmEnums.WSMsgDirection.RECEIVED;
      li.RsType = wmEnums.ConsoleLevels.SUCCESS;

      if (msg === "ok") {
        jsLog.Debug("WSMessage match: ok => " + msg);
        li.Text = "Acknowledge: " + msg;
      } else if (msg === "Not SD printing") {
        jsLog.Debug("WSMessage match: " + msg);
        li.Text = "Ack: " + msg;
        WmControls.SetPrinterStatusInfo(false, msg);
      } else if (msg.substring(0, 5) === "echo:") {
        if (msg.substring(5, 21) === "busy: processing") {
          jsLog.Debug("WSMessage match: echo:busy: processing: => " + msg);
          li.Text = msg.substring(5, msg.length);
          li.RsType = wmEnums.ConsoleLevels.WARNING;
        } else if (msg.substring(5, 21) === "Unknown command:") {
          jsLog.Debug("WSMessage match: echo:Unknown command: => " + msg);
          li.Text = msg.substring(5, msg.length);
          li.RsType = wmEnums.ConsoleLevels.WARNING;
        } else if (msg.substring(5, 20) === "Now fresh file:") {
          jsLog.Debug("WSMessage match: echo:Now fresh file: => " + msg);
          li.Text = "SD: " + msg.substring(5, msg.length);
        } else if (msg === "File selected") {
          jsLog.Debug("WSMessage match: echo:File selected: => " + msg);
          li.Text = "SD: " + msg.substring(5, msg.length);
        }
      } else if (msg.substring(0, 6) === "Error:") {
        jsLog.Debug("WSMessage match: error => " + msg);
        li.Text = msg.substring(6, msg.length);
        li.RsType = wmEnums.ConsoleLevels.ERROR;
      } else if (msg.substring(0, 12) === "File opened:" || msg === "File selected") {
        jsLog.Debug("WSMessage match: File opened/selected => " + msg);
        li.Text = "SD: " + msg;
      } else if (msg.includes("open failed, File:")) {
        jsLog.Error("WSMessage match: open file error => " + msg);
        li.Text = "SD Error: " + msg;
        li.RsType = wmEnums.ConsoleLevels.ERROR;
      } else if (msg.toLowerCase().includes(".gco") || msg.toLowerCase().includes(".gcode") || msg.toLowerCase().includes(".g") || msg === "Begin file list" || msg === "End file list") {
        if (msg.substring(0, 16) === "Writing to file:") {
          WmUpload.ReadyToWrite = true;
        }

        li.Text = "SD: " + msg;
        li.SdFile = msg;
      } //else if() {
      //}
      else {
          var rgx_rtemp_eb = /^T:\d{1,3}\.\d{1,2}\s+\/\d{1,3}\.\d{1,2}\s+B:\d{1,3}\.\d{1,2}\s+\/\d{1,3}\.\d{1,2}/;
          var rgx_rtemp_e = /^T:\d{1,3}\.\d{1,2}\s+\/\d{1,3}\.\d{1,2}/;

          if (rgx_rtemp_eb.test(msg) || rgx_rtemp_e.test(msg)) {
            jsLog.Verbose("Extruder temperatore report: " + msg);
            msg = msg.replace(/\//g, "");
            var tarr = msg.split(/\s/);
            WmCharts.SetTempReport(tarr);
            li.Text = "Temp report: " + msg;
          } else {
            li.Text = msg;
          }
        }

      jsLog.Verbose(li.ToString());
      return li;
    }
  }]);

  return wmLogItem;
}();

var wmGCommandItem =
/*#__PURE__*/
function () {
  function wmGCommandItem(g, p, v, d) {
    var s = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

    _classCallCheck(this, wmGCommandItem);

    this.GCode = g;
    this.GParams = p;
    this.Values = v;
    this.Description = d;
    this.Supported = s === null ? true : s;
  }

  _createClass(wmGCommandItem, [{
    key: "ToJson",
    value: function ToJson() {
      return JSON.stringify(this);
    }
  }, {
    key: "ToString",
    value: function ToString() {
      return wmTools.Stringfy(this);
    }
  }], [{
    key: "CalcChecksum",
    value: function CalcChecksum(gc) {
      var cs = 0;
      gc = gc.toUpperCase().replace(/\s/g, '');

      for (var i = 0; gc[i] !== '*' && gc[i] !== null && i < gc.length; i++) {
        cs = cs ^ gc.charCodeAt(i);
      }

      jsLog.Verbose("Calculate GCommand checksum of: " + gc + " => " + cs);
      return cs;
    }
  }, {
    key: "GetCommandItemByCode",
    value: function GetCommandItemByCode(gc) {
      jsLog.Verbose("GetCommandItemByCode: Find preset for: " + gc);
      var sgc = gc.split(/\s/);
      jsLog.Verbose("GetCommandItemByCode: Command to find: " + sgc[0]);

      for (var _i = 0, _Object$entries = Object.entries(wmGCommands); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            k = _Object$entries$_i[0],
            v = _Object$entries$_i[1];

        if (v.GCode.indexOf(sgc[0]) > -1) {
          return v;
        }
      }

      return null;
    }
  }]);

  return wmGCommandItem;
}();

var wmFontIcon =
/*#__PURE__*/
function () {
  function wmFontIcon(ico) {
    var mc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, wmFontIcon);

    this.ico = ico;
    this.mClass = mc !== null ? " " + mc : "";
  }

  _createClass(wmFontIcon, [{
    key: "ToString",
    value: function ToString() {
      return wmTools.Stringfy(this);
    }
  }, {
    key: "ToHtml",
    value: function ToHtml() {
      return "<i class=\"icon icon-" + this.ico + this.mClass + "\"></i>";
    }
  }, {
    key: "AddClass",
    value: function AddClass(acl) {
      return "<i class=\"icon icon-" + this.ico + " " + acl + "\"></i>";
    }
  }]);

  return wmFontIcon;
}();

var wmTools =
/*#__PURE__*/
function () {
  function wmTools() {
    _classCallCheck(this, wmTools);
  }

  _createClass(wmTools, null, [{
    key: "Stringfy",
    value: function Stringfy(obj) {
      if (obj !== null && obj !== "undefined") {
        var rt = "";

        for (var _i2 = 0, _Object$entries2 = Object.entries(obj); _i2 < _Object$entries2.length; _i2++) {
          var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
              k = _Object$entries2$_i[0],
              v = _Object$entries2$_i[1];

          rt += "".concat(k, "=").concat(v, ";");
        }

        return rt;
      } else {
        return obj;
      }
    }
  }, {
    key: "StringFormat",
    value: function StringFormat() {
      var args = Array.prototype.slice.call(arguments, 1);
      return arguments[0].replace(/\{(\d+)\}/g, function (match, index) {
        return args[index];
      });
    }
  }, {
    key: "StringFormatJson",
    value: function StringFormatJson(str) {
      return JSON.stringify(str);
    }
  }, {
    key: "StringFormatCsv",
    value: function StringFormatCsv(obj) {
      var rt = "";

      for (var _i3 = 0, _Object$entries3 = Object.entries(obj); _i3 < _Object$entries3.length; _i3++) {
        var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2),
            k = _Object$entries3$_i[0],
            v = _Object$entries3$_i[1];

        rt += "".concat(v, ",");
      }

      return rt;
    }
  }, {
    key: "StringRemoveSpecials",
    value: function StringRemoveSpecials(str) {
      var spc = [".", "~", "{", "}"];

      for (var i = 0; i < spc.length; i++) {
        str = str.replace(spc[i], "");
      }

      return str;
    }
  }, {
    key: "FileDownload",
    value: function FileDownload(fname, ftype, fdata) {
      var blob = new Blob(fdata, {
        type: ftype
      });
      window.saveAs(blob, fname);
    }
  }, {
    key: "FileSizeFormat",
    value: function FileSizeFormat(size) {
      if (size > 0) {
        var i = Math.floor(Math.log(size) / Math.log(1000));
        return (size / Math.pow(1000, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
      } else {
        return size + " B";
      }
    }
  }, {
    key: "EscapeHtml",
    value: function EscapeHtml(unsafe) {
      unsafe = unsafe.replace(/&/g, "&amp;");
      unsafe = unsafe.replace(/</g, "&lt;");
      unsafe = unsafe.replace(/>/g, "&gt;");
      unsafe = unsafe.replace(/"/g, "&quot;");
      unsafe = unsafe.replace(/'/g, "&#039;");
      return unsafe;
    }
  }, {
    key: "GetDateTime",
    value: function GetDateTime() {
      var dt = new Date();
      var hr = dt.getHours() < 10 ? "0" + dt.getHours() : dt.getHours();
      var mn = dt.getMinutes() < 10 ? "0" + dt.getMinutes() : dt.getMinutes();
      var sc = dt.getSeconds() < 10 ? "0" + dt.getSeconds() : dt.getSeconds();
      return hr + ":" + mn + ":" + sc;
    }
  }, {
    key: "GetBrowser",
    value: function GetBrowser() {
      return $.browser.name + " v" + $.browser.versionNumber + " on " + $.browser.platform;
    }
  }, {
    key: "GetScreenSize",
    value: function GetScreenSize() {
      var bwsize = "Viewport=" + $(window).width() + "x" + $(window).height();
      bwsize += " Document=" + $(document).width() + "x" + $(document).height();
      bwsize += " Screen=" + window.screen.width + "x" + window.screen.height;
      return bwsize;
    }
  }, {
    key: "GetNumPercent",
    value: function GetNumPercent(p, n) {
      return p / 100 * n;
    }
  }, {
    key: "GetPercentage",
    value: function GetPercentage(p, n) {
      return p * 100 / n;
    }
  }, {
    key: "FormatNumber",
    value: function FormatNumber(v, d) {
      v = parseFloat(v);
      return v.toFixed(d).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }
  }, {
    key: "CelsiusToFahrenheit",
    value: function CelsiusToFahrenheit(n) {
      return n * 9 / 5 + 32;
    }
  }, {
    key: "CelsiusToKelvin",
    value: function CelsiusToKelvin(n) {
      return n + 273.15;
    }
  }]);

  return wmTools;
}();

var wmCookie =
/*#__PURE__*/
function () {
  function wmCookie() {
    _classCallCheck(this, wmCookie);
  }

  _createClass(wmCookie, null, [{
    key: "Read",
    value: function Read(cname) {
      var decCookie = decodeURIComponent(document.cookie);
      var carr = decCookie.split(';');

      for (var i = 0; i < carr.length; i++) {
        while (carr[i].charAt(0) === ' ') {
          carr[i] = carr[i].substring(1);
        }

        if (carr[i].indexOf(cname) === 0) {
          var r = carr[i].substring(cname.length + 1, carr[i].length);
          jsLog.Verbose("Load cookie '" + cname + "' => " + r);
          return r;
        }
      }

      return null;
    }
  }, {
    key: "Write",
    value: function Write(cvalue) {
      var cname = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var d = new Date();
      d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toGMTString();
      var cn = cname === null ? "E4dWUI" : cname;
      var cv = cn + "=" + escape(cvalue) + "; " + expires + ";path=/; SameSite=None; Secure;";
      document.cookie = cv;
      jsLog.Verbose("Add/Update cookie => " + cv);
    }
  }, {
    key: "CheckBrowser",
    value: function CheckBrowser() {
      wmCookie.Write('1', 'check_browser_cookie');
      return document.cookie.indexOf('check_browser_cookie') !== -1 ? true : false;
    }
  }, {
    key: "Check",
    value: function Check() {
      jsLog.Verbose("Checking for browser supported cookie");

      if (wmCookie.CheckBrowser() === true) {
        jsLog.Debug("Cookies supported. Looking for custom settings");
        var cStr = wmCookie.Read("E4dWUI");

        if (cStr === null) {
          jsLog.Verbose("No settings cookie found. Define defaults");
          wmCookie.Write(JSON.stringify(wmSettings));
        } else {
          jsLog.Debug("Settings cookie found. Loading customized settings");
          var cv = JSON.parse(cStr);
          wmSettings.AutoConnect = cv.AutoConnect;
          wmSettings.DefaultPanel = cv.DefaultPanel;
          wmSettings.ConsoleDirection = cv.ConsoleDirection;
          wmSettings.LogLevel = cv.LogLevel;
          wmSettings.SymbolMode = cv.SymbolMode, jsLog.Verbose("Customized cookie stored settings loaded");
          jsLog.Verbose(wmTools.Stringfy(wmSettings));
        }
      } else {
        jsLog.Warning("Cookies are not supported by the browser. Use default settings");
      }
    }
  }]);

  return wmCookie;
}();

var jsLog =
/*#__PURE__*/
function () {
  function jsLog() {
    _classCallCheck(this, jsLog);
  }

  _createClass(jsLog, null, [{
    key: "Info",
    value: function Info(logmsg) {
      if (wmSettings.LogLevel >= wmEnums.LogLevels.INFO) {
        console.log("[INFO   ] " + logmsg);
      }
    }
  }, {
    key: "Warning",
    value: function Warning(logmsg) {
      if (wmSettings.LogLevel >= wmEnums.LogLevels.WARNING) {
        console.log("[WARN   ] " + logmsg);
      }
    }
  }, {
    key: "Error",
    value: function Error(logmsg) {
      if (wmSettings.LogLevel >= wmEnums.LogLevels.ERROR) {
        console.log("[ERROR  ] " + logmsg);
      }
    }
  }, {
    key: "Debug",
    value: function Debug(logmsg) {
      if (wmSettings.LogLevel >= wmEnums.LogLevels.DEBUG) {
        console.log("[DEBUG  ] " + logmsg);
      }
    }
  }, {
    key: "Verbose",
    value: function Verbose(logmsg) {
      if (wmSettings.LogLevel >= wmEnums.LogLevels.VERBOSE) {
        console.log("[VERBOSE] " + logmsg);
      }
    }
  }]);

  return jsLog;
}();

var wmGCommands = {
  CustomCmd: new wmGCommandItem('', null, null, 'Custom command'),
  MoveFw: new wmGCommandItem('G1', 'Y{0}', 10, 'Move forward on Y axis'),
  MoveBw: new wmGCommandItem('G1', 'Y-{0}', 10, 'Move backward on Y axis'),
  MoveSx: new wmGCommandItem('G1', 'X{0}', 10, 'Move left on X axis'),
  MoveDx: new wmGCommandItem('G1', 'X-{0}', 10, 'Move right on X axis'),
  MoveUp: new wmGCommandItem('G1', 'Z{0}', 10, 'Move up on Z axis'),
  MoveDw: new wmGCommandItem('G1', 'Z-{0}', 10, 'Move down on Z axis'),
  FillRetrive: new wmGCommandItem('G10', null, null, 'Retract filament'),
  FillExtrude: new wmGCommandItem('GYYYY', null, null, 'Extrude filament'),
  MoveHome: new wmGCommandItem('G28', null, null, 'Go home on all axis'),
  MoveHomeX: new wmGCommandItem('G28', 'X', null, 'Go home on X axis'),
  MoveHomeY: new wmGCommandItem('G28', 'Y', null, 'Go home on Y axis'),
  MoveHomeZ: new wmGCommandItem('G28', 'Z', null, 'Go home on Z axis'),
  StepEnable: new wmGCommandItem('M17', '{0}', 'E X Y Z', 'Enable stepper'),
  StepEnableAll: new wmGCommandItem('M17', null, null, 'Enable all steppers'),
  StepDisable: new wmGCommandItem('M18', '{0}', 'E X Y Z', 'Disable stepper'),
  StepDisableAll: new wmGCommandItem('M18', null, null, 'Disable all steppers'),
  SdGetList: new wmGCommandItem('M20', null, null, 'Get SD card content'),
  SdInit: new wmGCommandItem('M21', null, null, 'Init SD card'),
  SdRelease: new wmGCommandItem('M22', null, null, 'Release SD card'),
  SdFileSel: new wmGCommandItem('M23', '{0}', '', 'Select an SD file'),
  SdFilePrint: new wmGCommandItem('M24', '{0}', '', 'Start an SD print'),
  SdPrintStatus: new wmGCommandItem('M27', null, null, 'SD print status'),
  SdPrintReport: new wmGCommandItem('M27', 'S{0}', 5, 'SD print status report'),
  SdFileStart: new wmGCommandItem('M28', '{0}', '', 'Start SD write'),
  SdFileStop: new wmGCommandItem('M29', null, null, 'Stop SD write'),
  SdFileDel: new wmGCommandItem('M30', '{0}', '', 'Delete an SD file'),
  PrintTime: new wmGCommandItem('M31', null, null, 'Print time'),
  FanOn: new wmGCommandItem('M106', 'S{0}', 128, 'Set fan on with speed'),
  FanOff: new wmGCommandItem('M107', null, null, 'Set fan off'),
  GetPosition: new wmGCommandItem('M114', null, null, 'Get Current Position'),
  FWInfo: new wmGCommandItem('M115', null, null, 'Get firmware info', false),
  SetTempUnit: new wmGCommandItem('M149', '{0}', 'C', 'Set temperature units'),
  SetTempOff: new wmGCommandItem('M155', 'S0', '', 'Turn off temperature status'),
  SetTempOn: new wmGCommandItem('M155', 'S{0}', 1, 'Get temp status (1 sec default)'),
  GetSetting: new wmGCommandItem('M503', null, null, 'Get settings report')
};
var wmIcons = {
  Wifi: new wmFontIcon('wifi'),
  Plug: new wmFontIcon('plug'),
  Ban: new wmFontIcon('ban'),
  Bolt: new wmFontIcon('bolt'),
  Info: new wmFontIcon('info'),
  InfoCircle: new wmFontIcon('info-circled'),
  Triangle: new wmFontIcon('exclamation-triangle'),
  CheckSquare: new wmFontIcon('check-square'),
  Terminal: new wmFontIcon('terminal'),
  Exchange: new wmFontIcon('exchange'),
  ChevronUp: new wmFontIcon('chevron-up'),
  ChevronDown: new wmFontIcon('chevron-down'),
  ChevronLeft: new wmFontIcon('chevron-left'),
  ChevronRight: new wmFontIcon('chevron-right'),
  LongArrowUp: new wmFontIcon('long-arrow-up'),
  LongArrowDown: new wmFontIcon('long-arrow-down'),
  LongArrowLeft: new wmFontIcon('long-arrow-left'),
  LongArrowRight: new wmFontIcon('long-arrow-right')
};
var wmColors = {
  Black: 'rgb(0, 0, 0)',
  Blue: 'rgb(54, 162, 235)',
  Green: 'rgb(0, 255, 0)',
  GreenSuc: 'rgb(92, 184, 92)',
  GreenTur: 'rgb(75, 192, 192)',
  Grey: 'rgb(201, 203, 207)',
  Yellow: 'rgb(255, 205, 86)',
  Orange: 'rgb(255, 159, 64)',
  Purple: 'rgb(153, 102, 255)',
  Red: 'rgb(255, 0, 0)',
  RedCoral: 'rgb(255, 99, 132)'
}; // Define default setting onject

jsLog.Verbose("JS Classes initializzation completed");
jsLog.Debug("Default settings loaded: " + wmTools.Stringfy(wmSettings));
wmCookie.Check();