var mqtt = require('mqtt');
const axios = require('axios')
const log = require('../middleware/logs')
const mid = require('../middleware/dorotiMiddleware')
var opts = {
  clientId: "Ekiaa",
  qos: 2
}
var client = mqtt.connect('mqtt://134.209.171.145:1883', opts)
SeqId = require("seqid")
spm = 0;
devicesCheck = [];
var onReques = 0;;

var id = SeqId()
let funtions = {};

check();
//Garbage collector experimental test

setInterval(() => {
  garbageCollector();
}, 10000);
client.on('connect', function () {
  client.subscribe('cmdGeneral', {
    qos: 2
  }, function (params) {

  })
  client.subscribe('checked', function (err) {
    if (!err) {
      console.log("conectado");
    }
  })

  client.subscribe('responses', function (err) {
    if (!err) {
      console.log("conectado a las respuestas");
    }
  })


})
let json = {}
client.on('message', function (topic, message) {
  console.log((topic === "checked"), "el topico es : " + topic);
  if (topic === "checked") {
    checkIfExist(message.toString())
  }
  if (topic === "responses") {
    let msj = JSON.parse(message.toString());
    switch (msj.d.type) {
      case 'transResponse':
        console.log("cierre");
        sendDispensationClose(msj);
        break;
      case 'dispendResponse':
        sendDispensation(msj)
        break;
    }
  }
  console.log("Debug-:", spm, topic);
  spm++

})


funtions.setProvider = (req, res) => {
  let sque = id.next();

  let json = {
    messageId: sque,
    command: "definirProveedor",
    products: req.body.products,
  }
  onReques++;
  client.publish('command/' + req.body.deviceId, JSON.stringify(json), {
    qos: 2,
    retain: true
  }, function (err, menssage) {
    if (!err) {


      console.log("sendend");
    } else {
      console.log("Mengaje", err);
    }
  })
  client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString(), sque)
    let ase = {};
    ase = JSON.parse(message.toString());
    try {
      if (ase.d.messageId == sque) {
        res.end(message.toString());
        onReques--;
      }
    } catch (error) {

    }




  })
}


funtions.general = (req, res) => {
  let sque = id.next()
  console.log(req.body);
  let json = {
    messageId: sque,
    command: req.body.general
  }
  onReques++;
  client.publish('command/' + req.body.deviceId, JSON.stringify(json), {
    qos: 2,
    retain: true
  }, function (err, menssage) {
    if (!err) {


      console.log("sendend");
    } else {
      console.log("Mengaje", err);
    }
  })
  client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString(), sque)
    let ase = {};
    ase = JSON.parse(message.toString());
    try {
      if (ase.d.messageId == sque) {
        res.end(message.toString());
        onReques--;
      }
    } catch (error) {

    }




  })
}


funtions.getInventory = (req, res) => {
  let sque = id.next()
  console.log(req.body);
  let json = {
    messageId: sque,
    command: "solicitarInventario",
  }
  onReques++;
  client.publish('command/' + req.body.deviceId, JSON.stringify(json), {
    qos: 2,
    retain: true
  }, function (err, menssage) {
    if (!err) {


      console.log("sendend");
    } else {
      console.log("Mengaje", err);
    }
  })
  let test = client;
  client.on('message', function (topic, message) {
    // message is Buffer
    //console.log(message.toString(), sque)
    let ase = {};
    ase = JSON.parse(message.toString());
    try {
      if (ase.d.messageId == sque) {
        res.end(message.toString());
        onReques--;
      }
    } catch (error) {

    }
  })
}

