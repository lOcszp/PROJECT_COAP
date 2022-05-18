

    const coap = require('coap'),
        bl = require('bl');

    //construct coap request
    var req = coap.request({

        observe: false,
        host: 'bbbb::12:4b00:2f4:ac09',
        pathname: '/d',
        port: 5683,
        method: 'get',
        confirmable: 'true',
        retrySend: 'true',
        //query:'',
        options: {
            //  "Content-Format": 'application/json'
        }

    })

    //put payload into request      
    var payload = {
        username: 'aniu',
    }
    req.write(JSON.stringify(payload));

    //waiting for coap server send con response
    req.on('response', function(res) {
        //print response code, headers,options,method
        //console.log('response code', res.code);
    
        if (res.code !== '2.05') return process.exit(1);
        //get response/payload from coap server, server sends json format
        res.pipe(bl(function(err, data) {
            //parse data into string
            var valores = Object.values(data);
            var array = [];
            for(let i = 0; i < valores.length; i++)
            {
                if(valores[i] > 31 && valores[i] < 127)
                array.push(valores[i])
            }
            //console.log(array);
            recon = String.fromCharCode.apply(null, array);
            console.log(recon);
            jsonstr = JSON.parse(recon);
            payload.username =  jsonstr;
            //req.write(jsonstr);
            //console.log(jsonstr);
            //return jsonstr;
            // JSON.stringify(json));
        }))
    });

    req.end();

    setTimeout(function() {
        console.log(payload.username);
      }, 10000);
    

    //console.log(jsonstr);
