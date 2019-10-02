"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPeer = exports.getAllPeers = exports.get = void 0;

var _peerSchema = _interopRequireDefault(require("./peerSchema"));

var _PeerChain = _interopRequireDefault(require("./PeerChain"));

var _PeerBlock = _interopRequireDefault(require("./PeerBlock"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const peerchain = new _PeerChain.default();

const get = async (req, res) => {
  res.send(peerchain.get());
};

exports.get = get;

const getAllPeers = async (req, res) => {
  _peerSchema.default.find({}).exec((error, result) => {
    if (error) {
      res.json({
        'error': 'Error' + error
      });
    } else {
      res.json({
        'status': true,
        'peers': result
      });
    }
  });
};

exports.getAllPeers = getAllPeers;

const createPeer = async (req, res) => {
  const peerBlock = new _PeerBlock.default(req.body.host, req.body.connection_status, req.body.info);
  peerchain.addPeer(peerBlock);
  const peer = new _peerSchema.default(req.body);
  peer.save((error, result) => {
    if (error) {
      res.json({
        'error': 'Unable to create a peer...' + error
      });
    } else {
      res.json({
        'status': true,
        'message': 'new peer created successfully',
        'peer': result
      });
    }
  });
};

exports.createPeer = createPeer;