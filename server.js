var n = require('net');
var clients=[];
function Constructer(socket)
{
  this.name = null;
  this.socket = socket; 
}
function onCreateCallback(socket)
{
  var user = new Constructer(socket);
  clients.push(user);

  socket.setEncoding("utf8");
  socket.setTimeout(0);  
  socket.addListener("connect",function(){
      console.log("somebody got connected");
      socket.write("Enter your username\n");  
      });
  socket.addListener("data",function(data){
      if(user.name == null)
      {
      user.name = data.match(/\S+/);
      clients.forEach(function(iterator){
        if(iterator != user)
        {
        iterator.socket.write(user.name+"has joined !! Let the fun begin!!");
        }
        });
        return ;
      }
      clients.forEach(function(iterator){
      if(iterator != user)
      {
        iterator.socket.write(user.name+"     :"+data+"\n");
      }
      });



  });
  socket.addListener("end",function(){
    clients.remove(user);
    clients.forEach(function(iterator){
    if(iterator != user)
    {
        iterator.socket.write(user.name+"left"+"\n");
    }
    });

    socket.end();
    });

}
n.createServer(onCreateCallback).listen(5001);
