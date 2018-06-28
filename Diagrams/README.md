Special files transmitted during the authentication procedure:
1. MetaAddress — Used to issue a challenge message for an address.
2. MetaMessage — Challenge message returned by the client.
3. MetaSignature — Signed Challenge returned with MetaMessage. [1]

[1]: https://medium.com/@alexsherbuck/expressjs-user-authentication-with-metamask-meta-auth-630b6da123ef

Steps of ExpressJS authentication through MetaMask:
1. Client sends a request to the server (Client’s MetaAddress in the URL)
2. Server generates a challenge, sends it back to the Client
3. The Client signs the challenge and sends the MetaMessage 
4. The Server extracts the Client’s MetaAddress based on the MetaMessage and the MetaSignature and compares it with one sent originally
5. If the two MetaAddresses match, the Client is authenticated

→ (continuous): asynchronous message transmission
→(dotted arrow): synchronous message transmission
o-->o: denotes authenticated communication using MetaMask
SOCKET: denotes a socket connection between the Client and Server side for a User. This is achieved through the framework Socket.io, a Client fetches all pieces of information whenever the connection is established.
GET, POST, PUT: HTTP requests for message transmission
