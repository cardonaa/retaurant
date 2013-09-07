
module.exports = function (servidor, cache){
  
  var sio = require('socket.io');
  var ws = sio.listen(servidor);

  ws.disable('log'); 
  // websocket, htmlfile, xhr-polling, jsonp-polling
  ws.on('connection', function (socket){

    console.log("la id es",socket.id);

    socket.emit('ready',{title: 'Ready'});

    // emito los ptos.
    /*/var ptos = {};

    ptos[0].tipo = "Sopas:";
    ptos[0].nombre = "Sopa de pollo.";
    ptos[0].precio = 3500;
    
    ptos[0].tipo = "Sopas:";
    ptos[0].nombre = "Sopa de pollo.";
    ptos[0].precio = 3500;
    
    ptos[0].tipo = "Sopas:";
    ptos[0].nombre = "Sopa de pollo.";
    ptos[0].precio = 3500;
    
    ptos[0].tipo = "Sopas:";
    ptos[0].nombre = "Sopa de pollo.";
    ptos[0].precio = 3500;
    
    ptos[0].tipo = "Sopas:";
    ptos[0].nombre = "Sopa de pollo.";
    ptos[0].precio = 3500;
    /*/

    socket.on('imagen', function (imagen){
      cache[imagen.id] = imagen.data;
      socket.broadcast.emit('imagen', imagen);      
    });

    socket.on('pedido', function (pedido){
      //cache[imagen.id] = imagen.data;
      socket.broadcast.emit('pedido',pedido); // lo emito
      // guardo en la bd.   
    });



  });
};