funtions.changePassword = (req, res) => {
  let sque = id.next()
  console.log(req.body);
  let json = {
    messageId: sque,
    command: "cambiarClave",
    password: req.body.password
  }
  onReques++;
  client.publish('command/' + req.body.deviceId, JSON.stringify(json), {
    qos: 2,
    retain: true
  }, function (err, menssage) {
    if (!err) {


      console.log("sendend");
    } else {
      console.log("Mengaje", err);
    }
  })
  client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString(), sque)
    let ase = {};
    ase = JSON.parse(message.toString());
    try {
      if (ase.d.messageId == sque) {
        res.end(message.toString());
        onReques--;
      }
    } catch (error) {

    }
  })
}



funtions.authAcess = (req, res) => {
  try {
    let sque = id.next()
    log.general.info("Autorizacion de cargue", req.body, "id", sque);
    onReques++;
    timeout(req,res);
    if (req.body.idProveedor && req.body.password && req.body.slots && req.body.deviceId) {

      let json = {
        messageId: sque,
        command: "autorizarProveedor",
        idProveedor: req.body.idProveedor,
        password: req.body.password,
        slots: req.body.slots,
      }
      publicar(req.body.deviceId, json);
      client.on('message', function (topic, message) {
        // message is Buffer
        console.log(message.toString(), sque)
        let ase = {};
        ase = JSON.parse(message.toString());
        try {
          if (ase.d.messageId == sque) {
            res.end(message.toString());
            onReques--;
          }
        } catch (error) {

        }




      })
    } else {
      res.status(400).send({ error: 'parameters wrong' })
      log.general.error('Error de parametros', req.body)
    }

  } catch (error) {
    log.error.error(error)
  }
}



funtions.autorizar = (req, res) => {
  let sque = id.next()


  let json = {
    messageId: sque,
    command: req.body.command,
    estado: req.body.estado,


  }

  console.log(json);
  onReques++;
  client.publish('command/' + req.body.deviceId, JSON.stringify(json), {
    qos: 2,
    retain: true
  }, function (err, menssage) {
    if (!err) {


      console.log("sendend");
    } else {
      console.log("Mengaje", err);
    }
  })
  client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString(), sque)
    let ase = {};
    ase = JSON.parse(message.toString());
    try {
      if (ase.d.messageId == sque) {
        res.end(message.toString());
        onReques--;
      }
    } catch (error) {

    }




  })

}



/**Web service to get temperature from doroti  */
funtions.humidity = (req, res) => {
  let sque = id.next()
  console.log(req.body);

  let json = {
    messageId: sque,
    command: "leerHumedad",



  }

  console.log(json);
  onReques++;
  client.publish('command/' + req.body.deviceId, JSON.stringify(json), {
    qos: 2,
    retain: true
  }, function (err, menssage) {
    if (!err) {


      console.log("sendend");
    } else {
      console.log("Mengaje", err);
    }
  })
  client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString(), sque)
    let ase = {};
    ase = JSON.parse(message.toString());
    try {
      if (ase.d.messageId == sque) {
        res.end(message.toString());
        onReques--;
      }
    } catch (error) {

    }




  })

}

funtions.test = (req, res) => {
  let sque = id.next()
  console.log(req.body);

  let json = req.body;

  console.log(json);
  onReques++;
  client.publish('command/' + req.body.deviceId, JSON.stringify(json), {
    qos: 2,
    retain: true
  }, function (err, menssage) {
    if (!err) {


      console.log("sendend");
    } else {
      console.log("Mengaje", err);
    }
  })
  client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString(), sque)
    let ase = {};
    ase = JSON.parse(message.toString());
    try {
      if (ase.d.messageId == sque) {
        res.end(message.toString());
        onReques--;
      }
    } catch (error) {

    }




  })

}


funtions.getConftemp = (req, res) => {
  let sque = id.next()
  console.log(req.body);

  let json = {
    messageId: sque,
    command: "leerConfTemp "
  }

  onReques++;
  client.publish('command/' + req.body.deviceId, JSON.stringify(json), {
    qos: 2,
    retain: true
  }, function (err, menssage) {
    if (!err) {


      console.log("sendend");
    } else {
      console.log("Mengaje", err);
    }
  })
  client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString(), sque)
    let ase = {};
    ase = JSON.parse(message.toString());
    try {
      if (ase.d.messageId == sque) {
        res.end(message.toString());
        onReques--;
      }
    } catch (error) {

    }




  })
}


