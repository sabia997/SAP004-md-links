const valida = require('./valida.js');
const fs = require('fs');
let parse = require('url-parse')


const mdlinks = (caminho) => {

  return new Promise((aceito, rejeitado) =>{
  let stringArquivo = '';
  const regExAll = /\[(.*?\]\(http[s]?:[A-Za-z0-9/,-_#.]*)/g;
  const regExText = /\[(.*?)\]/g;
  const regExLink = /http[s]?:[A-Za-z0-9/,-_#.]*/g;


  fs.readFile(caminho, "utf8", (err, data) => {
  if(err){
    console.log(err);
  } else {
    stringArquivo = data.replace(/(\n)/gm,' '); 
  }
  const arrayComLinks = stringArquivo.match(regExAll);
  const temLink = stringArquivo.match(regExLink)
  if (temLink !== null){
    const teste = (arrayComLinks[0]).match(regExText);
    let arrayDeObj = []; 
    let arrayHTTP =[];
    let arrayHTTPS = [];
    let onlyhttps = ''
    let onlyhttp =''
  
    for (const key in arrayComLinks) {
      let objetos = {};
      objetos['text'] = (arrayComLinks[key]).match(regExText)[0]
      objetos['href'] = (arrayComLinks[key]).match(regExLink)[0]
      objetos['pasta'] = caminho;
      arrayDeObj.push(objetos);
    }
    for (const key in arrayDeObj){
      url = parse( arrayDeObj[key].href, true);
       if ( url.protocol === 'https:'){
         onlyhttps = arrayDeObj[key];
         arrayHTTPS.push(onlyhttps);
      } else if (url.protocol === 'http:') {
        onlyhttp = arrayDeObj[key]
        arrayHTTP.push(onlyhttp);
      } 
    }
    const arrr = arrayHTTPS.map((element) => {
    return  valida.validahttps(element)

    })
    const arrr2 = arrayHTTP.map((element) => {
      return  valida.validahttp(element)
      })
    aceito(Promise.all(arrr, arrr2))
  } else {
    const naofoi = 'Não foi dessa vez, não há links neste arquivo!'
    rejeitado(naofoi)

  }
})
}) 
};


module.exports = mdlinks;