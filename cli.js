#!/usr/bin/env node 
const mdLinks = require('./index.js')

const myArgs = process.argv.slice(2)[0]

mdLinks(myArgs) 
.then((certo) => {
    console.log(certo)
}).catch((errado) => {
    console.log(errado)
})