var mqtt = require('mqtt')
var opts = {
  clientId: "stalker",
  qos: 2
}
var client = mqtt.connect('mqtt://134.209.171.145:1883', opts)
SeqId = require("seqid")
spm = 0;
devicesCheck = [];


var id = SeqId()
let funtions = {};

check();

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


})
let json = {}
client.on('message', function (topic, message) {
  console.log((topic === "checked"), "el topico es : "+ topic);
  if (topic === "checked") {
    checkIfExist(message.toString())
  }
  console.log("Debug-:", spm, topic);
  spm++

})



funtions.authAcess = (req, res) => {
  let sque = id.next()
  console.log(req.body);
    res.code(404).send();
  let json = {
    messageId: sque,
    command: req.body.command,
    estado: req.body.estado,


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
  client.publish('command/'+req.body.deviceId, JSON.stringify(json), {
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
     console.log(ase.d.messageId, sque);
    if (ase.d.messageId == sque) {
      res.end(message.toString());
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
  client.publish('command/'+req.body.deviceId, JSON.stringify(json), {
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
     console.log(ase.d.messageId, sque);
    if (ase.d.messageId == sque) {
      res.end(message.toString());
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
  client.publish('command/'+req.body.deviceId, JSON.stringify(json), {
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
     console.log(ase.d.messageId, sque);
    if (ase.d.messageId == sque) {
      res.end(message.toString());
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
    command: req.body.command,



  }

  console.log(json);
  client.publish('command/'+req.body.deviceId, JSON.stringify(json), {
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
     console.log(ase.d.messageId, sque);
    if (ase.d.messageId == sque) {
      res.end(message.toString());
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
    command: req.body.command,
    histeSup: req.body.histeresisSup,
    histeInf: req.body.histeresisInf,
    restHour: req.body.horasDescanso,
    restMinutes: req.body.minutosDescanso
  }

  console.log(json);
  client.publish('command/'+req.body.deviceId, JSON.stringify(json), {
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
     console.log(ase.d.messageId, sque);
    if (ase.d.messageId == sque) {
      res.end(message.toString());
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
    command: req.body.command,
    histeSup: req.body.histeresisSup,
    histeInf: req.body.histeresisInf,
    restHour: req.body.horasDescanso,
    restMinutes: req.body.minutosDescanso
  }

  console.log(json);
  client.publish('command/'+req.body.deviceId, JSON.stringify(json), {
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
     console.log(ase.d.messageId, sque);
    if (ase.d.messageId == sque) {
      res.end(message.toString());
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
  client.publish('command/'+req.body.deviceId, JSON.stringify(json), {
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
     console.log(ase.d.messageId, sque);
    if (ase.d.messageId == sque) {
      res.end(message.toString());
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
  client.publish('command/'+req.body.deviceId, JSON.stringify(json), {
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
     console.log(ase.d.messageId, sque);
    if (ase.d.messageId == sque) {
      res.end(message.toString());
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
  client.publish('command/'+req.body.deviceId, JSON.stringify(json), {
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
     console.log(ase.d.messageId, sque);
    if (ase.d.messageId == sque) {
      res.end(message.toString());
    }
   } catch (error) {
     
   } 
  } catch (error) {
    console.log("Error, + " ,error);
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
  client.publish('command/'+req.body.deviceId, JSON.stringify(json), {
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
     console.log(ase.d.messageId, sque);
    if (ase.d.messageId == sque) {
      res.end(message.toString());
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
    user: req.body.user,
    id: req.body.id,
    product: req.body.product,
    quantity: req.body.quantity,
    key: req.body.key
  }

  console.log(json);
  client.publish('command/'+req.body.deviceId, JSON.stringify(json), {
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
     console.log(ase.d.messageId, sque);
    if (ase.d.messageId == sque) {
      res.end(message.toString());
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
  let json = { deviceId: a.deviceId , check: 1 }
 
  if (devicesCheck.length == 0) {
    console.log(json, "Aqui guarda al iniciar");
    devicesCheck.push(json)
    
  } else {
 var b =    devicesCheck.find(check =>   check.deviceId == a.deviceId );
 console.log();
 if (b) {
  devicesCheck.forEach(check => {
    if ( check.deviceId == a.deviceId) {
      check.check++
    }
  });
  console.log(devicesCheck);
   console.log("Verifico");
 }else{
  console.log("guardo");

  devicesCheck.push(json)
 }
  };

  console.log(a.deviceId);

}

function check() {

  setInterval(() => {
    client.publish('checkOn', JSON.stringify(json), {
      qos: 2,
      retain: true
    })

  }, 60000);



}





module.exports = funtions;