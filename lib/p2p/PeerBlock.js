"use strict";

class PeerBlock {
  constructor(host, connection_status, info) {
    this.host = host;
    this.connection_status = connection_status;
    this.info = info;
  }

  static get genesis() {
    return new PeerBlock('127.0.0.1', true, {
      'data': true
    });
  }

}

module.exports = PeerBlock;
module.PeerBlock = PeerBlock;