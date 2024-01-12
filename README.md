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
1. Visit: `http://localhost:3000/chatClient.html`  
2. Open multiple browsers/pages of the chatClient.  
3. Enter a username for each client (required before you can message).  
4. The messages sent can only be seen by other connected users (those who entered valid usernames).  

<ul>
  <ul>
    <li>
      <p><span style="background-color:#1640EA"><b>Blue</b> = self message</span></p>  
    </li>
    <li>
      <p><span style="background-color:#3D3C3F"><b>Black</b> = message from others (that all valid users can see)</span></p>  
    </li>
    <li>
      <p><span style="background-color:#921818"><b>Red</b> = private message / private group message</span>  
    </li>
  </ul>

  <ul>
    <ul>
      <li>
        <p>Example of a private group msg: user2, user3: hello</p>  
      </li>
      <ul>
        <li>
          <p>if sent from user1, then there would be a private group chat between user1, user2, and user3.</p>  
        </li>
      </ul>
    </ul>
  </ul>
</ul>

5. To send a message, type in the respective box and press the send button.  
6. To clear the current client's messages, press the clear button.  

## A Quick Showcase of the App

Prior to connecting as a user:  
![introduction](https://user-images.githubusercontent.com/105820635/237000805-5f096a26-87e6-4cee-aa39-019cd822478d.png)  

Sending normal messages between two users:  
![messages_between_two](https://user-images.githubusercontent.com/105820635/237000884-57a312b2-2c2d-4bf5-ac18-37b5e4bc9d36.png)

Sending private messages between two users:
![private_message](https://user-images.githubusercontent.com/105820635/237000926-57ac577a-1b37-421b-bd1f-ffa2bde8b90e.png)
