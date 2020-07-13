const mdLinks = require('../index.js');

const expetedWithValidate = [
  {
    text: '[Site aleatória para teste 1]',
    href: 'https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback',
    pasta: './TESTE.md',
    codigoValidacao: 200,
    Status: 'OK',
  },
  {
    text: '[site aleatorio para teste 2]',
    href: 'https://nodejs.org/api/path.html',
    pasta: './TESTE.md',
    codigoValidacao: 200,
    Status: 'OK',
  },
  {
    text: '[Site aleatório para teste 3]',
    href: 'https://acervo.fuvest.br/fuvest/',
    pasta: './TESTE.md',
    codigoValidacao: 200,
    Status: 'OK',
  },
];
const expetedWithoutValidate = [
  {
    text: '[Site aleatória para teste 1]',
    href: 'https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback',
    pasta: './TESTE.md',
  },
  {
    text: '[site aleatorio para teste 2]',
    href: 'https://nodejs.org/api/path.html',
    pasta: './TESTE.md',
  },
  {
    text: '[Site aleatório para teste 3]',
    href: 'https://acervo.fuvest.br/fuvest/',
    pasta: './TESTE.md',
  },
];

describe('Teste: Retrono da função mdLinks', () => {
  it('is a function', () => {
    expect(typeof mdLinks).toBe('function');
  });
  test('Sem o parametro validate, esperamos os objetos sem a validação', () => {
    return mdLinks('./TESTE.md', 'any').then((data) => {
      expect(data).toEqual(expetedWithoutValidate);
    });
  });
  test('Com o parametro validate, esperamos os objetos com a validação', () => {
    return mdLinks('./TESTE.md', '--validate').then((data) => {
      expect(data).toEqual(expetedWithValidate);
    });
  });
});