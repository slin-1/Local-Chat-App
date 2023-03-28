/*
(c) Steven Lin (2023)

//modules: socket.io
//=============================

To test:
Open several browsers at http://localhost:3000/chatClient.html
*/

//Ctrl+C to stop server
const app = require('http').createServer(handler)
const io = require('socket.io')(app)  //wrap server app in socket io capability
const fs = require("fs")  //need to read static files
const url = require("url")  //to parse url strings
const PORT = process.argv[2] || process.env.PORT || 3000  //OPTIONAL: allow PORT to be passed in as command line argument or environment variable
const users = new Map()

const ROOT_DIR = "html";  //dir to serve static files from

const MIME_TYPES = {
  css: "text/css",
  gif: "image/gif",
  htm: "text/html",
  html: "text/html",
  ico: "image/x-icon",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  js: "application/javascript",
  json: "application/json",
  png: "image/png",
  svg: "image/svg+xml",
  txt: "text/plain"
}

function get_mime(filename) {
  for (let ext in MIME_TYPES) {
    if (filename.indexOf(ext, filename.length - ext.length) !== -1) {
      return MIME_TYPES[ext]
    }
  }
  return MIME_TYPES["txt"]
}

function handler(request, response) {
  //handler for http server requests (including static files)
  let urlObj = url.parse(request.url, true, false)
  console.log("\n============================")
  console.log("PATHNAME: " + urlObj.pathname)
  console.log("REQUEST: " + ROOT_DIR + urlObj.pathname)
  console.log("METHOD: " + request.method)

  let receivedData = ""

  //attached event handlers to collect the message data
  request.on("data", function(chunk) {
   receivedData += chunk;
  })

  //event handler for the end of the message
  request.on("end", function() {
  console.log("REQUEST END: ")
  console.log("received data: ", receivedData)
  console.log("type: ", typeof receivedData)

  let filePath = ROOT_DIR + urlObj.pathname
  if (urlObj.pathname === '/') {filePath = ROOT_DIR + '/chatClient.html'}

    if (request.method == "GET") {
      //handle GET requests as static file requests
      fs.readFile(filePath, function(err, data) {
        if (err) {
          //report error to console
          console.log("ERROR: " + JSON.stringify(err))
          //respond with not found 404 to client
          response.writeHead(404)
          response.end(JSON.stringify(err))
          return
        }
        response.writeHead(200, {
          "Content-Type": get_mime(filePath)
        })
        response.end(data)
      })
    }
  })
}


function addToUsers(id, name) {  //assuming that the user enters unique usernames...
  users.set(id, name)
}

function checkMessage(message, socket, currentSocketID) {
  let privateMessage = false
  if(message.indexOf(":") >= 0) {
    let newMessage = message.substring(message.indexOf(":") + 1, message.length).trim()
    let userSubstring = message.substring(0, message.indexOf(":"))
    let splitUsers = userSubstring.split(/[,]/)
    let trimSplitUsers = splitUsers.map(user => {return user.trim()})
    //console.log(newMessage)
    //console.log(trimSplitUsers)
    privateMessage = true
    outputMessages(privateMessage, newMessage, socket, currentSocketID, trimSplitUsers)
  }
  else {
    outputMessages(privateMessage, message, socket, currentSocketID)
  }
  
}

function outputMessages(privateMessage, message, socket, currentSocketID, userArray=[]) {
  if (privateMessage) {
    let stringOfUsers = userArray[0]
    for(let i=1; i<userArray.length; i++) {
      stringOfUsers = stringOfUsers + ", " + userArray[i]
    }
    //console.log(stringOfUsers)
    let message_self = `<span style='color:red'>${users.get(currentSocketID) + ": " + stringOfUsers + ": " + message}</span>`
    socket.emit('serverSays', message_self)  //send message to itself
    
    users.forEach((userName, socketID) => {  //send messages to all valid users
      //console.log(userName + " " + socketID)
      for(let i=0; i<userArray.length; i++) {
        if (userArray[i] === userName) {
          let message_others = `<span style='color:red'>${users.get(currentSocketID) + ": " + stringOfUsers + ": " + message}</span>`
          socket.to(socketID).emit('serverSays', message_others)
        }
      }
    })
  }
  else {
    let message_self = `<span style='color:blue'>${users.get(currentSocketID) + ": " + message}</span>`
    socket.emit('serverSays', message_self)  //send message to itself
    users.forEach((userName, socketID) => {  //send messages to all valid users
      //console.log(userName + " " + socketID)
      let message_others = `<span style='color:white'>${users.get(currentSocketID) + ": " + message}</span>`
      socket.to(socketID).emit('serverSays', message_others)
    })
  }
}


app.listen(PORT) //start server listening on PORT

io.on('connection', function(socket) {
  console.log('client connected')
  //console.log("initial socket id: " + socket.id)
  let welcome_message = `<span style='color:white'>Welcome to Steven's Chat App</span>`
  socket.emit('serverSays', welcome_message)

  socket.on('clientSays', function(data) {
    console.log('RECEIVED DATA: ' + data)
    //console.log("-- socket id: " + socket.id)
    checkMessage(data, socket, socket.id)

    //to broadcast message to everyone including sender:
    //io.emit('serverSays', data) //broadcast to everyone including sender
    //alternatively to broadcast to everyone except the sender
    //socket.broadcast.emit('serverSays', data)
  })

  socket.on('validUser', function(userName) {  //outputs that a valid user has connected
    addToUsers(socket.id, userName)  //stores the socket id's as keys and usernames as values 
    console.log("name: " + userName)
    console.log("socket id: " + socket.id)
    let user_connect_msg = `<span style='color:white'>User connected: ${userName}</span>`
    io.emit('serverSays', user_connect_msg)
  })

  socket.on('disconnect', function(data) {
    //event emitted when a client disconnects
    console.log('client disconnected')
  })
})

console.log(`Server Running at PORT ${PORT} CNTL-C to quit`)
console.log("To Test")
console.log(`Open several browsers at http://localhost:${PORT}/chatClient.html`)