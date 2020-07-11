#!/usr/bin/env node 
const mdLinks = require('./index.js')

const myArgs = process.argv[2]

mdLinks(myArgs, process.argv)
.then((certo) => {
   console.log(certo)
}).catch((errado) => {
    console.log(errado)
})