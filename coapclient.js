const coap = require('coap') // or coap
const req = coap.request('coap://[bbbb::12:4b00:2f4:ac09]/d')
var EventEmitter = require("events").EventEmitter;
var body = new EventEmitter();

req.on('response', (res) => { // se algo estiver acaontecendo data ou erro então executa o parametro na função no caso res
    //res.pipe(process.stdout) //"canaliza" a resposta para o process.stdout
    body.data = res;
    body.emit('update')
    //console.log(res)
 
})

body.on('update', function () {
    var valores = Object.values(body.data.payload);
    var array = [];
    for(let i = 0; i < valores.length; i++)
    {
        if(valores[i] > 31 && valores[i] < 127)
        array.push(valores[i])
    }
    //console.log(array);
    recon = String.fromCharCode.apply(null, array);
    jsonstr = JSON.parse(recon);
    //console.log(jsonstr);
    //console.log(Object.values(body.data.payload));
})

req.end()

