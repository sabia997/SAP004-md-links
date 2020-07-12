const fs = require('fs');
const parse = require('url-parse');
const valida = require('./valida.js');

function mdlinks(caminho, options) {
  return new Promise((aceito, rejeitado) => {
    let stringArquivo = '';
    const regExAll = /\[(.*?\]\(http[s]?:[A-Za-z0-9/,-_#.]*)/g;
    const regExText = /\[(.*?)\]/g;
    const regExLink = /http[s]?:[A-Za-z0-9/,-_#.]*/g;

    fs.readFile(caminho, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        stringArquivo = data.replace(/(\n)/gm, ' ');
      }
      const arrayComLinks = stringArquivo.match(regExAll);
      const temLink = stringArquivo.match(regExLink);
      if (temLink !== null) {
        const arrayDeObj = [];
        const arrayHTTP = [];
        const arrayHTTPS = [];
        let onlyhttps = '';
        let onlyhttp = '';
        for (let i = 0; i < arrayComLinks.length; i += 1) {
          const objetos = {};
          objetos.text = (arrayComLinks[i]).match(regExText)[0];
          objetos.href = (arrayComLinks[i]).match(regExLink)[0];
          objetos.pasta = caminho;
          arrayDeObj.push(objetos);
        }
        for (let i = 0; i < arrayDeObj.length; i += 1) {
          const url = parse(arrayDeObj[i].href, true);
          if (url.protocol === 'https:') {
            onlyhttps = arrayDeObj[i];
            arrayHTTPS.push(onlyhttps);
          } else if (url.protocol === 'http:') {
            onlyhttp = arrayDeObj[i];
            arrayHTTP.push(onlyhttp);
          }
        }
        const arrr = arrayHTTPS.map((element) => valida.validahttps(element));
        const arrr2 = arrayHTTP.map((element) => valida.validahttp(element));
        if (options.includes('--validate')) {
          aceito(Promise.all(arrr, arrr2));
        } else {
          aceito(arrayDeObj);
        }
      } else {
        const naofoi = 'Não foi dessa vez, não há links neste arquivo!\n verifique se está na pasta do arquivo';
        rejeitado(naofoi);
      }
    });
  });
}

module.exports = mdlinks;
