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

## A Quick Showcase of the App

Prior to connecting as a user:  
![introduction](https://user-images.githubusercontent.com/105820635/237000805-5f096a26-87e6-4cee-aa39-019cd822478d.png)  

Sending normal messages between two users:  
![messages_between_two](https://user-images.githubusercontent.com/105820635/237000884-57a312b2-2c2d-4bf5-ac18-37b5e4bc9d36.png)

Sending private messages between two users:
![private_message](https://user-images.githubusercontent.com/105820635/237000926-57ac577a-1b37-421b-bd1f-ffa2bde8b90e.png)
