export enum EventType {
  Connect = 'connect',                        // emitted by default on connection successful
  Reconnect = 'reconnect',                    // emitted by default on reconnection successful
  Disconnect = 'disconnect',                  // emitted by default on disconnect
  Join = 'join',                              // must be emitted by client to register its username
  JoinedSuccessfully = 'joined successfully', // emitted by server to confirm username registered
  UserJoined = 'user joined',                 // emitted by server to notify of new user
  UserLeft = 'user left',                     // emitted by server to notify that a user left
  NewMessage = 'new message',                 // emitted by server to notify of new message
  PublishMessage = 'publish message',         // emitted by client to send message
  Typing = 'typing',                          // emitted by client and server to notify that user started typing
  StopTyping = 'stop typing',                 // emitted by client and server to notify that user stopped typing
}