funtions.temp = (req, res) => {
  let sque = id.next()
  console.log(req.body);

  let json = {
    messageId: sque,
    command: "leerTemp",



  }



  console.log(json);
  onReques++;
  client.publish('command/' + req.body.deviceId, JSON.stringify(json), {
    qos: 2,
    retain: true
  }, function (err, menssage) {
    if (!err) {


      console.log("sendend");
    } else {
      console.log("Mengaje", err);
    }
  })
  client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString(), sque)
    let ase = {};
    ase = JSON.parse(message.toString());
    try {
      if (ase.d.messageId == sque) {
        res.end(message.toString());
        onReques--;
      }
    } catch (error) {

    }




  })

}


funtions.set_conf_temp = (req, res) => {
  let sque = id.next()
  console.log(req.body);

  let json = {
    messageId: sque,
    command: 'definirConfTemp',
    histeSup: req.body.histeresisSup,
    histeInf: req.body.histeresisInf,
    restHour: req.body.horasDescanso,
    restMinutes: req.body.minutosDescanso
  }

  console.log(json);
  onReques++;
  client.publish('command/' + req.body.deviceId, JSON.stringify(json), {
    qos: 2,
    retain: true
  }, function (err, menssage) {
    if (!err) {


      console.log("sendend");
    } else {
      console.log("Mengaje", err);
    }
  })
  client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString(), sque)
    let ase = {};
    ase = JSON.parse(message.toString());
    try {
      if (ase.d.messageId == sque) {
        res.end(message.toString());
        onReques--;
      }
    } catch (error) {

    }




  })

}



funtions.setTemp = (req, res) => {
  let sque = id.next()
  console.log(req.body);

  let json = {
    messageId: sque,
    command: "definirTemp",
    estado: req.body.estado,
    temp: req.body.temp
  }

  console.log(json);
  onReques++;
  client.publish('command/' + req.body.deviceId, JSON.stringify(json), {
    qos: 2,
    retain: true
  }, function (err, menssage) {
    if (!err) {


      console.log("sendend");
    } else {
      console.log("Mengaje", err);
    }
  })
  client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString(), sque)
    let ase = {};
    ase = JSON.parse(message.toString());
    try {
      if (ase.d.messageId == sque) {
        res.end(message.toString());
        onReques--;
      }
    } catch (error) {

    }




  })

}



funtions.peso = (req, res) => {
  let sque = id.next()
  console.log(req.body);

  let json = {
    messageId: sque,
    command: "leerPeso",

  }

  console.log(json);
  onReques++;
  client.publish('command/' + req.body.deviceId, JSON.stringify(json), {
    qos: 2,
    retain: true
  }, function (err, menssage) {
    if (!err) {


      console.log("sendend");
    } else {
      console.log("Mengaje", err);
    }
  })

  let test = client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString(), sque)
    let ase = {};
    ase = JSON.parse(message.toString());
    try {
      if (ase.d.messageId == sque) {
        res.end(message.toString());
        onReques--;
        //Esta condicion
        test.off('message');
      }
    } catch (error) {

    }

  })

}


funtions.setPeso = (req, res) => {
  let sque = id.next()
  console.log(req.body);

  let json = {
    messageId: sque,
    command: "definirPeso",
    weight: req.body.weight



  }

  console.log(json);
  onReques++;
  client.publish('command/' + req.body.deviceId, JSON.stringify(json), {
    qos: 2,
    retain: true
  }, function (err, menssage) {
    if (!err) {


      console.log("sendend");
    } else {
      console.log("Mengaje", err);
    }
  })
  client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString(), sque)
    let ase = {};
    ase = JSON.parse(message.toString());
    try {
      if (ase.d.messageId == sque) {
        res.end(message.toString());
        onReques--;
      }
    } catch (error) {

    }




  })

}



