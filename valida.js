const http = require('http')
const https = require('https');
const { promises } = require('dns');

const valida = {
validahttps:function (objeto) { 
  return new Promise((aceito, rejeitado) =>{
  https.get(objeto.href, (res) => {
    objeto['codigoVlidacao'] = res.statusCode;
    objeto['Status'] = res.statusMessage;
    aceito(objeto)
  }).on('error', (e) => {
    console.error(e);
  });
})
},
validahttp:function (objeto) {
  return new Promise((aceito, rejeitado) =>{
  http.get(objeto.href, (res) => {
    objeto['codigoVlidacao'] = res.statusCode;
    objeto['Status'] = res.statusMessage;
    aceito(objeto)
  }).on('error', (e) => {
    console.error(e);
  });
})
},
}
module.exports =  valida;