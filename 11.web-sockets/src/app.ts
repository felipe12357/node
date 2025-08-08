import WebSocket, { WebSocketServer } from 'ws';
//control . => al utilizar estas dos teclas nos permite instalar las dependencias de tipado


const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {
  console.log('cliente conectado');
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
    //Importante resaltar q esta respuesta solo se envia al cliente q envio el mensaje
    ws.send(`mensaje regresado para unico cliente:\n ${data}`);

    // de esta forma lo puedo enviar a absolutamtent todos los clientes q esten conectaos
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send('mensaje regresado para todos los clientes:\n' + data);
      }
    });
  });

  ws.send('mensaje inicial');

  ws.on('close', (data)=> console.log('cliente desconectado'))

 // setInterval(()=> { ws.send('mensaje repetitivo')}, 2000)
});
console.log('running');
