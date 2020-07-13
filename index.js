const fs = require('fs');
const parse = require('url-parse');
const validate = require('./validate.js');

function mdlinks(archive, options) {
  return new Promise((accepted, rejected) => {
    let stringWithDoc = '';
    const regExAll = /\[(.*?\]\(http[s]?:[A-Za-z0-9/,-_#.]*)/g;
    const regExText = /\[(.*?)\]/g;
    const regExLink = /http[s]?:[A-Za-z0-9/,-_#.]*/g;

    fs.readFile(archive, 'utf8', (err, data) => {
      if (err) {
        const errorMessage = 'Erro!\nArquivo não existe';
        console.log(errorMessage);
      } else {
        stringWithDoc = data.replace(/(\n)/gm, ' ');
      }
      const arrayAllInfo = stringWithDoc.match(regExAll);
      const onlyLinks = stringWithDoc.match(regExLink);
      if (onlyLinks !== null) {
        const arrayDeObj = [];
        const arrayHTTP = [];
        const arrayHTTPS = [];
        let onlyhttps = '';
        let onlyhttp = '';
        for (let i = 0; i < arrayAllInfo.length; i += 1) {
          const objectsInfo = {};
          objectsInfo.text = (arrayAllInfo[i]).match(regExText)[0];
          objectsInfo.href = (arrayAllInfo[i]).match(regExLink)[0];
          objectsInfo.pasta = archive;
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
        const error = 'Desculpe!\nVerifique se você indicou corretamente a pasta onde o arquivo se encontra';
        rejected(error);
      }
    });
  });
}

module.exports = mdlinks;
