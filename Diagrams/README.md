# Notations in the diagrams
**Special files transmitted during the authentication procedure:**
1. MetaAddress — Used to issue a challenge message for an address.
2. MetaMessage — Challenge message returned by the client.
3. MetaSignature — Signed Challenge returned with MetaMessage. [1]

[1]: https://medium.com/@alexsherbuck/expressjs-user-authentication-with-metamask-meta-auth-630b6da123ef

**Steps of ExpressJS authentication through MetaMask:**
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

# Description of specific diagrams

**Microblogging**
1. ClientA creates a new blog entry.
2. ClientA sends the blog entry to ServerA for it to be stored in the database.
3. ClientA sends a notification (POST request) to all Servers of users in the contact list (addresses for the server are cached), as an example also to ServerB
4. The counter for new microblogs is incremented in ServerB and ServerB sends the notification notice to ClientB, that there is a new blog entry to be fetched through the socket connection
5. Whenever ClientB comes online and clicks on the assigned button in the user interface, the new blog entries are fetched and shown on the microblogging site for ClientB. This is done through GET request to ServerA, its URL is obtained from the cached contactlist object.

**Contact request**
1. UserA would like to add UserB as a contact.
2. ClientA fetches the URL for ServerB from the Blockchain.
3. UserA sends a contact request through a GET request to ServerB, while also authenticating oneself using the route /friendRequest/auth/IDofUserA/IDofUserB/:MetaMessage/:MetaSignature
4. ServerB propagates the contact request to ClientB using SOCKET
5. If ClientB is online, then the contact request appears in the user interface
    * If ClientB accepts the contact request, then
        1. It adds UserA to the contact list and sends this information to ServerB for storing
        1. When ServerB receives, it generates a ConversationID and then a conversation object for the conversation between UserA and UserB
        1. Then ServerB sends this ConversationID to ClientB (this step serves server authentication purposes)
        1. After this, ClientB sends the information on the accepted request and the ConversationID to ServerA through a POST request using the route /receiveFriendRequest/auth/:currentUser/:newContact/:MetaMessage/:MetaSignature
        1. After receiving this request, ServerA updates the contact list of ClientA through sending a message using SOCKET
    * If ClientB does not accept the contact request, then the request is discarded
6. If ClientB is offline, then the contact request is pending until ClientB comes online
