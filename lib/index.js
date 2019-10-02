"use strict";

var _express = _interopRequireDefault(require("express"));

var _ws = _interopRequireDefault(require("ws"));

var _ip = _interopRequireDefault(require("ip"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _iplocation = _interopRequireDefault(require("iplocation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const env = _dotenv.default.config();

const app = (0, _express.default)();
const ws_server = new _ws.default.Server({
  port: env.parsed.SOCKET_PORT
});
const ws_clients = [];

const register = (ws, id) => {
  ws_clients[id] = ws;
};

ws_server.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    message = JSON.parse(message);
    console.log(message.type);

    switch (message.type.toString()) {
      case 'REGISTER':
        register(ws, message.id);
        break;

      default:
        break;
    }
  });
});
const wsClient = new _ws.default('ws://' + env.parsed.MAIN_SERVER_HOST + ':' + env.parsed.SOCKET_PORT);
wsClient.on('open', function open() {
  let data = {};
  data.type = "REGISTER";
  data.id = 1234;
  wsClient.send(JSON.stringify(data));
});
console.log(_ip.default.address());
(0, _iplocation.default)('106.211.235.50', [], (error, res) => {
  console.log(res);
  console.log(JSON.stringify(res));
});
app.listen(env.parsed.PORT, () => {
  console.log("app is running on port ".concat(env.parsed.PORT));
});