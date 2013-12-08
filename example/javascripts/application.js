requirejs.config({
  paths: {
    ldfw: "../../ldfw",
    eventemitter: "../../bower_components/eventEmitter/EventEmitter",
    async: "../../bower_components/async/lib/async"
  }
});

define(function (require, exports, module) {
  var LDFW = require("ldfw")
    , game = new LDFW.Game($("#game"));
});