const EXPORTED_SYMBOLS = ["StorageFile"];
const Cc = Components.classes,
      Ci = Components.interfaces,
      Cu = Components.utils;
const filename_regex = /^[a-zA-Z0-9\.,-_]+$/;
function getLocalDirectory() {
  let directoryService = Cc["@mozilla.org/file/directory_service;1"]
                         .getService(Ci.nsIProperties);
  let localDir = directoryService.get("ProfD", Ci.nsIFile);
  localDir.append("YouTubeCenterStorage");
  if (!localDir.exists() || !localDir.isDirectory())
      localDir.create(Ci.nsIFile.DIRECTORY_TYPE, 0774);
  return localDir;
}

function StorageFile() {
  // Empty
}

StorageFile.prototype.exists = function exists(name) {
  if (!(filename_regex.test(name))) throw new Error("Filename was malformed!");
  let file = getLocalDirectory();
  file.append(name + ".data");
  if (!file.exists())
    return false;
  return true;
};

StorageFile.prototype.writeFile = function writeFile(name, data) {
  if (!(filename_regex.test(name))) throw new Error("Filename was malformed!");
  let file = getLocalDirectory();
  file.append(name + ".data");
  if (!file.exists())
    file.create(Ci.nsIFile.NORMAL_FILE_TYPE, 0774);
  Cu.import("resource://gre/modules/NetUtil.jsm");
  Cu.import("resource://gre/modules/FileUtils.jsm");
  var ostream = FileUtils.openSafeFileOutputStream(file);
  var converter = Cc["@mozilla.org/intl/scriptableunicodeconverter"]
                  .createInstance(Ci.nsIScriptableUnicodeConverter);
  converter.charset = "UTF-8";
  var istream = converter.convertToInputStream(data);
  NetUtil.asyncCopy(istream, ostream, function(status) {
    if (!Components.isSuccessCode(status))
      return;
  });
};

StorageFile.prototype.readFile = function readFile(name) {
  if (!(filename_regex.test(name))) throw new Error("Filename was malformed!");
  let file = getLocalDirectory();
  file.append(name + ".data");
  if (!file.exists())
    return null;
  var data = "";
  var fstream = Cc["@mozilla.org/network/file-input-stream;1"]
                .createInstance(Ci.nsIFileInputStream);
  var cstream = Cc["@mozilla.org/intl/converter-input-stream;1"]
                .createInstance(Ci.nsIConverterInputStream);
  try {
    fstream.init(file, -1, 0, 0);
    cstream.init(fstream, "UTF-8", 0, 0);
    let (str = {}) {
      let read = 0;
      do {
        read = cstream.readString(0xffffffff, str);
        data += str.value;
      } while (read != 0);
    }
  } finally {
    cstream.close();
  }
  return data;
};

StorageFile.prototype.removeFile = function removeFile(name) {
  if (!(filename_regex.test(name))) throw new Error("Filename was malformed!");
  let file = getLocalDirectory();
  file.append(name + ".data");
  if (!file.exists() || !file.isFile()) return;
  file.remove(false);
};
