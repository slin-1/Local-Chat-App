//Add event listeners
document.addEventListener('DOMContentLoaded', function() {
  //This function is called after the browser has loaded the web page

  //add listener to confirm button
  document.getElementById('connect_button').addEventListener('click', connectAs)
  //add listener to send button
  document.getElementById('send_button').addEventListener('click', sendMessage)
  //add listener to clear button
  document.getElementById('clear_button').addEventListener('click', clearMessage)
  //add keyboard handler to document
  document.addEventListener('keydown', handleKeyDown)
})
