//KEY CODES
const ENTER_KEY = 13

function handleKeyDown(e) {
  //console.log("keydown code = " + e.which);

  if(e.keyCode === ENTER_KEY) {
    let sendButton = document.getElementById('send_button')
    if (sendButton.disabled === false) {  //only allow enter key if user has entered a valid username
      sendMessage()
    }
    return false //do not propagate the event
  }
}
