import io from "socket.io-client";


  var socket = io(window.location.origin.replace('4113','4160'));

  window.socket = socket; 
  socket.on('NEW:MESSAGE', function(msg){
    if(window.user !== msg.user){
      console.log(msg);
    }
  })



export default socket;