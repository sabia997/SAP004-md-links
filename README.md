# Markdown Links

### Introdução
A construção desta biblioteca é um dos projetos que compõem o bootcamp da Laboratória, nele pude aprimorar meus conhecimentos a respeito do uso de algumas funcionalidades do Node.js como criação de CLI, expotação de módulos, uso de bibliotecas, dentre outros.

## 1. Sobre a biblioteca:
Os arquivos Markdown normalmente contém links que podem estar quebrados, ou que já não são válidos, prejudicando muito o valor da informação que está ali.
Esta biblioteca permine ao usuário obter uma uma lista com todos os links contidos em um arquivo .md por ele indicado. Trazendo ou não o 'status' do link verificando se o link está quebrado, por exemplo.
#### 1.1. Instalando e usando
A biblioteca pode ser instalada via o comando:
```sh
npm install https://github.com/sabia997/SAP004-md-links
```
Após a instalação, você pode executar a bilioteca indicando o caminho para o arquivo e o nome do arquivo .md:
```sh
$ md-links ./some/example.md
```
Quando você executar este comando, o seu terminal apresentará os links da seguinte forma: 
![json-interface](https://raw.githubusercontent.com/sabia997/SAP004-md-links/master/imagnesREADME/SemValidate.png)


Para obter a validação dos links contidos no arquivo, execute da seguinte forma:
```sh
$ md-links ./some/example.md --validate
```
Quando você executar este comando, o seu terminal apresentará os links da seguinte forma: 
![json-interface](https://raw.githubusercontent.com/sabia997/SAP004-md-links/master/imagnesREADME/ComValidate.png)


