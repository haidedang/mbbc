pragma solidity ^0.4.18;

import './ENS.sol';

/**
 * A simple resolver anyone can use; only allows the owner of a node to set its
 * address.
 */
contract URLResolver {

    bytes4 constant INTERFACE_META_ID = 0x01ffc9a7;
    bytes4 constant PUBKEY_INTERFACE_ID = 0xc8690233;
    bytes4 constant URL_INTERFACE_ID = 0xc659d443;

    event URLChanged(bytes32 indexed node, string url);
    event PubkeyChanged(bytes32 indexed node, bytes32 x, bytes32 y);

    struct PublicKey {
        bytes32 x;
        bytes32 y;
    }

    struct Record {
        string url;
        PublicKey pubkey;
        
    }

    struct Reverse {
        string userName; 
    }

    ENS ens;

    mapping (bytes32 => Record) records;
    mapping (address => Reverse) reverse; 

    modifier only_owner(bytes32 node) {
        require(ens.owner(node) == msg.sender);
        _;
    }

    /**
     * Constructor.
     * @param ensAddr The ENS registrar contract.
     */
    constructor (ENS ensAddr) public {
        ens = ensAddr;
    }

    /**
     * Sets the SECP256k1 public key associated with an ENS node.
     * @param node The ENS node to query
     * @param x the X coordinate of the curve point for the public key.
     * @param y the Y coordinate of the curve point for the public key.
     */
    function setPubkey(bytes32 node, bytes32 x, bytes32 y) public only_owner(node) {
        records[node].pubkey = PublicKey(x, y);
        emit PubkeyChanged(node, x, y);
    }

    /**
     * Returns the SECP256k1 public key associated with an ENS node.
     * Defined in EIP 619.
     * @param node The ENS node to query
     * @return x, y the X and Y coordinates of the curve point for the public key.
     */
    function pubkey(bytes32 node) public view returns (bytes32 x, bytes32 y) {
        return (records[node].pubkey.x, records[node].pubkey.y);
    }

    function setUrl(bytes32 node, string url, string userName, address owner) public only_owner(node) {
        records[node].url = url;
        reverse[owner].userName = userName; 
        emit URLChanged(node,url);
    }

    function url(bytes32 node) public view returns (string) {
        return records[node].url;
    }

    function domainID(address owner) public view returns (string) { 
        return reverse[owner].userName; 
    }

    /**
     * Returns true if the resolver implements the interface specified by the provided hash.
     * @param interfaceID The ID of the interface to check for.
     * @return True if the contract implements the requested interface.
     */
    function supportsInterface(bytes4 interfaceID) public pure returns (bool) {
        return interfaceID == URL_INTERFACE_ID ||
        interfaceID == PUBKEY_INTERFACE_ID ||
        interfaceID == URL_INTERFACE_ID;
    }
}

