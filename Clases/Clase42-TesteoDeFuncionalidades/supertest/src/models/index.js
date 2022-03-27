const MemoryDaos = require("./memoryDaos");
const MongoDaos = require("./mongoDaos");

let persistencia = "memorydb";
let userDao;

switch (persistencia) {
  case "mongodb":
    userDao = new MongoDaos();
    break;
  case "memorydb":
    userDao = new MemoryDaos();
    break;
}

module.exports = { userDao }