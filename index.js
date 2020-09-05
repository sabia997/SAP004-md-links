const fs = require('fs');
const parse = require('url-parse');
const validate = require('./validate.js');
const regularExpression = require('./regex');

function mdlinks(path, options) {
  return new Promise((accepted, rejected) => {
    let stringWithDoc = '';

    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        const errorMessage = 'Não encontramos o arquivo!';
        console.log(errorMessage);
      } else {
        stringWithDoc = data.replace(/(\n)/gm, ' ');
      }
      const arrayAllInfo = stringWithDoc.match(regularExpression.regExAll);
      const onlyLinks = stringWithDoc.match(regularExpression.regExLink);
      if (onlyLinks !== null) {
        const arrayDeObj = [];
        const arrayHTTP = [];
        const arrayHTTPS = [];
        let onlyhttps = '';
        let onlyhttp = '';
        for (let i = 0; i < arrayAllInfo.length; i += 1) {
          const objectsInfo = {};
          objectsInfo.text = (arrayAllInfo[i]).match(regularExpression.regExText)[0];
          objectsInfo.href = (arrayAllInfo[i]).match(regularExpression.regExLink)[0];
          objectsInfo.pasta = path;
          arrayDeObj.push(objectsInfo);
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
        const onlyhttpsArray = arrayHTTPS.map((element) => validate.validahttps(element));
        const onlyhttpArray = arrayHTTP.map((element) => validate.validahttp(element));
        if (options.includes('--validate')) {
          accepted(Promise.all(onlyhttpsArray.concat(onlyhttpArray)));
        } else {
          accepted(arrayDeObj);
        }
      } else {
        const error = 'Verifique se você indicou corretamente a pasta onde o arquivo se encontra\nForma correta: ./caminho/NOME_DO_ARQUIVO.md';
        rejected(error);
      }
    });
  });
}

module.exports = mdlinks;