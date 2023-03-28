# Local-Chat-App

### Developed by:      Steven Lin

#### node.js Version:   `v18.13.0.`  
#### OS:                `Windows 10`

## Install:           
Requires Node.js to function.  
`npm install`  
^ installs the required node modules (socket.io)  

## Launch:  
`node server.js`  
^ while in the correct directory  
## Testing:  
visit: `http://localhost:3000/chatClient.html`  
Open multiple browsers/pages of the chatClient.  
Enter a username for each client (required before you can message).  
The messages sent can only be seen by other connected users (those who entered valid usernames).  
- Blue = self message  
- Black = message from others (that all valid users can see)  
- Red = private message / private group message  
  - Example of a private group msg: user2, user3: hello  
    - if sent from user1, then there would be a private group chat between user1, user2, and user3.  

To send a message, type in the respective box and press the send button.  
To clear the current client's messages, press the clear button.  