funtions.getProduct = (req, res) => {
  let sque = id.next()
  console.log(req.body);

  let json = {
    messageId: sque,
    command: "solicitarProducto",
    productId: req.body.product


  }

  console.log(json);
  onReques++;
  client.publish('command/' + req.body.deviceId, JSON.stringify(json), {
    qos: 2,
    retain: true
  }, function (err, menssage) {
    if (!err) {


      console.log("sendend");
    } else {
      console.log("Mengaje", err);
    }
  })
  client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString(), sque)
    let ase = {};
    ase = JSON.parse(message.toString());


    try {
      try {
        if (ase.d.messageId == sque) {
          res.end(message.toString());
          onReques--;
        }
      } catch (error) {

      }
    } catch (error) {
      console.log("Error, + ", error);
    }



  })

}


funtions.setProduct = (req, res) => {
  let sque = id.next()
  console.log(req.body);

  let json = {
    messageId: sque,
    command: "solicitarProducto",
    productId: req.body.product,
    price: req.body.price,
    quantity: req.body.quantity,
    enabled: req.body.enabled
  }

  console.log(json);
  onReques++;
  client.publish('command/' + req.body.deviceId, JSON.stringify(json), {
    qos: 2,
    retain: true
  }, function (err, menssage) {
    if (!err) {


      console.log("sendend");
    } else {
      console.log("Mengaje", err);
    }
  })
  client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString(), sque)
    let ase = {};
    ase = JSON.parse(message.toString());
    try {
      if (ase.d.messageId == sque) {
        res.end(message.toString());
        onReques--;
      }
    } catch (error) {

    }




  })

}



funtions.dispensar = (req, res) => {
  let sque = id.next()
  console.log(req.body);

  let json = {
    messageId: sque,
    command: "autorizarProducto",
    card: req.body.card,
    id: req.body.id,
    key: req.body.key,
    product: req.body.product,
    // quantity: req.body.quantity,

  }

  console.log(json);
  onReques++;
  client.publish('command/' + req.body.deviceId, JSON.stringify(json), {
    qos: 2,
    retain: true
  }, function (err, menssage) {
    if (!err) {


      console.log("sendend");
    } else {
      console.log("Mengaje", err);
    }
  })
  client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString(), sque)
    let ase = {};
    ase = JSON.parse(message.toString());
    try {
      if (ase.d.messageId == sque) {
        res.end(message.toString());
        onReques--;
      }
    } catch (error) {

    }




  })

}
/*
app.post('/',  async function (req, res) {
    let mensaje;
   
     console.log(client.connected);
   
     client.publish('iot-2/cmd/comandosTelemetria/fmt/json', JSON.stringify(json), function (err,menssage) {
       if (!err) {
         console.log("sendend",menssage);
       }else{
         console.log("Mengaje",err);
       }
     })
     client.on('message', function (topic, message) {
       // message is Buffer
       
       
       console.log(message.toString(),topic)
       res.send(mensaje);
       client.end()
       
     })
   
   });

   
function conectar() {
    client.on('connect', function () {
      client.subscribe('iot-2/evt/resultadoComandos/fmt/json',{qos:2}, function (params) {
        
      })
      client.subscribe('presence', function (err) {
        if (!err) {
          console.log("conectado");
     }
        })
     
      })
    
  }
  */

function checkIfExist(device) {
  let a = JSON.parse(device);
  if (Object.entries(a).length === 0) return false;
  console.log(devicesCheck.length, a.deviceId);
  let json = {
    deviceId: a.deviceId,
    check: 1
  }

  if (devicesCheck.length == 0) {
    console.log(json, "Aqui guarda al iniciar");
    devicesCheck.push(json)

  } else {
    var b = devicesCheck.find(check => check.deviceId == a.deviceId);
    console.log();
    if (b) {
      devicesCheck.forEach(check => {
        if (check.deviceId == a.deviceId) {
          check.check++
        }
      });
      console.log(devicesCheck);
      console.log("Verifico");
    } else {
      console.log("guardo");

      devicesCheck.push(json)
    }
  };

  console.log(a.deviceId);

}

