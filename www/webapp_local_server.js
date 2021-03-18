var fileUrlRegEx = /^file:\/\/(.*)/;

module.exports = {
  startupDidComplete: function(callback) {
    cordova.exec(
      callback,
      console.error,
      "WebAppLocalServer",
      "startupDidComplete",
      []);
  },

  checkForUpdates: function(callback) {
    cordova.exec(
      callback,
      console.error,
      "WebAppLocalServer",
      "checkForUpdates",
      []);
  },

  onNewVersionReady: function(callback) {
    cordova.exec(
      callback,
      console.error,
      "WebAppLocalServer",
      "onNewVersionReady",
      []);
  },

  onStartingNewVersionDownload: function(callback) {
    cordova.exec(
      function(yes) {
        let result = yes;
        if (typeof yes === 'string') {
          result = yes === 'true' ? true : false;
        }
        callback(result);
      },
      console.error,
      "WebAppLocalServer",
      "onStartingNewVersionDownload",
      []);
  },

  switchToPendingVersion: function(callback, errorCallback) {
    cordova.exec(
      callback,
      function(error) {
        console.error(error);
        if (typeof errorCallback === "function") {
          errorCallback(error);
        }
      },
      "WebAppLocalServer",
      "switchPendingVersion",
      []
    );
  },

  setRootUrl: function(callback, rootUrl) {
    cordova.exec(
      callback,
      console.error,
      "WebAppLocalServer",
      "setRootUrl",
      [rootUrl]);
  },

  onError: function(callback) {
    cordova.exec(
      function(errorMessage) {
        // Convert error message to a proper error object
        var error = new Error(errorMessage);
        callback(error);
      },
      console.error,
      "WebAppLocalServer",
      "onError",
      []);
  },

  localFileSystemUrl: function(fileUrl) {
    var match = fileUrlRegEx.exec(fileUrl);
    if (!match) return fileUrl;

    var path = match[1];
    return "/local-filesystem" + path;
  }
};
