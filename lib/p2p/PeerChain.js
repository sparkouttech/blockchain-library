"use strict";

var _PeerBlock = _interopRequireDefault(require("./PeerBlock"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Peerchain {
  constructor() {
    this.peerchain = [_PeerBlock.default.genesis];
  }

  addPeer(peer) {
    this.peerchain.push(peer);
  }

  get() {
    return this.peerchain;
  }

}

module.exports = Peerchain;
module.Peerchain = Peerchain;