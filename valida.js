const http = require('http');
const https = require('https');
// const { promises } = require('dns');

const valida = {
  validahttps: function valida(objeto) {
    return new Promise((aceito) => {
      https.get(objeto.href, (res) => {
        objeto.codigoValidacao = res.statusCode;
        objeto.Status = res.statusMessage;
        aceito(objeto);
      }).on('error', (e) => {
        console.error(e);
      });
    });
  },
  validahttp: function valida(objeto) {
    return new Promise((aceito) => {
      http.get(objeto.href, (res) => {
        objeto.codigoValidacao = res.statusCode;
        objeto.Status = res.statusMessage;
        aceito(objeto);
      }).on('error', (e) => {
        console.error(e);
      });
    });
  },
};

module.exports = valida;