function check() {

  setInterval(() => {
    console.log("Sending check to machines")
    client.publish('checkOn', JSON.stringify(json), {
      qos: 2,
      retain: true
    })

  }, 60000);



}

function sendDispensation(message) {
  let msj = message;
  axios.patch('https://doroti.com.co:1337/request/dispense', msj.d.payload, {
      headers: {
        'Authorization': `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVraWEiLCJyb2wiOiJST0xFX0VLSUEiLCJpYXQiOjE1ODc1ODIzNjcsImV4cCI6MTU5NjIyMjM2N30.ZcduKRP70axScX_Dtlkm53ip2WEqUisXHCTq6EwRJkQ`
      }
    }, )
    .then((res) => {
      console.log(`statusCode: ${res.statusCode}`)
      console.log(res)
    })
    .catch((error) => {
      console.error(error)
    })
}



function sendDispensationClose(message) {
  let msj = message;
  axios.patch('https://doroti.com.co:1337/request/close', msj.d.payload, {
      headers: {
        'Authorization': `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVraWEiLCJyb2wiOiJST0xFX0VLSUEiLCJpYXQiOjE1ODc1ODIzNjcsImV4cCI6MTU5NjIyMjM2N30.ZcduKRP70axScX_Dtlkm53ip2WEqUisXHCTq6EwRJkQ`
      }
    }, )
    .then((res) => {
      console.log(`statusCode: ${res.statusCode}`)
      console.log(res)
    })
    .catch((error) => {
      console.error(error)
    })
}













funtions.CreateUser = () => {
  axios.post('https://doroti.com.co:1337/user', {

      deviceId: "DOROTI-A000",
      idFinger: "12",
      idCedula: "2542541",
      name: "stalker",


    }, {
      headers: {
        'Authorization': `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVraWEiLCJyb2wiOiJST0xFX0VLSUEiLCJpYXQiOjE1ODc1ODIzNjcsImV4cCI6MTU5NjIyMjM2N30.ZcduKRP70axScX_Dtlkm53ip2WEqUisXHCTq6EwRJkQ`
      }
    }, )
    .then((res) => {
      console.log(`statusCode: ${res.statusCode}`)
      console.log(res)
    })
    .catch((error) => {
      console.error(error)
    })
}


funtions.deleteUser = () => {
  axios.delete('https://doroti.com.co:1337/del/user/machine/', {
      headers: {
        'Authorization': `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVraWEiLCJyb2wiOiJST0xFX0VLSUEiLCJpYXQiOjE1ODc1ODIzNjcsImV4cCI6MTU5NjIyMjM2N30.ZcduKRP70axScX_Dtlkm53ip2WEqUisXHCTq6EwRJkQ`
      },
      data: {

        deviceId: "DOROTI-A000",
        cedula: "2542541",




      }
    }).then((res) => {
      console.log(`statusCode: ${res.statusCode}`)

    })
    .catch((error) => {
      log.error.error(error.err)
    })
}

function publicar(deviceId, msg) {
  client.publish('command/' + deviceId, JSON.stringify(msg), {
    qos: 2,
    retain: true
  }, function (err, menssage) {
    if (!err) {


      console.log("sendend");
    } else {
      console.log("Mengaje", err);
    }
  })
}

function timeout(req,res) {
setTimeout(() => {
  onReques--;
  client.removeOutgoingMessage();
  return res.end('TimeOut make a new request')
}, 10000);
 
}

function garbageCollector() {
  console.log(onReques);
  if (onReques == 0) {
    client.removeListener('message', function (params) {

    });

  }


}

module.exports = funtions;