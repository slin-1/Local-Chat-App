//connect to server and retain the socket
//connect to same host that served the document

//const socket = io('http://' + window.document.location.host)
const socket = io() //by default connects to same server that served the page

//adds the given msg to the html page
socket.on('serverSays', function(message) {
  let msgDiv = document.createElement('div')
  msgDiv.innerHTML = message
  document.getElementById('messages').appendChild(msgDiv)
})

//check & return whether the username starts w/ letter and only contain letters and numbers
function checkUserName(userName) {
  return Boolean(userName.match(/^[A-Za-z]/) && userName.match(/^[A-Za-z0-9]*$/))
}

function connectAs() {
  console.log("Attempting to connect...")
  let userName = document.getElementById('usernameBox').value.trim()
  let userNameBox = document.getElementById('usernameBox')
  let connectButton = document.getElementById('connect_button')
  let msgBox = document.getElementById('msgBox')
  let sendButton = document.getElementById('send_button')
  let clearButton = document.getElementById('clear_button')

  if (checkUserName(userName)) {  //username start w/ letter and only contain letters and numbers
    console.log("Successfully connected!")
    //console.log("User: " + userName)
    //console.log("Socket ID: " + socket.id)

    //disable/enable respective buttons
    userNameBox.disabled = true;
    connectButton.disabled = true;
    msgBox.disabled = false;
    sendButton.disabled = false;
    clearButton.disabled = false;

    socket.emit('validUser', userName, socket.id)  //communicate to the server
    userNameBox.value = ''
  }
  else {
    alert("Please enter a valid username (start name w/ letter, and use letters/numbers only)")
    console.log("Failed to connect...")
  }
}

function sendMessage() {
  let message = document.getElementById('msgBox').value.trim()
  if(message === '') return //do nothing
  socket.emit('clientSays', message)
  document.getElementById('msgBox').value = ''
}

function clearMessage() {
  let messages = document.getElementById('messages')
  messages.innerHTML = `<div><span style='color:white'>Messages cleared!</span></div>`
}