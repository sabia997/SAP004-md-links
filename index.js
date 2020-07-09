const fs = require('fs');

const pasta = "./README.md";

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
    //console.log(arrayComLinks)
    let arrayDeObj = []; 
    for (const key in arrayComLinks) {
      let objetos = {};
      objetos['text'] = (arrayComLinks[key]).match(regExText)[0]
      objetos['href'] = (arrayComLinks[key]).match(regExLink)[0]
      objetos['pasta'] = caminho;
      arrayDeObj.push(objetos);
    }
    aceito(arrayDeObj)
  } else {
    const naofoi = 'Não foi dessa vez, não há links neste arquivo!'
    rejeitado(naofoi)

  }
})
}) 
};


module.exports = mdlinks;