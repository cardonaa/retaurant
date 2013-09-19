
module.exports = function (servidor, cache){
  
  var sio = require('socket.io');
  var ws = sio.listen(servidor);
  var mongoose = require('mongoose');

  mongoose.connect('mongodb://localhost/ptos');

  var ptosSchema = mongoose.Schema({
    tipo: String ,
    pto : String ,
    precio : Number 
  });

  var pto = mongoose.model('ptos', ptosSchema);
  
   pto.find().exec(function(err, doc){
     console.log(err);
     console.log(doc);
   });
   
  /*/ CREANDO UN PTO PARA INSERTAR.
  var primerpto = new pto({
    tipo : 'Refrescos',
    pto : '7up',
    precio: 1500
  });
  /*/
  

   /*/ SAVES  
  primerpto.save(function(err, doc){
     if(err)
        console.log(err);
  });
   /*/

    /*/ EVENTO CONNECTION
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
      console.log("Bd coenctada.");
    });
    /*/

  /*/ =================================================================================/*/

  ws.disable('log'); 
  // websocket, htmlfile, xhr-polling, jsonp-polling
  ws.on('connection', function (socket){

    console.log("la id es",socket.id);
    socket.emit('ready',{title: 'Ready'});


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
